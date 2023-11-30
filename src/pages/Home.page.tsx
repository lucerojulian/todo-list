import { Alert, AlertTitle, Typography } from "@mui/material";
import { useTasks } from "../hooks/useTasks";
import { FloatingCreateTaskButton } from "../components/FloatingCreateTaskButton";
import { TasksList } from "../components/TasksList";
import { Loader } from "../components/Loader";

const Home = () => {
  const { tasks, isLoading, isError } = useTasks();

  const finishedTasks = tasks?.filter((task) => task.completed);
  const pendingTasks = tasks?.filter((task) => !task.completed);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert severity="error" variant="filled">
        <AlertTitle>500: Internal server error</AlertTitle>
        Ha ocurrido un problema al intentar acceder al servidor. Asegúrese de
        que la aplicación tenga acceso al servidor y vuelva a intentarlo.
      </Alert>
    );
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
