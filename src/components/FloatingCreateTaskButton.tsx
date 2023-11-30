import { Alert, AlertColor, Box, Fab, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskFormModal } from "./TaskFormModal";
import { useTaskForm } from "../hooks/useTaskForm";
import { useModal } from "../hooks/useModal";
import { useTaskMutation } from "../hooks/useTaskMutation";
import { useState } from "react";

interface Notification {
  show: boolean;
  severity: AlertColor;
  message: string;
}

const initialNotificationState: Notification = {
  show: false,
  severity: "success",
  message: "",
};

export const FloatingCreateTaskButton = () => {
  const [notification, setNotification] = useState<Notification>(
    initialNotificationState
  );

  const { values, handleChange, resetForm } = useTaskForm();
  const { isOpen, closeModal, openModal } = useModal();
  const { handleTaskMutation } = useTaskMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      ...values,
      completed: false,
    };
    await handleTaskMutation(newTask);
    closeModal();
    resetForm();
    setNotification({
      show: true,
      severity: "success",
      message: "Tarea creada con éxito",
    });
  };

  const handleCloseNotification = () => {
    setNotification(initialNotificationState);
  };

  return (
    <>
      <Box
        bottom="0px"
        display="flex"
        flexDirection="row-reverse"
        left="50%"
        maxWidth="lg"
        paddingBottom="2rem"
        paddingRight="2.5rem"
        position="fixed"
        width="100%"
        sx={{
          transform: "translate(-50%)",
        }}
      >
        <Fab
          color="primary"
          aria-label="Crear nueva tarea"
          title="Crear nueva tarea"
          onClick={openModal}
        >
          <AddIcon />
        </Fab>
        <TaskFormModal
          title="Nueva tarea"
          primaryText="Crear"
          secondaryText="Cancelar"
          isOpen={isOpen}
          values={values}
          onSubmit={handleSubmit}
          onClose={closeModal}
          onChange={handleChange}
        />
      </Box>
      <Snackbar
        open={notification.show}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};
