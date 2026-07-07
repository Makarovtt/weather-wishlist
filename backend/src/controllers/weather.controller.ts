import { weatherService } from "../services/weather.service.js";
import type { WeatherSnapshotDto } from "../types/index.js";

const mapWeatherToDto = (weather: {
  id: number;
  cityId: number;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  fetchedAt: Date;
  externalError: boolean;
}): WeatherSnapshotDto => ({
  id: weather.id,
  cityId: weather.cityId,
  temperature: weather.temperature,
  windSpeed: weather.windSpeed,
  weatherCode: weather.weatherCode,
  isDay: weather.isDay,
  fetchedAt: weather.fetchedAt.toISOString(),
  externalError: weather.externalError,
});

export const weatherController = {
  async getLatestForCity(cityId: number): Promise<WeatherSnapshotDto | null> {
    const snapshot = await weatherService.getLatestForCity(cityId);
    return snapshot ? mapWeatherToDto(snapshot) : null;
  },

  async refreshCity(cityId: number): Promise<WeatherSnapshotDto> {
    const snapshot = await weatherService.refreshCity(cityId);
    return mapWeatherToDto(snapshot);
  },
};
