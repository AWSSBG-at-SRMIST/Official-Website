// Add a repo name here to hide it from the Projects page
export const EXCLUDED_REPOS = [
  "Official-Website",
  ".github",
  "Internal-Dashboard",
];

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

export async function getOrgRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      "https://api.github.com/orgs/AWSSBG-at-SRMIST/repos?type=public&per_page=100&sort=updated",
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !EXCLUDED_REPOS.includes(r.name) && !r.archived);
  } catch {
    return [];
  }
}
