/**
 * Resolves a member's profile photo from the shared SBG Google Drive folder
 * by matching on name. NOT YET IMPLEMENTED — always returns null today, so
 * the UI's existing initials-fallback (TeamCard) renders for every member.
 *
 * Future implementation: authenticate with a Google service account (Drive
 * API v3, read-only scope), list files in GOOGLE_DRIVE_FOLDER_ID, fuzzy-match
 * filenames against member names, cache the memberId -> URL mapping.
 *
 * TODO env vars needed before implementing:
 *   - GOOGLE_DRIVE_FOLDER_ID
 *   - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   - GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 * Will also need the `googleapis` package (not added yet).
 */
export async function resolveMemberPhotoUrl(
  memberName: string
): Promise<string | null> {
  return null;
}
