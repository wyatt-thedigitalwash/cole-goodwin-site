/*
 * Mailchimp merge field mapping (per Cole's audience config):
 *   MMERGE14 = Zip Code
 *   MMERGE12 = COUNTRY
 *
 * TODO: Verify merge field tags match the Mailchimp audience before launch.
 */

import { NextResponse } from "next/server";

// ── Rate limiting (in-memory, per-IP) ──────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot — if the hidden field is filled, silently succeed
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const zip = typeof body.zip === "string" ? body.zip.trim() : "";
    const country = typeof body.country === "string" ? body.country.trim() : "";

    // Input length limits
    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email address is too long." },
        { status: 400 }
      );
    }
    if (zip.length > 20) {
      return NextResponse.json(
        { error: "Zip or postal code is too long." },
        { status: 400 }
      );
    }
    if (country.length > 100) {
      return NextResponse.json(
        { error: "Country name is too long." },
        { status: 400 }
      );
    }

    // Validate inputs
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!zip) {
      return NextResponse.json(
        { error: "Zip or postal code is required." },
        { status: 400 }
      );
    }
    if (!country) {
      return NextResponse.json(
        { error: "Country is required." },
        { status: 400 }
      );
    }

    // Check env vars
    const layloKey = process.env.LAYLO_API_KEY;
    const mailchimpKey = process.env.MAILCHIMP_API_KEY;
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;

    if (!layloKey || !mailchimpKey || !mailchimpListId) {
      console.error("[Subscribe] Missing env vars");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // Fire both calls in parallel
    const [layloResult, mailchimpResult] = await Promise.allSettled([
      // Laylo
      fetch("https://laylo.com/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${layloKey}`,
        },
        body: JSON.stringify({
          query:
            "mutation($email: String, $phoneNumber: String) { subscribeToUser(email: $email, phoneNumber: $phoneNumber) }",
          variables: { email, phoneNumber: null },
        }),
      }),

      // Mailchimp
      (() => {
        const prefix = mailchimpKey.split("-").pop();
        return fetch(
          `https://${prefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${btoa(`anystring:${mailchimpKey}`)}`,
            },
            body: JSON.stringify({
              email_address: email,
              status: "subscribed",
              merge_fields: {
                MMERGE14: zip,
                MMERGE12: country,
              },
            }),
          }
        );
      })(),
    ]);

    // Evaluate outcomes
    let layloOk = false;
    let mailchimpOk = false;

    if (layloResult.status === "fulfilled") {
      const res = layloResult.value;
      layloOk = res.ok;
      if (!layloOk) {
        const text = await res.text().catch(() => "unknown");
        console.error("[Subscribe] Laylo error:", res.status, text);
      }
    } else {
      console.error("[Subscribe] Laylo fetch failed:", layloResult.reason);
    }

    if (mailchimpResult.status === "fulfilled") {
      const res = mailchimpResult.value;
      if (res.ok) {
        mailchimpOk = true;
      } else {
        const text = await res.text().catch(() => "unknown");
        // Treat "Member Exists" as success
        if (res.status === 400 && text.includes("Member Exists")) {
          mailchimpOk = true;
        } else {
          console.error("[Subscribe] Mailchimp error:", res.status, text);
        }
      }
    } else {
      console.error(
        "[Subscribe] Mailchimp fetch failed:",
        mailchimpResult.reason
      );
    }

    console.log(
      `[Subscribe] laylo: ${layloOk}, mailchimp: ${mailchimpOk}`
    );

    if (layloOk || mailchimpOk) {
      return NextResponse.json({
        ok: true,
        laylo: layloOk,
        mailchimp: mailchimpOk,
      });
    }

    return NextResponse.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  } catch (err) {
    console.error("[Subscribe] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
