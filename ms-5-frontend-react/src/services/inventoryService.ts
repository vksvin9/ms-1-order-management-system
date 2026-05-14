import apiClient from '../api/apiClient';
import type { ApiResponse } from '../types/api-response';
import type { Inventory } from '../types/inventory';

const INVENTORY_API = '/api/inventory';

export const getAllInventory = async (): Promise<Inventory[]> => {
  const response =
    await apiClient.get<ApiResponse<Inventory[]>>(INVENTORY_API);
  return response.data.data;
};

export const createInventory = async (
  inventory: Inventory
): Promise<Inventory> => {
  const response =
    await apiClient.post<ApiResponse<Inventory>>(
      INVENTORY_API,
      inventory
    );
  return response.data.data;
};

export const updateInventory = async (
  id: number,
  inventory: Inventory
): Promise<Inventory> => {
  const response =
    await apiClient.put<ApiResponse<Inventory>>(
      `${INVENTORY_API}/${id}`,
      inventory
    );
  return response.data.data;
};

export const deleteInventory = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`${INVENTORY_API}/${id}`);
};