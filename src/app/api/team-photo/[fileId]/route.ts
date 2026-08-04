import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!apiKey || !fileId) {
    return new NextResponse(null, { status: 400 });
  }

  // Photos routinely exceed Next.js's 2MB Data Cache item limit — `next.revalidate`
  // silently fails to cache them and re-fetches from Drive on every request.
  // The Cache-Control header below is what actually caches this response
  // (browser + CDN), so the outbound fetch itself doesn't need caching.
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&key=${apiKey}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return new NextResponse(null, { status: res.status });
  }

  const contentType = res.headers.get("content-type") ?? "image/png";
  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
