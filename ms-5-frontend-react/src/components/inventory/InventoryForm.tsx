import { useEffect, useState } from "react";
import type { Inventory } from "../../types/inventory";

interface InventoryFormProps {
  selectedInventory: Inventory | null;
  onSave: (inventory: Inventory) => Promise<void>;
  onCancel: () => void;
}

function InventoryForm({
  selectedInventory,
  onSave,
  onCancel,
}: InventoryFormProps) {
  const [formData, setFormData] = useState<Inventory>({
    productId: 0,
    availableQuantity: 0,
  });

  useEffect(() => {
    if (selectedInventory) {
      // IMPORTANT:
      // selectedInventory contains:
      // {
      //   id: 4,              // Inventory record ID
      //   productId: 2,       // Actual Product ID
      //   availableQuantity: 10
      // }
      //
      // We must explicitly map productId and availableQuantity.
      // Do NOT use setFormData(selectedInventory),
      // because that also copies id and can cause confusion.

      setFormData({
        productId: selectedInventory.productId,
        availableQuantity:
          selectedInventory.availableQuantity,
      });
    } else {
      setFormData({
        productId: 0,
        availableQuantity: 0,
      });
    }
  }, [selectedInventory]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="card custom-card mb-4">
      <div className="card-header">
        <h5 className="mb-0">
          {selectedInventory
            ? "Edit Inventory"
            : "Add Inventory"}
        </h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Product ID
            </label>
            <input
              type="number"
              name="productId"
              className="form-control"
              value={formData.productId}
              onChange={handleChange}
              min="1"
              required
              disabled={
                selectedInventory !== null
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Available Quantity
            </label>
            <input
              type="number"
              name="availableQuantity"
              className="form-control"
              value={
                formData.availableQuantity
              }
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary px-4 me-2"
          >
            {selectedInventory
              ? "Update Inventory"
              : "Save Inventory"}
          </button>

          {selectedInventory && (
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default InventoryForm;