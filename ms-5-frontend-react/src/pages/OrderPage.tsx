import { useEffect, useState } from "react";

import AdminOnly from "../components/AdminOnly";
import OrderForm from "../components/orders/OrderForm";
import OrderTable from "../components/orders/OrderTable";

import type { Order } from "../types/order";

import {
  getAllOrders,
  createOrder,
  deleteOrder
} from "../services/orderService";

import { Logger } from "../services/logger";
import { extractErrorMessage } from "../utils/errorUtils";

function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    const methodName = "loadOrders";

    try {
      Logger.enter(methodName);

      setLoading(true);

      const data = await getAllOrders();

      setOrders(data);

      Logger.exit(methodName, data);
    } catch (error) {
      Logger.error(
        "Failed to load orders",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Logger.enter("OrderPage.useEffect");

    loadOrders();

    Logger.exit("OrderPage.useEffect");
  }, []);

  const handleSave = async (
    order: Order
  ) => {
    const methodName = "handleSave";

    try {
      Logger.enter(methodName, order);

      await createOrder(order);

      alert("Order placed successfully.");

      await loadOrders();

      Logger.exit(methodName);
    } catch (error) {
      Logger.error(
        "Failed to place order",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const methodName = "handleDelete";

    try {
      Logger.enter(methodName, { id });

      await deleteOrder(id);

      alert("Order deleted successfully.");

      await loadOrders();

      Logger.exit(methodName);
    } catch (error) {
      Logger.error(
        "Failed to delete order",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    }
  };

  return (
    <div className="container py-4">
      <div className="page-header">
        <h1 className="mb-2">
          Order Management
        </h1>
        <p className="mb-0">
          Place orders and view order history.
        </p>
      </div>

      <AdminOnly>
        <OrderForm onSave={handleSave} />
      </AdminOnly>

      {loading ? (
        <div className="alert alert-info shadow-sm">
          Loading orders...
        </div>
      ) : (
        <OrderTable
          orders={orders}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default OrderPage;