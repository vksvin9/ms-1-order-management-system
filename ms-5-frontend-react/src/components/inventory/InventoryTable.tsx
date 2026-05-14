import authService from "../../services/authService";
import type { Inventory } from "../../types/inventory";

interface InventoryTableProps {
  inventoryList: Inventory[];
  onEdit: (inventory: Inventory) => void;
  onDelete: (id: number) => Promise<void>;
}

function InventoryTable({
  inventoryList,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  const isAdmin = authService.isAdmin();

  const handleDelete = async (id?: number) => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory record?"
    );

    if (confirmed) {
      await onDelete(id);
    }
  };

  return (
    <div className="card custom-card">
      <div className="card-header">
        <h5 className="mb-0">Inventory List</h5>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Inventory ID</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Available Quantity</th>
                <th style={{ width: "150px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {inventoryList.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center"
                  >
                    No inventory records found.
                  </td>
                </tr>
              ) : (
                inventoryList.map((inventory) => (
                  <tr key={inventory.id}>
                    <td>{inventory.id}</td>

                    <td>
                      {inventory.productId}
                    </td>

                    <td>
                      {inventory.productName ||
                        "Unknown Product"}
                    </td>

                    <td>
                      <span
                        className={`badge stock-badge ${
                          inventory.availableQuantity >
                          10
                            ? "bg-success"
                            : inventory.availableQuantity >
                              0
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {
                          inventory.availableQuantity
                        }
                      </span>
                    </td>

                    <td>
                      {isAdmin && (
                        <>
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() =>
                              onEdit(inventory)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDelete(
                                inventory.productId
                              )
                            }
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InventoryTable;