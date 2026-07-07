import { cityApi } from "@/entities/city";

export const favoritesApi = {
  getAll: cityApi.getAll,
  create: (name: string) => cityApi.create({ name }),
  remove: (id: number) => cityApi.remove(id),
};
