import { useState } from "react";
import { Task } from "../models/task";

const initialTaskFormState = {
  title: "",
  description: "",
  categoryId: "",
};

export type TaskFormValues = Omit<Task, "id" | "completed">;

export const useTaskForm = (
  initialState: TaskFormValues = initialTaskFormState
) => {
  const [values, setValues] = useState<TaskFormValues>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return {
    values,
    setValues,
    handleChange,
    resetForm,
  };
};
