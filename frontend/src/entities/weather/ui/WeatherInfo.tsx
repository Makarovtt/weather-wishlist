import { formatDateTime, isStale } from "@/shared/lib/time";
import { getWeatherDescription } from "../lib/weatherCode";
import type { WeatherSnapshot } from "../model/types";

interface WeatherInfoProps {
  snapshot: WeatherSnapshot;
}

export const WeatherInfo = ({ snapshot }: WeatherInfoProps) => {
  const stale = isStale(snapshot.fetchedAt);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">{snapshot.temperature.toFixed(1)}°C</span>
        <span className="text-slate-600">{getWeatherDescription(snapshot.weatherCode)}</span>
      </div>
      <div className="text-sm text-slate-600">
        <p>Ветер: {snapshot.windSpeed.toFixed(1)} км/ч</p>
        <p>Время снимка: {formatDateTime(snapshot.fetchedAt)}</p>
      </div>
      {snapshot.externalError && (
        <p className="rounded bg-red-100 px-3 py-1 text-sm text-red-700">
          Сервис погоды не отвечает. Показано последнее значение из БД.
        </p>
      )}
      {stale && !snapshot.externalError && (
        <p className="rounded bg-amber-100 px-3 py-1 text-sm text-amber-700">
          Данные устарели. Обновление произойдет автоматически.
        </p>
      )}
    </div>
  );
};
