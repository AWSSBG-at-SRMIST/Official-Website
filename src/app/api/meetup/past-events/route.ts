// app/api/meetup/past-events/route.ts
import { fetchMeetupPastEvents } from "@/lib/meetup";

export async function GET() {
  const result = await fetchMeetupPastEvents();

  if (!result.ok) {
    return Response.json(
      { error: 'Failed to fetch Meetup events' },
      { status: result.status }
    );
  }

  return Response.json(result.data);
}
