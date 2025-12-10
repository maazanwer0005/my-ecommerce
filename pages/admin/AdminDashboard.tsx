"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "../../components/admin/AdminLayout";
import {
  Package,
  FileText,
  Briefcase,
  Wrench,
  ShoppingCart,
  Mail
} from "lucide-react";

const dashboardCards = [
  {
    title: "Products",
    description: "Manage products, pricing, and inventory",
    icon: Package,
    path: "/admin/products",
    color: "from-cyan-500 to-blue-500",
    count: "156"
  },
  {
    title: "Blog",
    description: "Create and manage blog posts",
    icon: FileText,
    path: "/admin/blog",
    color: "from-purple-500 to-pink-500",
    count: "42"
  },
  {
    title: "Projects",
    description: "Manage project portfolio",
    icon: Briefcase,
    path: "/admin/projects",
    color: "from-green-500 to-teal-500",
    count: "28"
  },
  {
    title: "Services",
    description: "Manage service offerings",
    icon: Wrench,
    path: "/admin/services",
    color: "from-orange-500 to-red-500",
    count: "12"
  },
  {
    title: "Orders",
    description: "View and manage customer orders",
    icon: ShoppingCart,
    path: "/admin/orders",
    color: "from-indigo-500 to-purple-500",
    count: "89"
  },
  {
    title: "Contact Messages",
    description: "View customer contact messages",
    icon: Mail,
    path: "/admin/contact-messages",
    color: "from-yellow-500 to-orange-500",
    count: "24"
  }
];

export function AdminDashboard() {
  const router = useRouter();

  return (
    <AdminLayout>
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-white text-4xl mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome to the admin panel</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => router.push(card.path)}
                className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer group border border-slate-700 hover:border-cyan-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-slate-400 text-2xl">{card.count}</span>
                </div>
                <h3 className="text-white text-xl mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
