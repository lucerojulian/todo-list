import { API_URL } from "../constants/api";
import { ApiTask } from "../models/task";

export const taskMutation = async (data: Partial<ApiTask>) => {
  const { id } = data;
  const endpoint = `${API_URL}/tasks${id ? "/" + id : ""}`;

  return fetch(endpoint, {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<ApiTask>;
  });
};

export const taskDelete = async (id: string) => {
  const endpoint = `${API_URL}/tasks/${id}`;

  return fetch(endpoint, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<ApiTask>;
  });
};
