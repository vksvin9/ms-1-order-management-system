import authService from "../../services/authService";
import type { Product } from "../../types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => Promise<void>;
}

function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const isAdmin = authService.isAdmin();

  const handleDelete = async (id?: number) => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      await onDelete(id);
    }
  };

  return (
    <div className="card custom-card">
      <div className="card-header">
        <h5 className="mb-0">Product List</h5>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td className="price-text">
                      ₹ {product.price.toLocaleString("en-IN")}
                    </td>
                    <td>
                      {isAdmin && (
                        <>
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => onEdit(product)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDelete(product.id)
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

export default ProductTable;