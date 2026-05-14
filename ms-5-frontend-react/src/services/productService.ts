import apiClient from '../api/apiClient';
import type { ApiResponse } from '../types/api-response';
import type { Product } from '../types/product';

const PRODUCT_API = '/api/products';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ApiResponse<Product[]>>(PRODUCT_API);
  return response.data.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get<ApiResponse<Product>>(
    `${PRODUCT_API}/${id}`
  );
  return response.data.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await apiClient.post<ApiResponse<Product>>(
    PRODUCT_API,
    product
  );
  return response.data.data;
};

export const updateProduct = async (
  id: number,
  product: Product
): Promise<Product> => {
  const response = await apiClient.put<ApiResponse<Product>>(
    `${PRODUCT_API}/${id}`,
    product
  );
  return response.data.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`${PRODUCT_API}/${id}`);
};