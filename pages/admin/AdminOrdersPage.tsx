"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Eye, X } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  products: { name: string; quantity: number; price: number }[];
}

// User orders data (same as in OrdersPage.tsx)
interface UserOrder {
  id: string;
  date: string;
  total: string;
  status: string;
  items: { name: string; price: string }[];
}

const userOrders: UserOrder[] = [
  {
    id: "#j6gg6l0",
    date: "12/4/2025",
    total: "$799.97",
    status: "shipped",
    items: [
      { name: "Sony WH-1000XM5 Headphones (x1)", price: "$349.99" },
      { name: "iPad Air 5th Gen (x1)", price: "$599.99" },
    ],
  },
  {
    id: "#op0lt14k",
    date: "12/4/2025",
    total: "$2699.98",
    status: "completed",
    items: [
      { name: "MacBook Pro M3 16\" (x1)", price: "$2499.99" },
    ],
  },
  {
    id: "#p7xhlwt7",
    date: "12/4/2025",
    total: "$799.97",
    status: "shipped",
    items: [
      { name: "Sony WH-1000XM5 Headphones (x1)", price: "$349.99" },
    ],
  },
  {
    id: "#k8mn2p5",
    date: "12/3/2025",
    total: "$1299.99",
    status: "completed",
    items: [
      { name: "Samsung Galaxy S24 Ultra (x1)", price: "$1199.99" },
      { name: "Galaxy Buds Pro (x1)", price: "$199.99" },
    ],
  },
  {
    id: "#r9qw3x7",
    date: "12/2/2025",
    total: "$549.98",
    status: "shipped",
    items: [
      { name: "Nintendo Switch OLED (x1)", price: "$349.99" },
      { name: "Legend of Zelda Game (x1)", price: "$59.99" },
    ],
  },
  {
    id: "#t5ab8c2",
    date: "12/1/2025",
    total: "$1899.97",
    status: "completed",
    items: [
      { name: "LG OLED TV 55\" (x1)", price: "$1499.99" },
      { name: "Soundbar System (x1)", price: "$399.99" },
    ],
  },
];

// Convert user order format to admin order format
const convertUserOrderToAdminOrder = (userOrder: UserOrder, index: number): Order => {
  // Convert date from MM/DD/YYYY to YYYY-MM-DD
  const dateParts = userOrder.date.split('/');
  const formattedDate = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
  
  // Convert total from "$799.97" to 799.97
  const totalAmount = parseFloat(userOrder.total.replace('$', '').replace(',', ''));
  
  // Convert status: "completed" -> "delivered", "shipped" -> "shipped"
  const status = userOrder.status === "completed" ? "delivered" : userOrder.status;
  
  // Convert items to products
  const products = userOrder.items.map(item => {
    // Extract quantity from name like "Sony WH-1000XM5 Headphones (x1)"
    const quantityMatch = item.name.match(/\(x(\d+)\)/);
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
    
    // Extract product name (remove quantity part)
    const productName = item.name.replace(/\s*\(x\d+\)\s*$/, '');
    
    // Convert price from "$349.99" to 349.99
    const price = parseFloat(item.price.replace('$', '').replace(',', ''));
    
    return { name: productName, quantity, price };
  });
  
  return {
    id: userOrder.id.replace('#', ''),
    orderNumber: userOrder.id,
    customerName: "Customer",
    customerEmail: "customer@example.com",
    orderDate: formattedDate,
    totalAmount,
    status,
    products
  };
};

// Initialize admin orders from user orders
const initializeAdminOrders = (): Order[] => {
  return userOrders.map((userOrder, index) => convertUserOrderToAdminOrder(userOrder, index));
};

export function AdminOrdersPage() {
  // Always use user orders - same as user page
  const [orders, setOrders] = useState<Order[]>(() => {
    return initializeAdminOrders();
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Sync with user orders on mount to ensure exact same orders as user
  useEffect(() => {
    const syncedOrders = initializeAdminOrders();
    setOrders(syncedOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "processed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "shipped": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "delivered": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-white text-3xl mb-2">Manage Orders</h1>
          <p className="text-slate-400">{orders.length} total orders</p>
        </div>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                {/* Order Info */}
                <div className="md:col-span-2">
                  <h3 className="text-white text-lg mb-1">{order.orderNumber}</h3>
                  <p className="text-slate-400 text-sm">{order.customerName}</p>
                  <p className="text-slate-500 text-sm">{order.customerEmail}</p>
                  <p className="text-slate-500 text-sm mt-2">Date: {order.orderDate}</p>
                </div>

                {/* Products */}
                <div>
                  <p className="text-slate-300 text-sm mb-1">Products:</p>
                  {order.products.map((product, idx) => (
                    <p key={idx} className="text-slate-400 text-sm">
                      {product.name} x{product.quantity}
                    </p>
                  ))}
                </div>

                {/* Amount */}
                <div>
                  <p className="text-slate-300 text-sm mb-1">Total Amount:</p>
                  <p className="text-cyan-400 text-lg">${order.totalAmount.toFixed(2)}</p>
                </div>

                {/* Status & Actions */}
                <div className="space-y-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-700 ${getStatusColor(order.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processed">Processed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 mb-1 text-sm">Order Number:</p>
                  <p className="text-white text-lg">{selectedOrder.orderNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 mb-1 text-sm">Customer Name:</p>
                    <p className="text-white">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1 text-sm">Email:</p>
                    <p className="text-white">{selectedOrder.customerEmail}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 mb-1 text-sm">Order Date:</p>
                  <p className="text-white">{selectedOrder.orderDate}</p>
                </div>

                <div>
                  <p className="text-slate-400 mb-2 text-sm">Products:</p>
                  <div className="bg-slate-700/50 rounded-lg p-4 space-y-2 border border-slate-600">
                    {selectedOrder.products.map((product, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-white">{product.name} x{product.quantity}</span>
                        <span className="text-slate-300">${product.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 mb-1 text-sm">Total Amount:</p>
                  <p className="text-cyan-400 text-2xl">${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-slate-400 mb-1 text-sm">Status:</p>
                  <span className={`inline-block px-4 py-2 border rounded-lg ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-6 w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminOrdersPage;
