import type { DashboardSummary } from "../types/dashboard";
import { getAllProducts } from "./productService";
import { getAllInventory } from "./inventoryService";
import { getAllOrders } from "./orderService";

export const getDashboardSummary =
  async (): Promise<DashboardSummary> => {
    const [products, inventory, orders] =
      await Promise.all([
        getAllProducts(),
        getAllInventory(),
        getAllOrders()
      ]);

    const lowStockCount = inventory.filter(
      (item) => item.availableQuantity <= 10
    ).length;

    return {
      totalProducts: products.length,
      totalInventory: inventory.length,
      totalOrders: orders.length,
      lowStockCount
    };
  };