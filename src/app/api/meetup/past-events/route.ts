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

  const response = await fetch('https://www.meetup.com/gql2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    next: { revalidate: 3600 }, // cache for 1 hour
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
