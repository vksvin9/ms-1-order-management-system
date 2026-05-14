import { useEffect, useState } from "react";

import AdminOnly from "../components/AdminOnly";
import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";

import type { Product } from "../types/product";
import { extractErrorMessage } from "../utils/errorUtils";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();

      setProducts(data);
    } catch (error) {
      console.error(
        "Failed to load products:",
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
    loadProducts();
  }, []);

  const handleSave = async (
    product: Product
  ) => {
    try {
      if (selectedProduct?.id) {
        await updateProduct(
          selectedProduct.id,
          product
        );

        alert(
          "Product updated successfully."
        );
      } else {
        await createProduct(product);

        alert(
          "Product created successfully."
        );
      }

      setSelectedProduct(null);

      await loadProducts();
    } catch (error) {
      console.error(
        "Failed to save product:",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    }
  };

  const handleEdit = (
    product: Product
  ) => {
    setSelectedProduct(product);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (
    id: number
  ) => {
    try {
      await deleteProduct(id);

      alert(
        "Product deleted successfully."
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Failed to delete product:",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container py-4">
      <div className="page-header">
        <h1 className="mb-2">
          Product Management
        </h1>
        <p className="mb-0">
          Create, update, and manage your
          products.
        </p>
      </div>

      <AdminOnly>
        <ProductForm
          selectedProduct={
            selectedProduct
          }
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </AdminOnly>

      {loading ? (
        <div className="alert alert-info shadow-sm">
          Loading products...
        </div>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default ProductPage;