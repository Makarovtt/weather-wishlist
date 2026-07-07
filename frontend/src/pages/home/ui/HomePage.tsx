import { Spinner } from "@/shared/ui";
import { AddCityForm, FavoriteCitiesList, useFavorites } from "@/features/favorites";

export const HomePage = () => {
  const { favorites, isLoading, error, create, isCreating, createError, resetCreate, remove } = useFavorites();

  if (error) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <p className="rounded bg-red-100 p-4 text-red-700">
          Ошибка загрузки: {error instanceof Error ? error.message : "Неизвестная ошибка"}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Погода в избранных городах</h1>
        <p className="text-slate-600">
          Данные обновляются автоматически. Если сервис погоды недоступен, отображается последний сохраненный снимок.
        </p>
      </div>

      <AddCityForm
        onAdd={async (name) => {
          await create(name);
        }}
        isLoading={isCreating}
        error={createError}
        onResetError={resetCreate}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <FavoriteCitiesList cities={favorites} onRemove={remove} />
      )}
    </main>
  );
};
