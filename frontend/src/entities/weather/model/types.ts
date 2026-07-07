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
