// Injects the label's analytics / advertising tags ONLY after the visitor
// consents to the matching category -- nothing non-essential fires before
// consent. These are the tag IDs that previously loaded unconditionally from
// the layout; the loading logic lives in labelTags.ts (shared across the
// label's artist sites).

import { type Consent, readConsent } from "./consent";
import { applyLabelTags, trackLabelPageView, type LabelTagConfig } from "./labelTags";

const TAGS: LabelTagConfig = {
  gtm: "GTM-57H5TG35",
};

/** Inject scripts for every category the user has consented to. Additive only. */
export function applyConsent(consent: Consent) {
  applyLabelTags(TAGS, consent);
  // Functional and Social categories have no third-party scripts on this site;
  // they are reserved so the choice is recorded for future use.
}

/** Report a client-side route change to whatever tags consent allowed. */
export function trackSpaPageView() {
  const consent = readConsent();
  if (consent) trackLabelPageView(TAGS, consent);
}
