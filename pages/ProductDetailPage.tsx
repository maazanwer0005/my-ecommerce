"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ArrowLeft } from "lucide-react";

export function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  // Handle case when id is not available during SSR
  if (!id) {
    return null;
  }

  // Mock product data
  const product = {
    id: id,
    name: "Premium Wireless Headphones",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 256,
    category: "Audio",
    inStock: true,
    description: "Experience premium sound quality with our state-of-the-art wireless headphones. Featuring advanced noise cancellation, comfortable design, and long-lasting battery life.",
    features: [
      "Active Noise Cancellation (ANC)",
      "40-hour battery life",
      "Premium sound quality",
      "Comfortable over-ear design",
      "Bluetooth 5.0 connectivity",
      "Foldable and portable"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 Ohms",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.0, 3.5mm Jack",
      "Battery": "40 hours playback"
    },
    image: "/images/products/headphones.png"
  };

  const images = [
    "/images/products/headphones.png",
    "/images/products/headphones.png",
    "/images/products/headphones.png",
    "/images/products/headphones.png"
  ];

  const reviews = [
    { id: 1, author: "John Doe", rating: 5, date: "2024-01-15", comment: "Excellent product! The sound quality is amazing and the battery lasts all day." },
    { id: 2, author: "Jane Smith", rating: 4, date: "2024-01-10", comment: "Very comfortable to wear for long periods. Great noise cancellation." },
    { id: 3, author: "Mike Johnson", rating: 5, date: "2024-01-05", comment: "Best headphones I've ever owned. Worth every penny!" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="bg-white rounded-2xl p-8 mb-4 border border-slate-200 overflow-hidden">
              <div className="h-96 rounded-xl overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                    ? "border-cyan-500"
                    : "border-slate-200 hover:border-slate-300"
                    }`}
                >
                  <div className="h-20 overflow-hidden">
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-600 text-sm">{product.category}</span>
            <h1 className="text-slate-900 text-3xl md:text-4xl mb-4 mt-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-slate-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-slate-500 line-through text-xl">
                ${product.originalPrice}
              </span>
              <span className="text-slate-900 text-4xl">
                ${product.price}
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Save 25%
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className="text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-slate-700 mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white border border-slate-200 w-10 h-10 rounded-lg hover:bg-slate-50 transition-all"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border border-slate-200 rounded-lg py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white border border-slate-200 w-10 h-10 rounded-lg hover:bg-slate-50 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => router.push('/login')}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-white border border-slate-200 p-4 rounded-lg hover:bg-slate-50 transition-all">
                <Heart className="w-5 h-5 text-slate-600" />
              </button>
              <button className="bg-white border border-slate-200 p-4 rounded-lg hover:bg-slate-50 transition-all">
                <Share2 className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Features */}
            <div className="bg-slate-100 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-cyan-600" />
                <span className="text-slate-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-cyan-600" />
                <span className="text-slate-700">2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-cyan-600" />
                <span className="text-slate-700">30-day return policy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 mb-16"
        >
          {/* Tabs */}
          <div className="flex gap-6 border-b border-slate-200 mb-8">
            {["description", "features", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 capitalize transition-colors ${activeTab === tab
                  ? "text-cyan-600 border-b-2 border-cyan-600"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "description" && (
              <div>
                <p className="text-slate-600 leading-relaxed mb-4">{product.description}</p>
                <p className="text-slate-600 leading-relaxed">
                  These premium wireless headphones are designed for audiophiles who demand the best.
                  With advanced noise cancellation technology, you can immerse yourself in your music
                  without any distractions. The comfortable over-ear design ensures you can wear them
                  for hours without discomfort.
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-cyan-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">{key}</span>
                    <span className="text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="mb-8">
                  <h3 className="text-slate-900 text-xl mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-slate-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                              <span className="text-cyan-600">{review.author[0]}</span>
                            </div>
                            <div>
                              <p className="text-slate-900">{review.author}</p>
                              <p className="text-slate-500 text-sm">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-300"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Form */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="text-slate-900 text-lg mb-4">Write a Review</h4>
                  <form className="space-y-4">
                    <div>
                      <label className="text-slate-700 mb-2 block">Rating</label>
                      <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className="hover:scale-110 transition-transform"
                          >
                            <Star className="w-6 h-6 text-slate-300 hover:text-yellow-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-700 mb-2 block">Your Review</label>
                      <textarea
                        className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        rows={4}
                        placeholder="Share your experience with this product..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition-all"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetailPage;