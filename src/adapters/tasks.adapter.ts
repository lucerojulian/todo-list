import { ApiTask, Task } from "../models/task";

export const apiTaskToAppTask = (task: ApiTask): Task => {
  return {
    id: task.id,
    title: task.title,
    completed: task.completed,
    categoryId: task.category_id,
    description: task.description,
  };
};

export const appTaskToApiTask = (task: Task): ApiTask => {
  return {
    id: task.id,
    title: task.title,
    completed: task.completed,
    category_id: task.categoryId,
    description: task.description,
  };
};

export const formTaskToApiTask = (task: Partial<Task>): Partial<ApiTask> => {
  return {
    ...(task.id ? { id: task.id } : {}),
    title: task.title,
    completed: task.completed,
    category_id: task.categoryId,
    description: task.description,
  };
};

export const apiTasksToAppTasks = (tasks: ApiTask[]) => {
  return tasks.map((task) => apiTaskToAppTask(task));
};

export const appTasksToApiTasks = (tasks: Task[]) => {
  return tasks.map((task) => appTaskToApiTask(task));
};
