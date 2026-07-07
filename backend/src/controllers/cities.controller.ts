import { ApiError } from "../lib/errors.js";
import { prisma } from "../lib/prisma.js";
import { geocodingService } from "../services/geocoding.service.js";
import { weatherService } from "../services/weather.service.js";
import type { CityDto, CitySearchResultDto, CityWithWeatherDto, WeatherSnapshotDto } from "../types/index.js";

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

const mapCityToDto = (city: {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}): CityDto => ({
  id: city.id,
  name: city.name,
  latitude: city.latitude,
  longitude: city.longitude,
});

const mapSearchResult = (result: {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}): CitySearchResultDto => ({
  name: result.name,
  latitude: result.latitude,
  longitude: result.longitude,
  country: result.country ?? "",
  region: result.admin1 ?? "",
});

export const citiesController = {
  async list(): Promise<CityWithWeatherDto[]> {
    const cities = await prisma.city.findMany({
      include: {
        weather: {
          orderBy: { fetchedAt: "desc" },
          take: 1,
        },
      },
      orderBy: { name: "asc" },
    });

    return cities.map((city) => ({
      ...mapCityToDto(city),
      latestWeather: city.weather.length > 0 ? mapWeatherToDto(city.weather[0]) : null,
    }));
  },

  async search(query: string): Promise<CitySearchResultDto[]> {
    const results = await geocodingService.search(query.trim());
    return results.map(mapSearchResult);
  },

  async create(name: string): Promise<CityWithWeatherDto> {
    const trimmedName = name.trim();
    const results = await geocodingService.search(trimmedName);
    const match = results[0];

    if (!match) {
      throw new ApiError(404, `Город "${trimmedName}" не найден`);
    }

    const existing = await prisma.city.findUnique({
      where: { name: match.name },
    });

    if (existing) {
      throw new ApiError(409, `Город "${match.name}" уже в избранном`);
    }

    const city = await prisma.city.create({
      data: {
        name: match.name,
        latitude: match.latitude,
        longitude: match.longitude,
      },
    });

    const weather = await weatherService.refreshCity(city.id);

    return {
      ...mapCityToDto(city),
      latestWeather: mapWeatherToDto(weather),
    };
  },

  async remove(id: number): Promise<void> {
    await prisma.city.delete({ where: { id } });
  },
};
