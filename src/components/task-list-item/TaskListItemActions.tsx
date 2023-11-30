import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../../models/task";
import { TaskFormModal } from "../TaskFormModal";
import { useModal } from "../../hooks/useModal";
import { useTaskForm } from "../../hooks/useTaskForm";
import { useTaskMutation } from "../../hooks/useTaskMutation";
import { taskDelete } from "../../services/task.service";
import { useTasks } from "../../hooks/useTasks";
import { appTasksToApiTasks } from "../../adapters/tasks.adapter";

interface TaskListItemActionsProps {
  task: Task;
  onDeleteTask: () => Promise<void>;
}

export const TaskListItemActions = (props: TaskListItemActionsProps) => {
  const { task, onDeleteTask } = props;

  const { isOpen, closeModal, openModal } = useModal();
  const { values, handleChange, setValues } = useTaskForm(task);
  const { handleTaskMutation } = useTaskMutation();
  const { tasks, mutate } = useTasks();

  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTask = { ...task, ...values };
    await handleTaskMutation(updatedTask);
    setValues(updatedTask);
    closeModal();
  };

  const handleDeleteTask = async () => {
    await onDeleteTask();
    await taskDelete(task.id);

    mutate(
      appTasksToApiTasks(tasks.filter((tempTask) => tempTask.id !== task.id))
    );
  };

  return (
    <div>
      <IconButton
        onClick={openModal}
        aria-label="Editar tarea"
        title="Editar tarea"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="Eliminar tarea"
        title="Eliminar tarea"
        color="error"
        onClick={handleDeleteTask}
      >
        <DeleteIcon />
      </IconButton>
      <TaskFormModal
        title="Editar tarea"
        primaryText="Actualizar tarea"
        secondaryText="Cancelar"
        isOpen={isOpen}
        values={values}
        onSubmit={handleUpdateTask}
        onClose={closeModal}
        onChange={handleChange}
      />
    </div>
  );
};
