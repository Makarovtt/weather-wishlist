import { CityCard, type CityWithWeather } from "@/entities/city";

interface FavoriteCitiesListProps {
  cities: CityWithWeather[];
  onRemove: (id: number) => void;
}

export const FavoriteCitiesList = ({ cities, onRemove }: FavoriteCitiesListProps) => {
  if (cities.length === 0) {
    return (
      <p className="py-12 text-center text-slate-500">
        Список избранных городов пуст. Добавьте первый город выше.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} onRemove={onRemove} />
      ))}
    </div>
  );
};
