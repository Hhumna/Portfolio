import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import crypto from "node:crypto";

export const runtime = "nodejs"; // crypto.timingSafeEqual requires Node runtime

/**
 * Configure on GitHub: Repository → Settings → Webhooks → Add webhook
 *   Payload URL: https://<your-domain>/api/github/webhook
 *   Content-Type: application/json
 *   Secret: same value as GITHUB_WEBHOOK_SECRET
 *   Events: Pushes, Repository (for topic changes)
 */
export async function POST(req: NextRequest) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false, reason: "no-secret" }, { status: 503 });

  const signature = req.headers.get("x-hub-signature-256");
  const body = await req.text();
  if (!signature || !verifySignature(secret, body, signature)) {
    return NextResponse.json({ ok: false, reason: "bad-signature" }, { status: 401 });
  }

  // Invalidate everything tagged "github" — repos + languages + readmes
  revalidateTag("github");
  return NextResponse.json({ ok: true, revalidated: true });
}

function verifySignature(secret: string, body: string, signature: string): boolean {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(body).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
