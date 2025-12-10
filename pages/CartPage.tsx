"use client";

import { motion } from "motion/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getSubtotal } = useCart();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const shippingCost = 10.00;
  const subtotal = getSubtotal();
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    // Checkout logic here
    alert('Proceeding to checkout...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-slate-900 text-3xl mb-4">Your Cart is Empty</h2>
          <p className="text-slate-600 mb-8">Add some products to get started!</p>
          <button
            onClick={() => router.push('/')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Cart Items */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-slate-900 text-3xl">Shopping Cart</h1>
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-slate-900 text-lg mb-1">{item.name}</h3>
                      <p className="text-cyan-600 mb-3">${item.price.toFixed(2)}</p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-3 py-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-slate-900 min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-slate-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Shipping & Summary */}
          <div>
            {/* Shipping Information */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <h2 className="text-slate-900 text-2xl mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={shippingInfo.country}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-slate-900 text-2xl mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-slate-900 text-xl">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg transition-all transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
