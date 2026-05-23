import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Hit by Vercel Cron every 6 hours (configured in vercel.json).
 * Also callable manually with CRON_SECRET.
 */
export async function GET(req: Request) {
  const isVercelCron = req.headers.get("user-agent")?.includes("vercel-cron");
  const isAuthorized =
    req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

  if (!isVercelCron && !isAuthorized) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("github");
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
