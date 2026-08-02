import type { Metadata } from "next";
import EventCard from "@/components/events/EventCard";

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
        <div className="inline-block border-2 border-on-surface/10 px-4 py-2 bg-surface-container-lowest">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">PAST EVENTS</h1>
        </div>
        <p className="mt-4 text-sm text-on-surface-variant">
          A record of our recent workshops and meetups — built with bold, boxy
          brutalist cards to match the site aesthetic.
        </p>
      </header>

      {edges.length === 0 ? (
        <div className="border-2 border-on-surface/10 p-8 text-center bg-surface-container-lowest text-on-surface">
          <p className="text-lg font-semibold">No past events found.</p>
          <p className="mt-2 text-sm text-on-surface-variant">Check back later.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {edges.map(({ node }: any) => (
            <EventCard key={node.id} node={node} />
          ))}
        </div>
      )}
    </section>
  );
}
