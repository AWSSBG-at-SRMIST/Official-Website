"use client";

import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { node: any };

function formatDate(iso?: string) {
  if (!iso) return "TBD";
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function excerpt(text?: string, length = 140) {
  if (!text) return "";
  const plain = text.replace(/\n+/g, " ").replace(/\*\*/g, "");
  return plain.length > length ? `${plain.slice(0, length).trim()}…` : plain;
}

export default function EventCard({ node }: Props) {
  const [expanded, setExpanded] = useState(false);
  const desc = node.description ?? "";
  const short = excerpt(desc, 240);
  const needsToggle = desc.replace(/\s+/g, "").length > short.replace(/\s+/g, "").length;

  return (
    <article className="border-2 border-on-surface/10 bg-surface p-4 flex flex-col h-full">
      <div className="flex-shrink-0">
        {node.displayPhoto?.highResUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.displayPhoto.highResUrl}
              alt={node.title ?? "Event image"}
              className="w-full h-48 object-cover border-2 border-on-surface/10"
            />
          </>
        ) : (
          <div className="w-full h-48 bg-surface-container-lowest border-2 border-on-surface/10 flex items-center justify-center text-sm text-on-surface-variant">
            No image
          </div>
        )}
      </div>

      <div className="mt-4 flex-1 flex flex-col text-on-surface">
        <h2 className="text-lg font-extrabold leading-tight">{node.title}</h2>

        <div className="mt-2 text-xs text-on-surface-variant">
          <span className="inline-block mr-2 px-2 py-1 border-2 border-on-surface/10 text-[10px] uppercase">
            {node.eventType ?? "Event"}
          </span>
          <span className="text-sm ml-2">{formatDate(node.dateTime)}</span>
        </div>

        <p className="mt-3 text-sm flex-1 whitespace-pre-wrap">
          {expanded ? desc : short}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <a
            href={node.eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-on-primary px-3 py-2 text-sm font-semibold border-2 border-primary"
          >
            View on Meetup
          </a>

          <div className="text-right text-xs text-on-surface-variant">
            <div>
              RSVPs: <span className="font-semibold">{node.rsvps?.totalCount ?? node.going?.totalCount ?? 0}</span>
            </div>
            <div className="mt-1">Status: <span className="font-semibold">{node.status}</span></div>
          </div>
        </div>

        {needsToggle && (
          <div className="mt-3">
            <button
              onClick={() => setExpanded((s) => !s)}
              className="text-xs text-primary hover:underline"
            >
              {expanded ? "Show less" : "View more"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
