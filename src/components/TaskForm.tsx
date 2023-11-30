import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { TaskFormValues } from "../hooks/useTaskForm";
import { useCategories } from "../hooks/useCategories";

interface TaskFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: TaskFormValues;
}

export const TaskForm = (props: TaskFormProps) => {
  const { values, handleChange } = props;

  const { categories } = useCategories();

  return (
    <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
      <TextField
        name="title"
        label="Titulo"
        type="text"
        variant="standard"
        value={values?.title ?? ""}
        onChange={handleChange}
        inputProps={{ maxLength: 40 }}
        autoFocus
        fullWidth
        required
      />
      <TextField
        name="description"
        label="Descripción (Opcional)"
        type="text"
        variant="standard"
        value={values?.description ?? ""}
        onChange={handleChange}
        inputProps={{ maxLength: 100 }}
        fullWidth
      />
      <TextField
        name="categoryId"
        label="Categorías"
        variant="standard"
        value={values?.categoryId ?? ""}
        onChange={handleChange}
        select
        fullWidth
        required
      >
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                <Typography
                  bgcolor={category?.color ?? "none"}
                  borderRadius={"4px"}
                  paddingX="0.5rem"
                >
                  {category.name}
                </Typography>
              </MenuItem>
            );
          })}
      </TextField>
    </Stack>
  );
};
