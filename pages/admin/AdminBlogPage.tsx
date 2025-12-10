"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

const initialBlogs: BlogPost[] = [
  { id: 1, title: "The Future of AI in E-commerce", excerpt: "Discover how artificial intelligence is revolutionizing online shopping...", date: "2025-11-28", author: "Admin", category: "Technology" },
  { id: 2, title: "Top 10 Gadgets of 2025", excerpt: "Our curated list of the most innovative tech products this year...", date: "2025-11-25", author: "Admin", category: "Reviews" },
  { id: 3, title: "Sustainable Shopping Practices", excerpt: "Learn how to make environmentally conscious purchasing decisions...", date: "2025-11-20", author: "Admin", category: "Lifestyle" }
];

export function AdminBlogPage() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: ""
  });

  const handleAddNew = () => {
    setEditingBlog(null);
    setFormData({ title: "", excerpt: "", author: "Admin", category: "" });
    setShowEditModal(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      category: blog.category
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.category.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(b =>
        b.id === editingBlog.id
          ? { ...b, ...formData }
          : b
      ));
      alert("Blog post updated successfully!");
    } else {
      // Add new blog
      const newBlog: BlogPost = {
        id: Math.max(...blogs.map(b => b.id)) + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setBlogs([newBlog, ...blogs]);
      alert("Blog post added successfully!");
    }
    setShowEditModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">Manage Blog</h1>
            <p className="text-slate-400">{blogs.length} blog posts</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Post
          </button>
        </div>

        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white text-xl mb-2">{blog.title}</h3>
                  <p className="text-slate-400 mb-3">{blog.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>By {blog.author}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span className="text-cyan-400">{blog.category}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  {deleteConfirm === blog.id ? (
                    <>
                      <button onClick={() => setBlogs(blogs.filter(b => b.id !== blog.id))} className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all text-sm">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-3 rounded-lg transition-all text-sm">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(blog.id)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-xl p-8 w-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl">Edit Blog Post</h2>
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
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full"
                />
                <textarea
                  placeholder="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-24"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full"
                />
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
      </div>
    </AdminLayout>
  );
}

export default AdminBlogPage;