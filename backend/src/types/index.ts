export interface CityDto {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface WeatherSnapshotDto {
  id: number;
  cityId: number;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  fetchedAt: string;
  externalError: boolean;
}

export interface CityWithWeatherDto extends CityDto {
  latestWeather: WeatherSnapshotDto | null;
}

export interface CitySearchResultDto {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  region: string;
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}
