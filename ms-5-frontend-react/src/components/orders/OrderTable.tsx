import authService from "../../services/authService";
import type { Order } from "../../types/order";

interface OrderTableProps {
  orders: Order[];
  onDelete: (id: number) => Promise<void>;
}

function OrderTable({
  orders,
  onDelete,
}: OrderTableProps) {
  const isAdmin = authService.isAdmin();

  const handleDelete = async (id?: number) => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmed) {
      await onDelete(id);
    }
  };

  return (
    <div className="card custom-card">
      <div className="card-header">
        <h5 className="mb-0">Order History</h5>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Created At</th>
                <th style={{ width: "120px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>

                    <td>
                      {order.productId}
                    </td>

                    <td>
                      {order.productName ||
                        "Unknown Product"}
                    </td>

                    <td>
                      {order.quantity}
                    </td>

                    <td className="price-text">
                      ₹{" "}
                      {(
                        order.totalAmount ?? 0
                      ).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td>
                      <span className="badge bg-primary">
                        {order.status ??
                          "CREATED"}
                      </span>
                    </td>

                    <td>
                      {order.orderDate
                        ? new Date(
                            order.orderDate
                          ).toLocaleString(
                            "en-IN"
                          )
                        : order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                    <td>
                      {isAdmin && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleDelete(
                              order.id
                            )
                          }
                        >
                          Delete
                        </button>
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

export default OrderTable;