import { baseApi } from "@/shared/api/baseApi";
import type { WeatherSnapshot } from "../model/types";

export const weatherApi = {
  getLatestForCity: (cityId: number) =>
    baseApi.get<WeatherSnapshot | null>(`/weather/city/${cityId}`).then((response) => response.data),
  refreshCity: (cityId: number) =>
    baseApi.post<WeatherSnapshot>(`/weather/city/${cityId}/refresh`).then((response) => response.data),
};
