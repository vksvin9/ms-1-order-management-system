import apiClient from "../api/apiClient";
import { Logger } from "./logger";

import type { ApiResponse } from "../types/api-response";
import type { Order } from "../types/order";

const ORDER_API = "/api/orders";

export const getAllOrders = async (): Promise<Order[]> => {
  const methodName = "getAllOrders";

  try {
    Logger.enter(methodName);

    Logger.apiRequest("GET", ORDER_API);

    const response =
      await apiClient.get<ApiResponse<Order[]>>(ORDER_API);

    Logger.apiResponse(
      "GET",
      ORDER_API,
      response.data
    );

    Logger.exit(
      methodName,
      response.data.data
    );

    return response.data.data;
  } catch (error) {
    Logger.apiError(
      "GET",
      ORDER_API,
      error
    );

    Logger.error(
      `${methodName} failed`,
      error
    );

    throw error;
  }
};

export const createOrder = async (
  order: Order
): Promise<Order> => {
  const methodName = "createOrder";

  try {
    Logger.enter(methodName, order);

    Logger.apiRequest(
      "POST",
      ORDER_API,
      order
    );

    const response =
      await apiClient.post<ApiResponse<Order>>(
        ORDER_API,
        order
      );

    Logger.apiResponse(
      "POST",
      ORDER_API,
      response.data
    );

    Logger.exit(
      methodName,
      response.data.data
    );

    return response.data.data;
  } catch (error) {
    Logger.apiError(
      "POST",
      ORDER_API,
      error
    );

    Logger.error(
      `${methodName} failed`,
      error
    );

    throw error;
  }
};

export const deleteOrder = async (
  id: number
): Promise<void> => {
  const methodName = "deleteOrder";
  const url = `${ORDER_API}/${id}`;

  try {
    Logger.enter(methodName, { id });

    Logger.apiRequest(
      "DELETE",
      url
    );

    await apiClient.delete(url);

    Logger.apiResponse(
      "DELETE",
      url,
      "Deleted successfully"
    );

    Logger.exit(methodName);
  } catch (error) {
    Logger.apiError(
      "DELETE",
      url,
      error
    );

    Logger.error(
      `${methodName} failed`,
      error
    );

    throw error;
  }
};