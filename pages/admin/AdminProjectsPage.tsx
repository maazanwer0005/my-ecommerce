"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  date: string;
  status: string;
}

const initialProjects: Project[] = [
  { id: 1, title: "E-commerce Platform Redesign", description: "Complete overhaul of online shopping experience with modern UI/UX", client: "TechStore Inc.", date: "2025-11-15", status: "Completed" },
  { id: 2, title: "Mobile App Development", description: "Native iOS and Android app for inventory management", client: "LogiTech Solutions", date: "2025-11-20", status: "In Progress" },
  { id: 3, title: "AI Chatbot Integration", description: "Customer service automation using advanced AI technology", client: "Support Plus", date: "2025-11-10", status: "Completed" }
];

export function AdminProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    status: "In Progress"
  });

  const getStatusColor = (status: string) => status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30";

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({ title: "", description: "", client: "", status: "In Progress" });
    setShowEditModal(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      client: project.client,
      status: project.status
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.client.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData }
          : p
      ));
      alert("Project updated successfully!");
    } else {
      // Add new project
      const newProject: Project = {
        id: Math.max(...projects.map(p => p.id)) + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setProjects([newProject, ...projects]);
      alert("Project added successfully!");
    }
    setShowEditModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">Manage Projects</h1>
            <p className="text-slate-400">{projects.length} projects</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-xl">{project.title}</h3>
                    <span className={`px-3 py-1 border rounded-full text-sm ${getStatusColor(project.status)}`}>{project.status}</span>
                  </div>
                  <p className="text-slate-400 mb-3">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Client: {project.client}</span>
                    <span>•</span>
                    <span>{project.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  {deleteConfirm === project.id ? (
                    <>
                      <button onClick={() => setProjects(projects.filter(p => p.id !== project.id))} className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all text-sm">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-3 rounded-lg transition-all text-sm">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(project.id)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-8 rounded-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setShowEditModal(false)} className="text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-700 text-white p-3 rounded-lg w-full"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700 text-white p-3 rounded-lg w-full h-24"
              />
              <input
                type="text"
                placeholder="Client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="bg-slate-700 text-white p-3 rounded-lg w-full"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="bg-slate-700 text-white p-3 rounded-lg w-full"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all mt-4"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}