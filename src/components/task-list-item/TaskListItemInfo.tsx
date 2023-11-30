import { Typography } from "@mui/material";

interface TaskListItemInfoProps {
  title: string;
  category: string;
  description: string | null;
}

export const TaskListItemInfo = (props: TaskListItemInfoProps) => {
  const { title, category, description } = props;

  return (
    <div>
      <Typography>
        <b>{category}:</b> {title}
      </Typography>
      {description && (
        <Typography fontSize="0.875rem">{description}</Typography>
      )}
    </div>
  );
};
