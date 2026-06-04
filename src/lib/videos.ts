export const VIDEO_IDS = [
  "VsPYI_VtdMM",
  "AeiVxjHg80Y",
  "V1QufWONh3U",
  "XSXDKmM6qrY",
];

export interface VideoEntry {
  id: string;
  title: string;
}

export function cleanTitle(raw: string): string {
  return raw
    .replace(/^Cole\s+Goodwin\s*[-–—]\s*/i, "")
    .replace(
      /\s*\((?:Official\s+)?(?:Music\s+)?(?:Video|Lyric\s+Video)\)\s*$/i,
      ""
    )
    .trim();
}

async function fetchTitle(id: string): Promise<string> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      { next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const data = await res.json();
      return data.title || "";
    }
  } catch {
    // Fail silently
  }
  return "";
}

export async function getVideos(): Promise<VideoEntry[]> {
  return Promise.all(
    VIDEO_IDS.map(async (id) => ({
      id,
      title: await fetchTitle(id),
    }))
  );
}
