"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ConfirmationModal } from "../../components/admin/ConfirmationModal";
import { SuccessModal } from "../../components/admin/SuccessModal";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Sync with user products on mount to ensure exact same products as user
  // Remove any products that don't match user products
  useEffect(() => {
    const syncedProducts = initializeAdminProducts();
    setProducts(syncedProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      const updatedProducts = products.filter((p: Product) => p.id !== productToDelete);
      setProducts(updatedProducts);
      setProductToDelete(null);
      setSuccessMessage("Product deleted successfully!");
      setShowSuccessModal(true);
    }
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl mb-2">Manage Products</h1>
            <p className="text-slate-400 text-sm sm:text-base">{products.length} total products</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-700 border border-slate-600 text-white px-4 py-2 pr-10 rounded-lg hover:border-cyan-500 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-auto text-sm sm:text-base"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <button
              onClick={() => router.push("/admin/products/add")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base whitespace-nowrap"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Add New Product</span>
              <span className="xs:hidden">Add Product</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  className="w-full h-40 sm:h-48 object-cover"
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
              <div className="p-4 sm:p-5">
                <h3 className="text-white text-base sm:text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-cyan-400 text-sm sm:text-base">${product.price}</p>
                  <p className="text-slate-500 text-xs sm:text-sm">{product.category}</p>
                </div>
                {product.discount > 0 && (
                  <p className="text-orange-400 text-xs sm:text-sm mb-3">Discount: {product.discount}%</p>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete this product? This action cannot be undone.`}
        type="danger"
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        message={successMessage}
      />
    </AdminLayout>
  );
}

export default AdminProductsPage;