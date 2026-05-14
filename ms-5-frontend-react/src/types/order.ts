export interface Order {
  id?: number;
  productId: number;
  productName?: string;
  quantity: number;
  totalAmount?: number;
  status?: string;
  orderDate?: string;
  createdAt?: string;
}