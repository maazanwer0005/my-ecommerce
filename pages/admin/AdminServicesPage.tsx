"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { Cpu, Code, Globe, Headphones, Shield, Smartphone, Zap, Rocket, Settings, Database, Server, Cloud, Lock, Monitor, Wifi, Mail, Phone, MessageSquare, FileText, Briefcase, Target, TrendingUp, Users, Award, Star } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon?: any;
  iconName?: string; // Store icon name for selection
  price?: string;
  duration?: string;
}

// Available icons map
const availableIcons: { [key: string]: any } = {
  Cpu,
  Code,
  Globe,
  Headphones,
  Shield,
  Smartphone,
  Zap,
  Rocket,
  Settings,
  Database,
  Server,
  Cloud,
  Lock,
  Monitor,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Briefcase,
  Target,
  TrendingUp,
  Users,
  Award,
  Star
};

// User services data (same as in ServicesPage.tsx)
const userServices = [
  {
    icon: Cpu,
    title: "Technology Solutions",
    description: "Cutting-edge technology solutions tailored to your business needs. We provide comprehensive IT infrastructure and consulting services.",
    features: ["Cloud Computing", "IT Infrastructure", "System Integration", "Tech Consulting"]
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Custom software development services to bring your ideas to life. From web applications to mobile apps, we've got you covered.",
    features: ["Web Development", "Mobile Apps", "Custom Software", "API Integration"]
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Boost your online presence with our comprehensive digital marketing strategies and solutions.",
    features: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"]
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your digital assets with our advanced cybersecurity solutions and monitoring services.",
    features: ["Threat Detection", "Security Audits", "Data Protection", "Compliance"]
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description: "Innovative mobile solutions for iOS and Android platforms. Build engaging mobile experiences for your users.",
    features: ["iOS Development", "Android Apps", "Cross-Platform", "App Maintenance"]
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support to ensure your operations run smoothly without interruptions.",
    features: ["Live Chat", "Phone Support", "Email Support", "Remote Assistance"]
  },
];

// Get icon name from icon component
const getIconName = (iconComponent: any): string => {
  if (!iconComponent) return "";
  for (const [name, Icon] of Object.entries(availableIcons)) {
    if (Icon === iconComponent) {
      return name;
    }
  }
  return "";
};

// Convert user service format to admin format
const convertUserServiceToAdminService = (userService: typeof userServices[0], index: number): Service => {
  return {
    id: index + 1,
    title: userService.title,
    description: userService.description,
    features: userService.features,
    icon: userService.icon,
    iconName: getIconName(userService.icon),
    price: "", // Optional - can be added later
    duration: "" // Optional - can be added later
  };
};

// Initialize admin services from user services
const initializeAdminServices = (): Service[] => {
  return userServices.map((userService, index) => convertUserServiceToAdminService(userService, index));
};

export function AdminServicesPage() {
  // Always use user services - same as user page
  const [services, setServices] = useState<Service[]>(() => {
    return initializeAdminServices();
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "", // Comma-separated string for input
    iconName: "",
    price: "",
    duration: ""
  });

  // Sync with user services on mount to ensure exact same services as user
  useEffect(() => {
    const syncedServices = initializeAdminServices();
    setServices(syncedServices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNew = () => {
    setEditingService(null);
    setFormData({ 
      title: "", 
      description: "", 
      features: "",
      iconName: "Cpu",
      price: "",
      duration: ""
    });
    setShowEditModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features.join(", "),
      iconName: service.iconName || getIconName(service.icon) || "Cpu",
      price: service.price || "",
      duration: service.duration || ""
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill all required fields (Title, Description)!");
      return;
    }

    // Convert features string to array
    const featuresArray = formData.features
      .split(",")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    // Get icon component from icon name
    const selectedIcon = availableIcons[formData.iconName] || Cpu;

    if (editingService) {
      // Update existing service
      setServices(services.map(s =>
        s.id === editingService.id
          ? { 
              ...s, 
              title: formData.title,
              description: formData.description,
              features: featuresArray,
              icon: selectedIcon,
              iconName: formData.iconName,
              price: formData.price,
              duration: formData.duration
            }
          : s
      ));
      alert("Service updated successfully!");
    } else {
      // Add new service
      const newService: Service = {
        id: Math.max(...services.map(s => s.id)) + 1,
        title: formData.title,
        description: formData.description,
        features: featuresArray,
        icon: selectedIcon,
        iconName: formData.iconName,
        price: formData.price,
        duration: formData.duration
      };
      setServices([...services, newService]);
      alert("Service added successfully!");
    }
    setShowEditModal(false);
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">Manage Services</h1>
            <p className="text-slate-400">{services.length} services</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-start gap-4 mb-4">
                  {IconComponent && (
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-white text-xl mb-2">{service.title}</h3>
                    <p className="text-slate-400 mb-3 line-clamp-2">{service.description}</p>
                  </div>
                </div>
                
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <p className="text-slate-300 text-sm mb-2">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <span key={i} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(service.price || service.duration) && (
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    {service.price && <span className="text-cyan-400">{service.price}</span>}
                    {service.price && service.duration && <span>•</span>}
                    {service.duration && <span>Duration: {service.duration}</span>}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  {deleteConfirm === service.id ? (
                    <>
                      <button onClick={() => setServices(services.filter(s => s.id !== service.id))} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(service.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl">{editingService ? "Edit Service" : "Add New Service"}</h2>
                <button onClick={handleCancel} className="text-slate-400 hover:text-slate-300 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Title *</label>
                  <input
                    type="text"
                    placeholder="Service Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Description *</label>
                  <textarea
                    placeholder="Service Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Icon *</label>
                  <div className="flex items-center gap-4">
                    <select
                      value={formData.iconName}
                      onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                      className="bg-slate-700 text-white px-4 py-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      {Object.keys(availableIcons).map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                    {formData.iconName && availableIcons[formData.iconName] && (
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const IconComponent = availableIcons[formData.iconName];
                          return <IconComponent className="w-6 h-6 text-white" />;
                        })()}
                      </div>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mt-1">Select an icon for this service</p>
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Features (comma-separated) *</label>
                  <input
                    type="text"
                    placeholder="e.g., Feature 1, Feature 2, Feature 3"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <p className="text-slate-500 text-xs mt-1">Separate multiple features with commas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-sm mb-2 block">Price (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., $2,999"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm mb-2 block">Duration (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., 4-6 weeks"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all"
                >
                  {editingService ? "Update" : "Add"} Service
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 px-6 py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminServicesPage;