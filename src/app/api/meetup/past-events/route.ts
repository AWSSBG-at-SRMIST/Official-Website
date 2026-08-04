// app/api/meetup/past-events/route.ts

export async function GET() {
  const payload = {
    operationName: 'getPastGroupEvents',
    variables: {
      urlname: 'aws-sbg-at-srm-inst-of-science-tech-kattankulathur',
      beforeDateTime: new Date().toISOString(),
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          process.env.MEETUP_API_TOKEN,
      },
    },
  };

  // Meetup's unofficial API occasionally returns a transient 401/503 —
  // caching this fetch would freeze that failure in Next's Data Cache for
  // the full window (including the error itself), so the /events page's
  // own retry would just hit the same cached failure instead of actually
  // retrying against Meetup. Always fetch fresh; the page above is the
  // layer responsible for retrying and for its own request-level caching.
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
    return Response.json(
      { error: 'Failed to fetch Meetup events' },
      { status: response.status }
    );
  }

  const data = await response.json();

  return Response.json(data);
}
