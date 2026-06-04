import Image from "next/image";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  YouTubeIcon,
  SpotifyIcon,
  AppleMusicIcon,
  AmazonMusicIcon,
  PandoraIcon,
} from "./SocialIcons";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/colegoodwinmusic/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/ColeGoodwinMusic/", Icon: FacebookIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@colegoodwinmusic", Icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/@ColeGoodwinMusic", Icon: YouTubeIcon },
  { label: "Spotify", href: "https://open.spotify.com/artist/1BJuLsavR5ekNDC4FhjTmF", Icon: SpotifyIcon },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/cole-goodwin/1674367221", Icon: AppleMusicIcon },
  { label: "Amazon Music", href: "https://music.amazon.com/artists/B07NFCRSL6/cole-goodwin", Icon: AmazonMusicIcon },
  { label: "Pandora", href: "https://pandora.app.link/EMGZOrlQEUb", Icon: PandoraIcon },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "#", newTab: true },
  { label: "Do Not Sell My Personal Information", href: "#", newTab: false },
  { label: "Privacy", href: "#", newTab: false },
  { label: "Cookie Choices", href: "#", newTab: false },
];

export default function Footer() {
  return (
    <footer data-bg="cream">
      {/* Main footer — cream background */}
      <div className="bg-cream px-5 py-16 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10">
          {/* Logo */}
          <Image
            src="/branding/HowdyNameLogo_Black.png"
            alt="Cole Goodwin"
            width={400}
            height={150}
            className="h-auto w-[123px] md:w-[158px]"
          />

          {/* Social + streaming links */}
          <nav aria-label="Social and streaming links" className="flex flex-wrap items-center justify-center gap-6">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: "#493629" }}
                className="transition-colors hover:!text-rust"
              >
                <Icon className="h-8 w-8" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom ribbon — rust */}
      <div className="bg-rust px-5 py-3 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 text-center text-[11px] md:flex-row md:justify-between md:text-xs">
          <p style={{ color: "#F9F0E3", opacity: 0.8 }}>
            &copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-1">
                {i > 0 && (
                  <span style={{ color: "rgba(249,240,227,0.4)" }}>/</span>
                )}
                <a
                  href={link.href}
                  target={link.newTab ? "_blank" : undefined}
                  rel={link.newTab ? "noopener noreferrer" : undefined}
                  style={{ color: "rgba(249,240,227,0.8)" }}
                  className="underline transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
