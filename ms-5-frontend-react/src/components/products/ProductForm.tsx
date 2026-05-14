import { useEffect, useState } from 'react';
import type { Product } from '../../types/product';

interface ProductFormProps {
  selectedProduct: Product | null;
  onSave: (product: Product) => Promise<void>;
  onCancel: () => void;
}

function ProductForm({
  selectedProduct,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
      });
    }
  }, [selectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="card custom-card mb-4">
      <div className="card-header">
        <h5 className="mb-0">
          {selectedProduct ? 'Edit Product' : 'Add Product'}
        </h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary px-4 me-2"
          >
            {selectedProduct ? 'Update Product' : 'Save Product'}
          </button>

          {selectedProduct && (
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

export default ProductForm;