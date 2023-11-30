import useSWR from "swr";
import { ApiTask } from "../models/task";
import { apiTasksToAppTasks } from "../adapters/tasks.adapter";

export const useTasks = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiTask[]>(`/tasks`);

  return {
    mutate,
    tasks: apiTasksToAppTasks(data ?? []),
    isLoading,
    isError: error,
  };
};
