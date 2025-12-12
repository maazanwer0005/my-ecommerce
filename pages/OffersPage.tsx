"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";

// Big Offers products
const bigOffersProducts = [
  {
    id: 1,
    name: "MacBook Pro M3 16\"",
    price: 2249.99,
    originalPrice: 2499.99,
    discount: "10% OFF",
    rating: 5,
    reviews: 142,
    imageQuery: "/images/products/laptop-stand.png"
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1399.99,
    discount: "15% OFF",
    rating: 5,
    reviews: 328,
    imageQuery: "/images/products/smart-watch.png"
  },
  {
    id: 3,
    name: "Dyson V15 Vacuum",
    price: 599.99,
    originalPrice: 749.99,
    discount: "20% OFF",
    rating: 5,
    reviews: 89,
    imageQuery: "/images/products/bluetooth-speaker.png"
  },
  {
    id: 4,
    name: "Peloton Bike+",
    price: 1871.25,
    originalPrice: 2495.00,
    discount: "25% OFF",
    rating: 5,
    reviews: 256,
    imageQuery: "/images/products/smart-watch.png"
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 349.99,
    originalPrice: 399.99,
    discount: "13% OFF",
    rating: 5,
    reviews: 512,
    imageQuery: "/images/products/headphones.png"
  },
  {
    id: 6,
    name: "Samsung Galaxy Watch",
    price: 279.99,
    originalPrice: 349.99,
    discount: "20% OFF",
    rating: 5,
    reviews: 198,
    imageQuery: "/images/products/smart-watch.png"
  },
  {
    id: 7,
    name: "iPad Pro 12.9\"",
    price: 999.99,
    originalPrice: 1199.99,
    discount: "17% OFF",
    rating: 5,
    reviews: 421,
    imageQuery: "/images/products/charging-pad.png"
  },
  {
    id: 8,
    name: "Canon EOS R5 Camera",
    price: 3399.99,
    originalPrice: 3899.99,
    discount: "13% OFF",
    rating: 5,
    reviews: 167,
    imageQuery: "/images/products/usb-hub.png"
  },
];

// Other Offers products
const otherOffersProducts = [
  { 
    id: 101, 
    title: "Smart Accessories", 
    discount: "30% OFF", 
    price: 49.99, 
    originalPrice: 71.42,
    image: "/images/products/usb-hub.png",
    rating: 4.5,
    reviews: 89
  },
  { 
    id: 102, 
    title: "Tech Gadgets", 
    discount: "25% OFF", 
    price: 79.99, 
    originalPrice: 106.65,
    image: "/images/products/charging-pad.png",
    rating: 4.7,
    reviews: 156
  },
  { 
    id: 103, 
    title: "Home Automation", 
    discount: "40% OFF", 
    price: 129.99, 
    originalPrice: 216.65,
    image: "/images/products/bluetooth-speaker.png",
    rating: 4.8,
    reviews: 203
  },
  { 
    id: 104, 
    title: "Wearable Tech", 
    discount: "35% OFF", 
    price: 89.99, 
    originalPrice: 138.45,
    image: "/images/products/smart-watch.png",
    rating: 4.6,
    reviews: 127
  },
  { 
    id: 105, 
    title: "Audio Devices", 
    discount: "20% OFF", 
    price: 59.99, 
    originalPrice: 74.99,
    image: "/images/products/bluetooth-speaker.png",
    rating: 4.9,
    reviews: 312
  },
];

// Combine all offers
const allOffers = [
  ...bigOffersProducts.map(p => ({
    ...p,
    type: "big-offer"
  })),
  ...otherOffersProducts.map(p => ({
    id: p.id,
    name: p.title,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    rating: p.rating,
    reviews: p.reviews,
    imageQuery: p.image,
    type: "other-offer"
  }))
];

export function OffersPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Big Offers", "Other Offers"];

  const filteredOffers = selectedCategory === "All"
    ? allOffers
    : selectedCategory === "Big Offers"
    ? allOffers.filter(o => o.type === "big-offer")
    : allOffers.filter(o => o.type === "other-offer");

  // Dynamic header title based on selected category
  const getHeaderTitle = () => {
    if (selectedCategory === "Big Offers") return "Big Offers";
    if (selectedCategory === "Other Offers") return "Other Offers";
    return "All Offers";
  };

  const getHeaderDescription = () => {
    if (selectedCategory === "Big Offers") {
      return "Discover our most exclusive deals and products at competitive prices. Quality and value that you can trust.";
    }
    if (selectedCategory === "Other Offers") {
      return "Explore additional products with special pricing. Quality products at competitive rates.";
    }
    return "Discover our complete collection of exclusive deals and special offers. Quality products at unbeatable prices.";
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof allOffers[0]) => {
    e.stopPropagation();
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.imageQuery
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-3">
              <span className="text-sm">★ Exclusive Deals</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl mb-4">{getHeaderTitle()}</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {getHeaderDescription()}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => {
            const count = cat === "All" 
              ? allOffers.length 
              : cat === "Big Offers"
              ? bigOffersProducts.length
              : otherOffersProducts.length;
            
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Count */}
        <p className="text-slate-600 mb-6 text-center">
          Showing <span className="font-semibold">{filteredOffers.length}</span> offers
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredOffers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => router.push(`/product/${product.id}`)}
              className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group border border-slate-200 hover:border-cyan-500"
            >
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-10">
                  {product.discount}
                </div>
              )}

              {/* Product Image */}
              <div className="h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-cyan-50 group-hover:to-blue-50 transition-all relative overflow-hidden">
                <ImageWithFallback
                  src={product.imageQuery}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-slate-900 text-lg mb-2 group-hover:text-cyan-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    {product.reviews && (
                      <span className="text-slate-600 text-sm">
                        ({product.reviews})
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-slate-500 line-through text-sm">
                    ${product.originalPrice}
                  </span>
                  <span className="text-slate-900 text-2xl">
                    ${product.price}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition-all transform group-hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OffersPage;

