"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, ChevronDown } from "lucide-react";
import { products as userProducts } from "@/data/products";

// Product type definition for admin (compatible with user products)
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  discount: number;
  onOffer: boolean;
  bigOffer: boolean;
  image: string;
  rating: number;
}

// Convert user product format to admin format
const convertToAdminProduct = (userProduct: typeof userProducts[0]): Product => {
  // Extract discount percentage from string like "25% OFF"
  const discountMatch = userProduct.discount?.match(/(\d+)/);
  const discountPercent = discountMatch ? parseInt(discountMatch[1]) : 0;
  
  // Determine if it's on offer and big offer
  const onOffer = discountPercent > 0;
  const bigOffer = discountPercent >= 25; // 25% or more = big offer
  
  return {
    id: userProduct.id,
    name: userProduct.name,
    price: userProduct.price,
    category: userProduct.category,
    description: userProduct.description,
    discount: discountPercent,
    onOffer,
    bigOffer,
    image: userProduct.image,
    rating: userProduct.rating || 0
  };
};

// Initialize admin products from user products
const initializeAdminProducts = (): Product[] => {
  return userProducts.map(convertToAdminProduct);
};

export function AdminProductsPage() {
  const router = useRouter();
  // Always use user products directly - no localStorage merging
  // This ensures admin always shows exact same 12 products as user
  const [products, setProducts] = useState<Product[]>(() => {
    return initializeAdminProducts();
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  // Sync with user products on mount to ensure exact same products as user
  // Remove any products that don't match user products
  useEffect(() => {
    const syncedProducts = initializeAdminProducts();
    setProducts(syncedProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((p: Product) => p.id !== id);
    setProducts(updatedProducts);
    setDeleteConfirm(null);
    alert(`Product deleted successfully!`);
  };

  const handleEdit = (id: number) => {
    console.log("Editing product ID:", id);
    router.push(`/admin/products/edit/${id}`);
  };

  // Sort products based on selected sort option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "featured":
      default:
        return 0; // Keep original order for featured (no sorting)
    }
  });

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">Manage Products</h1>
            <p className="text-slate-400">{products.length} total products</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-700 border border-slate-600 text-white px-4 py-2 pr-10 rounded-lg hover:border-cyan-500 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <button
              onClick={() => router.push("/admin/products/add")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-700"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.bigOffer && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    Big Offer
                  </span>
                )}
                {product.onOffer && !product.bigOffer && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    On Offer
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-white text-lg mb-1">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-cyan-400">${product.price}</p>
                  <p className="text-slate-500 text-sm">{product.category}</p>
                </div>
                {product.discount > 0 && (
                  <p className="text-orange-400 text-sm mb-3">Discount: {product.discount}%</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  {deleteConfirm === product.id ? (
                    <>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProductsPage;