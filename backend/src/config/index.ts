export const config = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5433/weather?schema=public",
  weatherUpdateIntervalSeconds: Number(process.env.WEATHER_UPDATE_INTERVAL_SECONDS) || 5,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  openMeteoBaseUrl: process.env.OPEN_METEO_BASE_URL || "https://api.open-meteo.com/v1",
  openMeteoGeocodingUrl: process.env.OPEN_METEO_GEOCODING_URL || "https://geocoding-api.open-meteo.com/v1",
};
