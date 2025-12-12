"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { blogPosts, featuredPost } from "../../components/data/blogPosts";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
  readTime?: string;
}

// Convert user blog format to admin format
const convertUserBlogToAdminBlog = (userBlog: typeof blogPosts[0] | typeof featuredPost): BlogPost => {
  return {
    id: userBlog.id,
    title: userBlog.title,
    excerpt: userBlog.excerpt,
    date: userBlog.date,
    author: userBlog.author,
    category: userBlog.category,
    image: userBlog.image,
    content: userBlog.content || '',
    readTime: 'readTime' in userBlog ? userBlog.readTime : undefined
  };
};

// Initialize admin blogs from user blogs (including featured post)
const initializeAdminBlogs = (): BlogPost[] => {
  const allUserBlogs = [featuredPost, ...blogPosts];
  return allUserBlogs.map(convertUserBlogToAdminBlog);
};

export function AdminBlogPage() {
  // Always use user blogs - same as user page
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    return initializeAdminBlogs();
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "",
    image: "",
    content: "",
    readTime: ""
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  // Sync with user blogs on mount to ensure exact same blogs as user
  useEffect(() => {
    const syncedBlogs = initializeAdminBlogs();
    setBlogs(syncedBlogs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNew = () => {
    setEditingBlog(null);
    setFormData({ 
      title: "", 
      excerpt: "", 
      author: "Admin", 
      category: "",
      image: "",
      content: "",
      readTime: "5 min read"
    });
    setImagePreview("");
    setShowEditModal(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      category: blog.category,
      image: blog.image,
      content: blog.content,
      readTime: blog.readTime || "5 min read"
    });
    setImagePreview(blog.image);
    setShowEditModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll use a URL.createObjectURL for preview
      // In production, you'd upload to a server and get the URL
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
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.category.trim() || !formData.image.trim()) {
      alert("Please fill all required fields (Title, Excerpt, Category, Image)!");
      return;
    }

    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(b =>
        b.id === editingBlog.id
          ? { 
              ...b, 
              ...formData,
              date: b.date // Keep original date
            }
          : b
      ));
      alert("Blog post updated successfully!");
    } else {
      // Add new blog
      const newBlog: BlogPost = {
        id: Math.max(...blogs.map(b => b.id)) + 1,
        ...formData,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
      setBlogs([newBlog, ...blogs]);
      alert("Blog post added successfully!");
    }
    setShowEditModal(false);
    setImagePreview("");
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
            <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <div className="flex items-start gap-4">
                {/* Blog Image */}
                <div className="w-48 h-32 flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Blog Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white text-xl mb-2">{blog.title}</h3>
                      <p className="text-slate-400 mb-3 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>By {blog.author}</span>
                        <span>•</span>
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span className="text-cyan-400">{blog.category}</span>
                        {blog.readTime && (
                          <>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                          </>
                        )}
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl">{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</h2>
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
                    placeholder="Blog Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Excerpt *</label>
                  <textarea
                    placeholder="Short description/excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-sm mb-2 block">Author *</label>
                    <input
                      type="text"
                      placeholder="Author Name"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm mb-2 block">Category *</label>
                    <input
                      type="text"
                      placeholder="Category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
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
                  <label className="text-slate-300 text-sm mb-2 block">Content (HTML)</label>
                  <textarea
                    placeholder="Full blog content (HTML supported)"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-48 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex-1"
                >
                  {editingBlog ? "Update" : "Add"} Blog Post
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setImagePreview("");
                  }}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-all"
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

export default AdminBlogPage;