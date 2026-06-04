/*
 * Mailchimp merge field mapping (per Cole's audience config):
 *   MMERGE14 = Zip Code
 *   MMERGE12 = COUNTRY
 *
 * TODO: Verify merge field tags match the Mailchimp audience before launch.
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const zip = typeof body.zip === "string" ? body.zip.trim() : "";
    const country = typeof body.country === "string" ? body.country.trim() : "";

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
      console.error(
        "[Subscribe] Missing env vars:",
        !layloKey && "LAYLO_API_KEY",
        !mailchimpKey && "MAILCHIMP_API_KEY",
        !mailchimpListId && "MAILCHIMP_LIST_ID"
      );
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
      `[Subscribe] ${email} -- laylo: ${layloOk}, mailchimp: ${mailchimpOk}`
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
