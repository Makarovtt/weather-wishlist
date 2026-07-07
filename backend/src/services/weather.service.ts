import { config } from "../config/index.js";
import { prisma } from "../lib/prisma.js";
import type { OpenMeteoResponse } from "../types/index.js";

export class WeatherService {
  async fetchOpenMeteo(latitude: number, longitude: number) {
    const url = new URL(`${config.openMeteoBaseUrl}/forecast`);
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("current_weather", "true");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Open-Meteo responded with status ${response.status}`);
    }

    return (await response.json()) as OpenMeteoResponse;
  }

  async fetchCurrentWeather(latitude: number, longitude: number) {
    const data = await this.fetchOpenMeteo(latitude, longitude);
    return data.current_weather;
  }

  async saveSnapshot(cityId: number, weather: Awaited<ReturnType<WeatherService["fetchCurrentWeather"]>>) {
    return prisma.weather.create({
      data: {
        cityId,
        temperature: weather.temperature,
        windSpeed: weather.windspeed,
        weatherCode: weather.weathercode,
        isDay: Boolean(weather.is_day),
        fetchedAt: new Date(),
        externalError: false,
      },
    });
  }

  async saveErrorSnapshot(cityId: number) {
    return prisma.weather.create({
      data: {
        cityId,
        temperature: 0,
        windSpeed: 0,
        weatherCode: 0,
        isDay: true,
        fetchedAt: new Date(),
        externalError: true,
      },
    });
  }

  async getLatestForCity(cityId: number) {
    return prisma.weather.findFirst({
      where: { cityId },
      orderBy: { fetchedAt: "desc" },
    });
  }

  async refreshCity(cityId: number) {
    const city = await prisma.city.findUnique({ where: { id: cityId } });

    if (!city) {
      throw new Error(`City with id ${cityId} not found`);
    }

    try {
      const current = await this.fetchCurrentWeather(city.latitude, city.longitude);
      return this.saveSnapshot(city.id, current);
    } catch (error) {
      console.error(`Failed to refresh weather for city ${cityId}:`, error);
      return this.saveErrorSnapshot(city.id);
    }
  }

  async refreshAll() {
    const favoriteCities = await prisma.city.findMany();

    await Promise.all(
      favoriteCities.map(async (city: { id: number; latitude: number; longitude: number }) => {
        try {
          const current = await this.fetchCurrentWeather(city.latitude, city.longitude);
          await this.saveSnapshot(city.id, current);
        } catch (error) {
          console.error(`Failed to refresh weather for city ${city.id}:`, error);
          await this.saveErrorSnapshot(city.id);
        }
      })
    );
  }
}

export const weatherService = new WeatherService();
