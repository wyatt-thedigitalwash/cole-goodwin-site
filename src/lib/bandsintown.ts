export type BandsintownEvent = {
  id: string;
  url: string;
  datetime: string;
  venue: { name: string; city: string; region: string; country: string };
  offers: Array<{ type: string; url: string; status: string }>;
};

const API_URL =
  "https://rest.bandsintown.com/artists/id_15558214/events?app_id=umg_bigmachinelabelgroup_colegoodwin&date=upcoming";

export async function getTourEvents(): Promise<BandsintownEvent[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Bandsintown API error: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("Bandsintown API returned non-array response");
      return [];
    }
    return data as BandsintownEvent[];
  } catch (err) {
    console.error("Bandsintown fetch failed:", err);
    return [];
  }
}
