import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TaskFormValues } from "../hooks/useTaskForm";
import { TaskForm } from "./TaskForm";

interface TaskFormModalProps {
  title: string;
  secondaryText: string;
  primaryText: string;
  isOpen: boolean;
  values: TaskFormValues;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: (_e: React.FormEvent<HTMLFormElement>) => void;
}

export const TaskFormModal = (props: TaskFormModalProps) => {
  const {
    isOpen,
    onChange,
    onClose,
    onSubmit,
    primaryText,
    secondaryText,
    title,
    values,
  } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TaskForm values={values} handleChange={onChange} />
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            flexDirection={matches ? "row" : "column"}
            justifyContent="flex-end"
            width="100%"
            gap="0.5rem"
          >
            <Button variant="outlined" onClick={onClose}>
              {secondaryText}
            </Button>
            <Button variant="contained" type="submit">
              {primaryText}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};
