// Meetup query for the chatbot's knowledge-base generator. Asks for the same
// group and past events the website's /events page shows (src/lib/meetup.ts).
//
// Sends the full GraphQL query rather than a persisted-query hash: Meetup
// rotates those hashes without notice, and a stale one returns
// PersistedQueryNotFound. This needs no MEETUP_API_TOKEN.

export const MEETUP_URLNAME = "aws-sbg-at-srm-inst-of-science-tech-kattankulathur";

export const MEETUP_GQL_URL = "https://www.meetup.com/gql2";

const PAST_EVENTS_QUERY = `
  query getPastGroupEvents($urlname: String!) {
    groupByUrlname(urlname: $urlname) {
      events(status: PAST, first: 100, sort: DESC) {
        edges {
          node {
            id
            title
            dateTime
            eventUrl
            eventType
            description
            going { totalCount }
            displayPhoto { highResUrl }
          }
        }
      }
    }
  }
`;

export function pastEventsRequestInit(): RequestInit {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
    },
    body: JSON.stringify({
      operationName: "getPastGroupEvents",
      query: PAST_EVENTS_QUERY,
      variables: { urlname: MEETUP_URLNAME },
    }),
  };
}
