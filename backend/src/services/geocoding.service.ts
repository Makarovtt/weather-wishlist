import { config } from "../config/index.js";

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

interface OpenMeteoGeocodingResponse {
  results?: GeocodingResult[];
}

export class GeocodingService {
  async search(name: string): Promise<GeocodingResult[]> {
    const url = new URL(`${config.openMeteoGeocodingUrl}/search`);
    url.searchParams.set("name", name.trim());
    url.searchParams.set("count", "10");
    url.searchParams.set("language", "ru");
    url.searchParams.set("format", "json");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Geocoding API responded with status ${response.status}`);
    }

    const data = (await response.json()) as OpenMeteoGeocodingResponse;
    return data.results ?? [];
  }
}

export const geocodingService = new GeocodingService();
