"use client";

import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiYoutube,
  SiSpotify,
  SiApplemusic,
  SiPandora,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa6";

export function InstagramIcon({ className }: { className?: string }) {
  return <SiInstagram className={className} aria-hidden="true" />;
}

export function FacebookIcon({ className }: { className?: string }) {
  return <SiFacebook className={className} aria-hidden="true" />;
}

export function TikTokIcon({ className }: { className?: string }) {
  return <SiTiktok className={className} aria-hidden="true" />;
}

export function YouTubeIcon({ className }: { className?: string }) {
  return <SiYoutube className={className} aria-hidden="true" />;
}

export function SpotifyIcon({ className }: { className?: string }) {
  return <SiSpotify className={className} aria-hidden="true" />;
}

export function AppleMusicIcon({ className }: { className?: string }) {
  return <SiApplemusic className={className} aria-hidden="true" />;
}

export function AmazonMusicIcon({ className }: { className?: string }) {
  return <FaAmazon className={className} aria-hidden="true" />;
}

export function PandoraIcon({ className }: { className?: string }) {
  return <SiPandora className={className} aria-hidden="true" />;
}
