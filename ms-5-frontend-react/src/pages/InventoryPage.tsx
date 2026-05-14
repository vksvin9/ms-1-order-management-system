import { useEffect, useState } from "react";

import AdminOnly from "../components/AdminOnly";
import InventoryForm from "../components/inventory/InventoryForm";
import InventoryTable from "../components/inventory/InventoryTable";

import type { Inventory } from "../types/inventory";
import { extractErrorMessage } from "../utils/errorUtils";

import {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory
} from "../services/inventoryService";

function InventoryPage() {
  const [inventoryList, setInventoryList] =
    useState<Inventory[]>([]);
  const [selectedInventory, setSelectedInventory] =
    useState<Inventory | null>(null);
  const [loading, setLoading] = useState(false);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const data = await getAllInventory();

      setInventoryList(data);
    } catch (error) {
      console.error(
        "Failed to load inventory:",
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
    loadInventory();
  }, []);

  const handleSave = async (
    inventory: Inventory
  ) => {
    try {
      if (selectedInventory?.id) {
        await updateInventory(
          selectedInventory.id,
          inventory
        );

        alert(
          "Inventory updated successfully."
        );
      } else {
        await createInventory(
          inventory
        );

        alert(
          "Inventory created successfully."
        );
      }

      setSelectedInventory(null);

      await loadInventory();
    } catch (error) {
      console.error(
        "Failed to save inventory:",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    }
  };

  const handleEdit = (
    inventory: Inventory
  ) => {
    setSelectedInventory(inventory);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (
    id: number
  ) => {
    try {
      await deleteInventory(id);

      alert(
        "Inventory deleted successfully."
      );

      await loadInventory();
    } catch (error) {
      console.error(
        "Failed to delete inventory:",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    }
  };

  const handleCancel = () => {
    setSelectedInventory(null);
  };

  return (
    <div className="container py-4">
      <div className="page-header">
        <h1 className="mb-2">
          Inventory Management
        </h1>
        <p className="mb-0">
          Manage product stock quantities.
        </p>
      </div>

      <AdminOnly>
        <InventoryForm
          selectedInventory={
            selectedInventory
          }
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </AdminOnly>

      {loading ? (
        <div className="alert alert-info shadow-sm">
          Loading inventory...
        </div>
      ) : (
        <InventoryTable
          inventoryList={inventoryList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default InventoryPage;