import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../api/favoritesApi";

const FAVORITES_QUERY_KEY = "favorites";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: [FAVORITES_QUERY_KEY],
    queryFn: favoritesApi.getAll,
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const createMutation = useMutation({
    mutationFn: favoritesApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [FAVORITES_QUERY_KEY] }),
  });

  const removeMutation = useMutation({
    mutationFn: favoritesApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [FAVORITES_QUERY_KEY] }),
  });

  return {
    favorites: favoritesQuery.data ?? [],
    isLoading: favoritesQuery.isLoading,
    error: favoritesQuery.error,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    resetCreate: createMutation.reset,
    remove: removeMutation.mutateAsync,
    isRemoving: removeMutation.isPending,
  };
};
