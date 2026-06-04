# SITE.md - Cole Goodwin "Howdy" EP

## Project
Single-page launch site for country artist Cole Goodwin, built around the "Howdy" EP (out June 26, 2026). One scrolling page. Section order: Hero, Singles, Videos, Tour, About, Email List, Footer. This is a rebuild of an existing WordPress site at colegoodwinmusic.com.

## Positioning
Neo-traditional, old-school country. Authentic, throwback, plainspoken Southern. Not pop-country, not bro-country. The visual world is 70s-rooted Western Americana: warm, earthy, film-grain, premium but unfussy.

## Visual references (feel only, not assets to copy)
- Tecovas and modern Western-goods retail: warm, earthy, confident
- 70s outlaw country album sleeves (Waylon-era RCA): stacked type, grain, earth tones
- Zach Top and Tyler Childers visual worlds: young artists who read vintage without costume

## Color palette
- BROWN (primary background): #493629
- CREAM (primary text, secondary background): #F9F0E3
- RUST (web action color only: buttons, links, hovers). Approx #B5502A. This color is NOT in the official label kit. It is sampled from the HOWDY wordmark and used only for interactive elements. Refine the exact value from the official HOWDY logo vector when available.
Brown is the primary background across the site. Cream-background sections are allowed for contrast since both are approved colors. Do not introduce any other colors.

## Typography
- Headlines: Impact, used per label kit at 130% horizontal scale where the logo treatment calls for it. Via Adobe Fonts.
- Body: Eurostile Medium. Via Adobe Fonts.
- Headline font must always be at least 30% larger than body font.
- Never stretch or squish either font beyond the specified 130% horizontal scale on headlines.
Implementation note: confirm both faces are available in the Adobe Fonts web project before relying on them. If Impact is unavailable as a web font, flag it rather than substituting silently.

## Logos
Three provided logo files (to be added to the public directory): Name logo (Cole Goodwin script signature), Title logo (HOWDY), Lockup logo (HOWDY + signature). Rules from the label kit:
- Logos are vector and must sit on non-white backgrounds. Never place a white background behind a logo.
- Scale proportionally only. Never stretch or squish.
- Never smaller than 375px across for the primary lockup.
- Logo colors must stay as delivered.

## Tone of voice
Confident, warm, plainspoken. Short headlines. Use Cole's real details (Pooler, Georgia; honky tonks; song titles). No corporate phrasing, no hype stacking, no exclamation overload, no bro-country cliches.

## Content

### EP
Title: Howdy. Out June 26, 2026. Pre-save link: https://colegoodwin.ffm.to/howdyep.OPR
Tracklist: Howdy, Girl That's How, Where She's Coming From, Call Me Colorado (unreleased), Keep on Rainin' (unreleased).

### EP tracklist (showcase stack, 5 tracks)
This section showcases the Howdy EP as a staggered reveal stack. Released tracks get a Listen button to their streaming link. Unreleased tracks show as locked with a Pre-save button.
- Howdy (out now). Listen: https://colegoodwin.lnk.to/howdyWE
- Girl That's How (out now). Listen: LINK TBD (placeholder)
- Where She's Coming From (out now). Listen: https://colegoodwin.ffm.to/whereshescomingfrom
- Call Me Colorado (unreleased, out June 26, 2026). Pre-save: https://colegoodwin.ffm.to/howdyep.OPR
- Keep on Rainin' (unreleased, out June 26, 2026). Pre-save: https://colegoodwin.ffm.to/howdyep.OPR

Note: The older non-EP singles (Messin' With My Mind, Dust On The Dancefloor, Girlfriend's Got A Boyfriend) are intentionally not featured on this launch page. They remain accessible via the streaming profile links in the footer.

### Tour
Source: Bandsintown. Render a custom brand-styled component, not the Bandsintown widget. Bandsintown artist ID: 15558214. API access to be wired during the tour section build.

### About (bio)
24-year-old singer/songwriter Cole Goodwin has garnered attention for his strong, textured voice paired with his meaningful writing and return to old-school Country sound. The Pooler, Georgia, native burst on the scene in 2023 with the release of his original, self-produced EP Soon Enough. Cole has toured the Southeast playing honky tonks, clubs and festivals, as well as opening shows for artists including Zach Top and Billy Currington. Last year, the up-and-coming artist released what are now fan-favorite songs including "When You Get Home," co-written with fellow Georgia Southern University alum Will Moseley, and "Catchin' On," written with songwriter Justin Dukes. Cole was voted Savannah's Best Country Artist of 2023 and 2024, as well as 2024's Best Singer/Songwriter, Best Local Concert, and Best All-Around Musician. Recently signed to Big Machine Records, more new music from Cole is expected throughout the summer as he crisscrosses the country opening on select dates of Luke Bryan's Country Song Came On Tour. Cole's new EP, Howdy, arrives June 26, 2026.

### Social and streaming links (footer)
- Instagram: https://www.instagram.com/colegoodwinmusic/
- Facebook: https://www.facebook.com/ColeGoodwinMusic/
- TikTok: https://www.tiktok.com/@colegoodwinmusic
- YouTube: https://www.youtube.com/@ColeGoodwinMusic
- Spotify: https://open.spotify.com/artist/1BJuLsavR5ekNDC4FhjTmF
- Apple Music: https://music.apple.com/us/artist/cole-goodwin/1674367221
- Amazon Music: https://music.amazon.com/artists/B07NFCRSL6/cole-goodwin
- Pandora: https://pandora.app.link/EMGZOrlQEUb

## Design anti-patterns to avoid on this project
- No 3-column service-card grids
- No pill buttons or gradient buttons. Buttons are solid rust, squared or lightly rounded, Eurostile uppercase
- No icons inside colored circles. Social icons are simple monoline marks
- No generic centered-hero-with-CTA template. The hero is the animated logo lockup
- No blue or teal anything
- No stock photography. Only Cole's approved photos
- Never recolor, stretch, or crop across faces or focal points of photos
- Stay strictly within brown, cream, and rust

## Placeholders and open items
- RUST hex is approximate, refine from logo vector
- Girl That's How single link is TBD
- Videos section needs 5 YouTube URLs
- Bandsintown API access to wire
- Email list backend undecided (label/BMLG endpoint, ESP, or other)
- All image files (hero photo, EP art, 3 logos) not yet added to the public directory
- The added bio line about the Howdy EP is agency-drafted and needs client sign-off
