import useSWR from "swr";
import { Category } from "../models/category";

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(`/categories`);

  return {
    mutate,
    categories: data ?? [],
    isLoading,
    isError: error,
  };
};
