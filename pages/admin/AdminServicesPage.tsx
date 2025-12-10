"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
}

const initialServices: Service[] = [
  { id: 1, title: "Web Development", description: "Custom website development with modern technologies and responsive design.", price: "$2,999", duration: "4-6 weeks" },
  { id: 2, title: "Mobile App Development", description: "Native iOS and Android applications built with cutting-edge frameworks.", price: "$4,999", duration: "8-12 weeks" },
  { id: 3, title: "UI/UX Design", description: "Professional user interface and experience design for digital products.", price: "$1,499", duration: "2-3 weeks" },
  { id: 4, title: "Digital Marketing", description: "Comprehensive digital marketing strategy and campaign management.", price: "$999/month", duration: "Ongoing" }
];

export function AdminServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: ""
  });

  const handleAddNew = () => {
    setEditingService(null);
    setFormData({ title: "", description: "", price: "", duration: "" });
    setShowEditModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.price.trim() || !formData.duration.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingService) {
      // Update existing service
      setServices(services.map(s =>
        s.id === editingService.id
          ? { ...s, ...formData }
          : s
      ));
      alert("Service updated successfully!");
    } else {
      // Add new service
      const newService: Service = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData
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
          {services.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white text-xl mb-3">{service.title}</h3>
              <p className="text-slate-400 mb-4">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="text-cyan-400">{service.price}</span>
                <span>•</span>
                <span>Duration: {service.duration}</span>
              </div>
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
          ))}
        </div>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-xl p-8 w-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl">{editingService ? "Edit Service" : "Add New Service"}</h2>
                <button onClick={handleCancel} className="text-slate-400 hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg w-full"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg w-full h-24"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg w-full"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg transition-all"
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