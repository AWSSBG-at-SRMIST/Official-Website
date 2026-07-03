import "server-only";

interface DriveFile {
  id: string;
  name: string;
}

interface DriveFilesResponse {
  files: DriveFile[];
  nextPageToken?: string;
}

async function listFolderFiles(): Promise<DriveFile[]> {
  const folderId = process.env.GOOGLE_DRIVE_TEAM_IMAGES_FOLDER_ID!;
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY!;
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      key: apiKey,
      fields: "nextPageToken,files(id,name)",
      pageSize: "1000",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`Google Drive API error: ${res.status}`);
      break;
    }

    const data: DriveFilesResponse = await res.json();
    files.push(...data.files);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

// Returns a map of normalised display name → CDN image URL.
// Files are named "Full Name.png" in Drive — matched against member.name from DynamoDB.
export async function getTeamPhotoMap(): Promise<Record<string, string>> {
  try {
    const files = await listFolderFiles();
    const map: Record<string, string> = {};

    for (const file of files) {
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      // Route through our own proxy so the browser never hits Google directly
      map[normalizeName(baseName)] = `/api/team-photo/${file.id}`;
    }

    return map;
  } catch {
    console.error("Failed to build team photo map from Google Drive.");
    return {};
  }
}

export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}
