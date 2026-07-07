import { Card } from "@/shared/ui";
import type { CityWithWeather } from "../api/cityApi";
import { WeatherInfo } from "@/entities/weather";

interface CityCardProps {
  city: CityWithWeather;
  onRemove: (id: number) => void;
}

export const CityCard = ({ city, onRemove }: CityCardProps) => (
  <Card className="flex flex-col justify-between gap-4">
    <div className="flex items-start justify-between">
      <h3 className="text-xl font-semibold">{city.name}</h3>
      <button
        onClick={() => onRemove(city.id)}
        className="text-sm text-red-600 hover:text-red-700"
        aria-label={`Удалить ${city.name}`}
      >
        Удалить
      </button>
    </div>
    {city.latestWeather ? (
      <WeatherInfo snapshot={city.latestWeather} />
    ) : (
      <p className="text-slate-500">Нет данных о погоде</p>
    )}
  </Card>
);
