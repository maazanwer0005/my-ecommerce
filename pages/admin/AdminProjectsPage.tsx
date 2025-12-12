"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ConfirmationModal } from "../../components/admin/ConfirmationModal";
import { SuccessModal } from "../../components/admin/SuccessModal";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Cpu, Code, Globe, Shield, Smartphone, Headphones } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  date: string;
  year: string;
  status: string;
  image: string;
  features: string[];
  icon?: any;
}

// User projects data (same as in ProjectsPage.tsx)
const userProjects = [
  {
    icon: Cpu,
    title: "Technology Solutions",
    client: "TechCorp Global",
    year: "2024",
    description: "Delivered cutting-edge technology solutions including cloud computing infrastructure, IT system integration, and comprehensive tech consulting services.",
    features: ["Cloud Computing", "IT Infrastructure", "System Integration", "Tech Consulting"],
    status: "Completed",
    image: "/images/products/usb-hub.png"
  },
  {
    icon: Code,
    title: "Software Development",
    client: "StartupHub Inc",
    year: "2024",
    description: "Built custom web and mobile applications with seamless API integration, delivering a complete software solution from concept to deployment.",
    features: ["Web Development", "Mobile Apps", "Custom Software", "API Integration"],
    status: "Completed",
    image: "/images/products/laptop-stand.png"
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    client: "BrandBoost Ltd",
    year: "2024",
    description: "Executed comprehensive digital marketing strategy that increased online presence by 300% through SEO optimization, social media campaigns, and content marketing.",
    features: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"],
    status: "Completed",
    image: "/images/products/charging-pad.png"
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    client: "SecureBank Corp",
    year: "2023",
    description: "Implemented advanced cybersecurity solutions with 24/7 monitoring, threat detection, and complete compliance with industry standards.",
    features: ["Threat Detection", "Security Audits", "Data Protection", "Compliance"],
    status: "Completed",
    image: "/images/products/laptop-stand.png"
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    client: "MobileFirst Co",
    year: "2023",
    description: "Developed innovative mobile applications for both iOS and Android platforms with cross-platform compatibility and ongoing maintenance support.",
    features: ["iOS Development", "Android Apps", "Cross-Platform", "App Maintenance"],
    status: "Completed",
    image: "/images/products/smart-watch.png"
  },
  {
    icon: Headphones,
    title: "24/7 Support System",
    client: "GlobalTech Solutions",
    year: "2023",
    description: "Established round-the-clock customer support infrastructure with multi-channel assistance ensuring zero downtime for critical operations.",
    features: ["Live Chat", "Phone Support", "Email Support", "Remote Assistance"],
    status: "Completed",
    image: "/images/products/headphones.png"
  },
];

// Convert user project format to admin format
const convertUserProjectToAdminProject = (userProject: typeof userProjects[0], index: number): Project => {
  return {
    id: index + 1,
    title: userProject.title,
    description: userProject.description,
    client: userProject.client,
    date: `${userProject.year}-01-01`, // Convert year to date format
    year: userProject.year,
    status: userProject.status,
    image: userProject.image,
    features: userProject.features,
    icon: userProject.icon
  };
};

// Initialize admin projects from user projects
const initializeAdminProjects = (): Project[] => {
  return userProjects.map((userProject, index) => convertUserProjectToAdminProject(userProject, index));
};

export function AdminProjectsPage() {
  // Always use user projects - same as user page
  const [projects, setProjects] = useState<Project[]>(() => {
    return initializeAdminProjects();
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    status: "Completed",
    year: "",
    image: "",
    features: "" // Comma-separated string for input
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  // Sync with user projects on mount to ensure exact same projects as user
  useEffect(() => {
    const syncedProjects = initializeAdminProjects();
    setProjects(syncedProjects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusColor = (status: string) => status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30";

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({ 
      title: "", 
      description: "", 
      client: "", 
      status: "Completed",
      year: new Date().getFullYear().toString(),
      image: "",
      features: ""
    });
    setImagePreview("");
    setShowEditModal(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      client: project.client,
      status: project.status,
      year: project.year,
      image: project.image,
      features: project.features.join(", ")
    });
    setImagePreview(project.image);
    setShowEditModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.client.trim() || !formData.image.trim()) {
      setShowValidationModal(true);
      return;
    }

    // Convert features string to array
    const featuresArray = formData.features
      .split(",")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { 
              ...p, 
              ...formData,
              features: featuresArray,
              date: `${formData.year}-01-01`
            }
          : p
      ));
      setSuccessMessage("Project updated successfully!");
      setShowSuccessModal(true);
    } else {
      // Add new project
      const newProject: Project = {
        id: Math.max(...projects.map(p => p.id)) + 1,
        ...formData,
        features: featuresArray,
        date: `${formData.year}-01-01`
      };
      setProjects([newProject, ...projects]);
      setSuccessMessage("Project added successfully!");
      setShowSuccessModal(true);
    }
    setShowEditModal(false);
    setImagePreview("");
  };

  const handleDeleteClick = (id: number) => {
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      setProjects(projects.filter(p => p.id !== projectToDelete));
      setProjectToDelete(null);
      setSuccessMessage("Project deleted successfully!");
      setShowSuccessModal(true);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl mb-2">Manage Projects</h1>
            <p className="text-slate-400 text-sm sm:text-base">{projects.length} projects</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Add New Project</span>
            <span className="xs:hidden">Add Project</span>
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3, delay: index * 0.05 }} 
              className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start gap-4 p-4">
                {/* Project Image */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 overflow-hidden rounded-lg bg-slate-700">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Project Content */}
                <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Title and Status */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white text-lg sm:text-xl font-semibold">{project.title}</h3>
                      <span className={`px-2.5 py-1 border rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-slate-400 mb-3 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Client & Year */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
                      <span>Client: {project.client}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                    
                    {/* Feature Tags */}
                    {project.features && project.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 4).map((feature, i) => (
                          <span key={i} className="bg-slate-700/70 text-slate-300 px-3 py-1 rounded-md text-xs border border-slate-600">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      onClick={() => handleEdit(project)}
                      className="bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 rounded-lg transition-all flex items-center justify-center flex-shrink-0"
                      aria-label="Edit"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(project.id)} 
                      className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg transition-all flex items-center justify-center flex-shrink-0"
                      aria-label="Delete"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-white text-lg sm:text-xl lg:text-2xl">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => {
                setShowEditModal(false);
                setImagePreview("");
              }} className="text-white hover:text-slate-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Title *</label>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Description *</label>
                <textarea
                  placeholder="Project Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Client *</label>
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Year *</label>
                  <input
                    type="text"
                    placeholder="e.g., 2024"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">Image *</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <input
                    type="text"
                    placeholder="Or enter image URL"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-slate-300 text-sm mb-2">Preview:</p>
                      <div className="w-full h-48 overflow-hidden rounded-lg border border-slate-600">
                        <ImageWithFallback
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">Features (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Feature 1, Feature 2, Feature 3"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="text-slate-500 text-xs mt-1">Separate multiple features with commas</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all flex-1 text-sm sm:text-base"
              >
                {editingProject ? "Update" : "Add"} Project
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setImagePreview("");
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        type="danger"
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Validation Modal */}
      <ConfirmationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        onConfirm={() => setShowValidationModal(false)}
        title="Validation Error"
        message="Please fill all required fields (Title, Description, Client, Image)!"
        type="warning"
        confirmText="OK"
        cancelText="Close"
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

export default AdminProjectsPage;