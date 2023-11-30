export interface Task extends Omit<ApiTask, "category_id"> {
  categoryId: string;
}

export interface ApiTask {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  category_id: string;
}
