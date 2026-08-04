import "server-only";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface MeetupPastEventsResult { ok: boolean; status: number; data?: any }

// Meetup's unofficial gql2 API occasionally returns a transient 401/503 even
// with valid credentials — this never caches the response, so a bad attempt
// never gets frozen in place for callers.
export async function fetchMeetupPastEvents(): Promise<MeetupPastEventsResult> {
  const payload = {
    operationName: 'getPastGroupEvents',
    variables: {
      urlname: 'aws-sbg-at-srm-inst-of-science-tech-kattankulathur',
      beforeDateTime: new Date().toISOString(),
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: process.env.MEETUP_API_TOKEN,
      },
    },
  };

  const response = await fetch('https://www.meetup.com/gql2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = await response.json();
  return { ok: true, status: response.status, data };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPastEventEdges(attempt = 1): Promise<any[]> {
  const result = await fetchMeetupPastEvents();
  if (!result.ok) {
    console.error('Meetup API responded with non-OK status', result.status);
    if (attempt < 2) return getPastEventEdges(attempt + 1);
    return [];
  }
  return result.data?.data?.groupByUrlname?.events?.edges ?? [];
}
