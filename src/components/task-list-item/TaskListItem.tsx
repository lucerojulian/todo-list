import { Box, Checkbox, Collapse, Paper } from "@mui/material";
import { Task } from "../../models/task";
import { useCategories } from "../../hooks/useCategories";
import { TaskListItemInfo } from "./TaskListItemInfo";
import { TaskListItemActions } from "./TaskListItemActions";
import { useEffect, useState } from "react";
import { sleep } from "../../utils/sleep.util";

interface TaskListItem {
  task: Task;
  onChange: (_id: string) => Promise<void>;
}

const COLLAPSE_TIMEOUT = 300;

export const TaskListItem = (props: TaskListItem) => {
  const { task, onChange } = props;
  const { id, completed, title, description } = task;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { categories } = useCategories();

  const category = categories.find(
    (category) => category.id === task.categoryId
  )!;

  const handleChange = async () => {
    setCollapsed((prevState) => !prevState);
    await sleep(COLLAPSE_TIMEOUT);
    onChange(id);
  };

  const handleDeleteTask = async () => {
    setCollapsed(false);
    await sleep(COLLAPSE_TIMEOUT);
  };

  useEffect(() => {
    let mounted = false;

    if (!mounted) {
      mounted = true;
      setCollapsed(true);
    }
  }, []);

  if (!category) return null;

  const { color: categoryColor, name: categoryName } = category;

  return (
    <Collapse in={collapsed} timeout={COLLAPSE_TIMEOUT}>
      <Paper elevation={3} component="li">
        <Box
          display="flex"
          gap="10px"
          padding="10px"
          mb="1rem"
          bgcolor={categoryColor ?? "#fff"}
        >
          <Checkbox
            id={id}
            checked={completed}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <TaskListItemInfo
              category={categoryName}
              title={title}
              description={description}
            />
            <TaskListItemActions task={task} onDeleteTask={handleDeleteTask} />
          </Box>
        </Box>
      </Paper>
    </Collapse>
  );
};
