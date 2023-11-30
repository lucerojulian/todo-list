import {
  apiTaskToAppTask,
  appTasksToApiTasks,
  formTaskToApiTask,
} from "../adapters/tasks.adapter";
import { Task } from "../models/task";
import { taskMutation } from "../services/task.service";
import { useTasks } from "./useTasks";

export const useTaskMutation = () => {
  const { tasks, mutate } = useTasks();

  const handleTaskMutation = async (taskToAdd: Partial<Task>) => {
    const createdTask = await taskMutation(formTaskToApiTask(taskToAdd));

    // update all places where useTasks is used
    mutate(
      appTasksToApiTasks(
        tasks.map((task) =>
          task.id === createdTask.id ? apiTaskToAppTask(createdTask) : task
        )
      )
    );
  };

  return {
    handleTaskMutation,
  };
};
