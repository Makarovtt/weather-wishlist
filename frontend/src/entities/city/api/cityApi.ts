import { baseApi } from "@/shared/api/baseApi";
import type { City } from "../model/types";

export interface CityWithWeather extends City {
  latestWeather: WeatherSnapshot | null;
}

export interface WeatherSnapshot {
  id: number;
  cityId: number;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  fetchedAt: string;
  externalError: boolean;
}

export interface CityCandidate {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  region: string;
}

export const cityApi = {
  getAll: () => baseApi.get<CityWithWeather[]>("/cities").then((response) => response.data),
  search: (query: string) =>
    baseApi.get<CityCandidate[]>("/cities/search", { params: { q: query } }).then((response) => response.data),
  create: (city: Pick<City, "name">) =>
    baseApi.post<CityWithWeather>("/cities", city).then((response) => response.data),
  remove: (id: number) => baseApi.delete(`/cities/${id}`),
};
