import { api } from "../api";

export async function listItemsService() {
  const response = await api.get("/items");

  return response.data;
}

export async function listMyItemsService() {
  const response = await api.get("/items/my");

  return response.data;
}

export async function getItemService(id: number) {
  const response = await api.get(`/items/${id}`);

  return response.data;
}

export async function createItemService(data: {
  name: string;
  category: string;
  description?: string;
}) {
  const response = await api.post("/items", data);

  return response.data;
}

export async function updateItemService(
  id: number,
  data: {
    name?: string;
    category?: string;
    description?: string;
    available?: boolean;
  }
) {
  const response = await api.put(`/items/${id}`, data);

  return response.data;
}

export async function deleteItemService(id: number) {
  const response = await api.delete(`/items/${id}`);

  return response.data;
}