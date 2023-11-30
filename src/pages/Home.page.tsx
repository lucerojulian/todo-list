import { Typography } from "@mui/material";
import { useTasks } from "../hooks/useTasks";
import { FloatingCreateTaskButton } from "../components/FloatingCreateTaskButton";
import { TasksList } from "../components/TasksList";
import { Loader } from "../components/Loader";

const Home = () => {
  const { tasks, isLoading } = useTasks();

  const finishedTasks = tasks?.filter((task) => task.completed);
  const pendingTasks = tasks?.filter((task) => !task.completed);

  if (isLoading) {
    return <Loader />;
  }

  if (!tasks || !tasks.length) {
    return <Typography variant="h1">No hay tareas</Typography>;
  }

  return (
    <>
      <Typography variant="h1">Lista de tareas</Typography>
      <TasksList tasks={pendingTasks} title="Pendientes" />
      <TasksList tasks={finishedTasks} title="Terminadas" />
      <FloatingCreateTaskButton />
    </>
  );
};

export default Home;
