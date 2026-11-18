// The label's marketing tags, loaded ONLY after the visitor consents. Identical
// on every artist site; each site lists its own tag IDs in injectScripts.ts.
//
// Category mapping (matches the Cookies Policy buckets):
//   Analytics    -> GA4 properties
//   Advertising  -> Google Ads, Meta Pixel, TikTok Pixel, Audigent/Hadron, and
//                   the label's GTM container
//
// The GTM container is treated as Advertising because it holds the label's ad
// tags. Its tags were built to wait for the Evidon consent event
// ("evidonConsentGiven" + "consentCategories"), so we emit that same event
// with the categories the visitor actually granted, and set Google Consent
// Mode v2 to match. The container needs no changes.
//
// Nothing here runs before consent, and there are deliberately no <noscript>
// pixel/iframe fallbacks: they fire without JavaScript, so they could never
// respect the visitor's choice. Turning a category off requires a page reload
// (scripts cannot be unloaded), which the consent manager handles.

import type { Consent } from "./consent";

export type LabelTagConfig = {
  /** Label GTM container (Advertising). */
  gtm?: string;
  /** GA4 measurement IDs (Analytics). */
  ga4?: string[];
  /** Google Ads IDs (Advertising). */
  googleAds?: string[];
  /** Meta Pixel IDs (Advertising). */
  metaPixels?: string[];
  /** TikTok Pixel ID (Advertising). */
  tiktokPixel?: string;
  /** Audigent / HadronID partner ID (Advertising). */
  audigentPartnerId?: number;
};

/** The event and category names the label's GTM containers listen for. Must stay exact. */
const CONSENT_EVENT = "evidonConsentGiven";
const CATEGORY_ANALYTICS = "performance and analytics";
const CATEGORY_ADVERTISING = "online advertising";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { page: () => void };
    PUSH_GLOBAL?: Record<string, string>;
  }
}

const loaded = new Set<string>();
let lastSignal = "";

function once(id: string, run: () => void): void {
  if (loaded.has(id) || document.getElementById(id)) return;
  loaded.add(id);
  run();
}

function srcScript(id: string, src: string): void {
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function inlineScript(id: string, code: string): void {
  const s = document.createElement("script");
  s.id = id;
  s.text = code;
  document.head.appendChild(s);
}

function consentModeState(c: Consent) {
  const ads = c.advertising ? "granted" : "denied";
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: c.analytics ? "granted" : "denied",
  };
}

/**
 * One shared gtag.js + dataLayer for GA4, Google Ads and the GTM container.
 * The first call sets Consent Mode defaults from the visitor's choice; later
 * calls (the visitor granted more categories this session) send an update.
 */
function ensureGtag(c: Consent, firstId: string): void {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? [];
    // gtag.js only reads Arguments objects off the dataLayer, not arrays.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", consentModeState(c));
    window.gtag("js", new Date());
  } else {
    window.gtag("consent", "update", consentModeState(c));
  }
  once("label-gtag-js", () => srcScript("label-gtag-js", `https://www.googletagmanager.com/gtag/js?id=${firstId}`));
}

function grantedCategories(c: Consent): string[] {
  const out: string[] = [];
  if (c.analytics) out.push(CATEGORY_ANALYTICS);
  if (c.advertising) out.push(CATEGORY_ADVERTISING);
  return out;
}

/** Tell the GTM container what the visitor allowed (also its page-view signal). */
function pushContainerSignal(c: Consent): void {
  const categories = grantedCategories(c);
  if (categories.length === 0) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: CONSENT_EVENT,
    consentCategories: categories,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

function loadMeta(ids: string[]): void {
  once("label-meta-pixel", () =>
    inlineScript(
      "label-meta-pixel",
      `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
${ids.map((id) => `fbq('init', '${id}');`).join("\n")}
fbq('track', 'PageView');`,
    ),
  );
}

function loadTikTok(id: string): void {
  once("label-tiktok-pixel", () =>
    inlineScript(
      "label-tiktok-pixel",
      `!function (w, d, t) {
w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
ttq.load('${id}');
ttq.page();
}(window, document, 'ttq');`,
    ),
  );
}

function loadAudigent(partnerId: number): void {
  once("label-audigent", () => {
    window.PUSH_GLOBAL = { geo_ip_country: "US" };
    srcScript("label-audigent", `https://cdn.hadronid.net/hadron.js?partner_id=${partnerId}&sync=1`);
    srcScript("label-audigent-match", `https://a.ad.gt/api/v1/u/matches/${partnerId}`);
    srcScript("label-audigent-partner", `https://p.ad.gt/api/v1/p/${partnerId}`);
  });
}

/** Load every tag the visitor's consent allows. Additive and idempotent. */
export function applyLabelTags(cfg: LabelTagConfig, c: Consent): void {
  const ga4 = c.analytics ? (cfg.ga4 ?? []) : [];
  const ads = c.advertising ? (cfg.googleAds ?? []) : [];
  const gtm = c.advertising ? cfg.gtm : undefined;

  const firstGoogleId = ga4[0] ?? ads[0] ?? gtm;
  if (firstGoogleId) ensureGtag(c, firstGoogleId);

  for (const id of ga4) once(`label-ga4-${id}`, () => window.gtag!("config", id));
  for (const id of ads) once(`label-ads-${id}`, () => window.gtag!("config", id));

  if (gtm) {
    once("label-gtm", () => {
      window.dataLayer!.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      srcScript("label-gtm", `https://www.googletagmanager.com/gtm.js?id=${gtm}`);
    });
    // Signal on first load, and again only if the granted categories changed
    // (route changes send their own signal via trackLabelPageView).
    const signal = grantedCategories(c).join("|");
    if (signal !== lastSignal) {
      lastSignal = signal;
      pushContainerSignal(c);
    }
  }

  if (!c.advertising) return;
  if (cfg.metaPixels?.length) loadMeta(cfg.metaPixels);
  if (cfg.tiktokPixel) loadTikTok(cfg.tiktokPixel);
  if (cfg.audigentPartnerId) loadAudigent(cfg.audigentPartnerId);
}

/**
 * Report a client-side route change. GA4 (enhanced measurement) and the Meta
 * Pixel already record history changes themselves, so they are not called
 * here -- doing so would double count.
 */
export function trackLabelPageView(cfg: LabelTagConfig, c: Consent): void {
  if (!c.advertising) return;
  if (cfg.gtm && loaded.has("label-gtm")) pushContainerSignal(c);
  for (const id of cfg.googleAds ?? []) {
    if (loaded.has(`label-ads-${id}`)) {
      window.gtag?.("event", "page_view", {
        send_to: id,
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
      });
    }
  }
  if (cfg.tiktokPixel && loaded.has("label-tiktok-pixel")) window.ttq?.page();
}
