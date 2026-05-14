import { useState } from 'react';
import type { Order } from '../../types/order';

interface OrderFormProps {
  onSave: (order: Order) => Promise<void>;
}

function OrderForm({ onSave }: OrderFormProps) {
  const [formData, setFormData] = useState<Order>({
    productId: 0,
    quantity: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);

    setFormData({
      productId: 0,
      quantity: 1,
    });
  };

  return (
    <div className="card custom-card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Place Order</h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product ID</label>
            <input
              type="number"
              name="productId"
              className="form-control"
              value={formData.productId}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary px-4"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;