import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | AWS SBG at SRMIST",
  description:
    "Past workshops, hackathons, and events from the AWS Student Builder Group at SRMIST.",
  robots: { index: false, follow: false },
};

function formatDate(iso?: string) {
  if (!iso) return 'TBD';
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function excerpt(text?: string, length = 140) {
  if (!text) return '';
  const plain = text.replace(/\n+/g, ' ').replace(/\*\*/g, '');
  return plain.length > length ? `${plain.slice(0, length).trim()}…` : plain;
}

export default async function EventsPage() {
  let edges: any[] = [];

  try {
    const host = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? (process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`)
      : `http://localhost:${process.env.PORT ?? 3000}`;

    const url = new URL('/api/meetup/past-events', host).toString();
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Events API responded with non-OK status', res.status);
      edges = [];
    } else {
      const data = await res.json();
      edges = data?.data?.groupByUrlname?.events?.edges ?? [];
    }
  } catch (err) {
    // log error so dev console shows why fetch failed
    // (keeps rendering safe for users)
    // eslint-disable-next-line no-console
    console.error('Error fetching past events:', err);
    edges = [];
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <header className="mb-8">
        <div className="inline-block border-4 border-black px-4 py-2 bg-white">
          <h1 className="text-3xl font-extrabold tracking-tight">PAST EVENTS</h1>
        </div>
        <p className="mt-4 text-sm text-gray-700">
          A record of our recent workshops and meetups — built with bold, boxy
          brutalist cards to match the site aesthetic.
        </p>
      </header>

      {edges.length === 0 ? (
        <div className="border-4 border-black p-8 text-center">
          <p className="text-lg font-semibold">No past events found.</p>
          <p className="mt-2 text-sm text-gray-600">Check back later.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {edges.map(({ node }: any) => (
            <article
              key={node.id}
              className="border-4 border-black bg-white p-4 flex flex-col h-full"
            >
              <div className="flex-shrink-0">
                {node.displayPhoto?.highResUrl ? (
                  // image with strong boxy framing
                  <img
                    src={node.displayPhoto.highResUrl}
                    alt={node.title ?? 'Event image'}
                    className="w-full h-48 object-cover border-2 border-black"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 border-2 border-black flex items-center justify-center text-sm">
                    No image
                  </div>
                )}
              </div>

              <div className="mt-4 flex-1 flex flex-col">
                <h2 className="text-lg font-extrabold leading-tight">{node.title}</h2>

                <div className="mt-2 text-xs text-gray-700">
                  <span className="inline-block mr-2 px-2 py-1 border-2 border-black text-[10px] uppercase">
                    {node.eventType ?? 'Event'}
                  </span>
                  <span className="text-sm ml-2">{formatDate(node.dateTime)}</span>
                </div>

                <p className="mt-3 text-sm text-gray-800 flex-1">{excerpt(node.description)}</p>

                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={node.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-3 py-2 text-sm font-semibold border-2 border-black"
                  >
                    View on Meetup
                  </a>

                  <div className="text-right text-xs text-gray-600">
                    <div>RSVPs: <span className="font-semibold">{node.rsvps?.totalCount ?? node.going?.totalCount ?? 0}</span></div>
                    <div className="mt-1">Status: <span className="font-semibold">{node.status}</span></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
