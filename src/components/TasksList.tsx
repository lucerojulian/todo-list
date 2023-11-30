import { Box, Typography } from "@mui/material";
import { TaskListItem } from "./task-list-item/TaskListItem";
import { useTaskMutation } from "../hooks/useTaskMutation";
import { Task } from "../models/task";

interface TasksListProps {
  tasks: Task[];
  title: string;
}

export const TasksList = (props: TasksListProps) => {
  const { tasks, title } = props;

  const { handleTaskMutation } = useTaskMutation();

  const handleChangeTask = async (id: string) => {
    const taskToUpdate = tasks?.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };

      await handleTaskMutation(updatedTask);
    }
  };

  return (
    <Box>
      <Typography mb="0.5rem" variant="h2">
        {title}
      </Typography>
      {tasks.length > 0 ? (
        <ul style={{ listStyle: "none" }}>
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onChange={handleChangeTask}
            />
          ))}
        </ul>
      ) : (
        <Typography>
          No hay tareas {title.toLocaleLowerCase()}{" "}
          {title === "Pendientes" ? "¡Buen trabajo! 🔥🚀" : ""}
        </Typography>
      )}
    </Box>
  );
};
