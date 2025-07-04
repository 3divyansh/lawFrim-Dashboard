import React, { useState, useRef } from 'react';
import { ChevronRight, Image, Bold, Italic, Underline, List, Link, Quote, Eye, Edit, Trash2, Plus, Save, X } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with Physiotherapy",
      slug: "getting-started-physiotherapy",
      excerpt: "Learn the basics of physiotherapy and how it can help improve your quality of life.",
      content: "Physiotherapy is a healthcare profession that helps people restore, maintain and maximize their strength, function, movement and overall well-being.",
      featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      status: "published",
      createdAt: "2024-01-15",
      tags: ["physiotherapy", "health", "wellness"]
    },
    {
      id: 2,
      title: "Benefits of Regular Exercise",
      slug: "benefits-regular-exercise",
      excerpt: "Discover how regular exercise can transform your physical and mental health.",
      content: "Regular exercise is one of the most important things you can do for your health.",
      featuredImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      status: "draft",
      createdAt: "2024-01-10",
      tags: ["exercise", "fitness", "health"]
    }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'editor'
  const contentRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    status: 'draft',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    h1: '',
    h2: '',
    introduction: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      status: 'draft',
      tags: '',
      metaTitle: '',
      metaDescription: '',
      h1: '',
      h2: '',
      introduction: ''
    });
  };

  const handleNewBlog = () => {
    resetForm();
    setEditingBlog(null);
    setCurrentView('editor');
  };

  const handleEdit = (blog) => {
    setFormData({
      ...blog,
      tags: blog.tags ? blog.tags.join(', ') : ''
    });
    setEditingBlog(blog);
    setCurrentView('editor');
  };

  const handleSave = () => {
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      id: editingBlog ? editingBlog.id : Date.now(),
      createdAt: editingBlog ? editingBlog.createdAt : new Date().toISOString().split('T')[0],
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    };

    if (editingBlog) {
      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? blogData : blog));
    } else {
      setBlogs([...blogs, blogData]);
    }

    setCurrentView('list');
    resetForm();
    setEditingBlog(null);
  };

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current.focus();
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter link URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setFormData({ ...formData, content: contentRef.current.innerHTML });
    }
  };

  const BlogEditor = () => (
    <div className="blog-editor">
      <div className="editor-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
        <div className="editor-actions">
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={() => setCurrentView('list')}
          >
            <X className="me-2" size={16} />
            Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSave}
          >
            <Save className="me-2" size={16} />
            Save Blog
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Blog Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter blog title"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">H1 Heading</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.h1}
                  onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
                  placeholder="Main H1 heading for SEO"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">H2 Subheading</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.h2}
                  onChange={(e) => setFormData({ ...formData, h2: e.target.value })}
                  placeholder="H2 subheading"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Introduction</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.introduction}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  placeholder="Brief introduction to the blog post"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Featured Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.featuredImage && (
                  <div className="mt-2">
                    <img 
                      src={formData.featuredImage} 
                      alt="Featured" 
                      className="img-thumbnail"
                      style={{maxWidth: '200px', maxHeight: '150px'}}
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Content</label>
                <div className="editor-toolbar mb-2">
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('bold')}>
                      <Bold size={14} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('italic')}>
                      <Italic size={14} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('underline')}>
                      <Underline size={14} />
                    </button>
                  </div>
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('insertUnorderedList')}>
                      <List size={14} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('insertOrderedList')}>
                      <List size={14} />
                    </button>
                  </div>
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={insertLink}>
                      <Link size={14} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={insertImage}>
                      <Image size={14} />
                    </button>
                  </div>
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('formatBlock', 'h1')}>
                      H1
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('formatBlock', 'h2')}>
                      H2
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('formatBlock', 'h3')}>
                      H3
                    </button>
                  </div>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('formatBlock', 'blockquote')}>
                    <Quote size={14} />
                  </button>
                </div>
                <div
                  ref={contentRef}
                  className="form-control"
                  contentEditable
                  style={{minHeight: '300px', padding: '12px'}}
                  onInput={handleContentChange}
                  dangerouslySetInnerHTML={{__html: formData.content}}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Excerpt</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the blog post"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Publishing Options</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">URL Slug</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="blog-url-slug"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">SEO Settings</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Meta Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="SEO title"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Meta Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="SEO description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogList = () => (
    <div className="blog-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">All Blogs</h2>
        <button 
          className="btn btn-primary"
          onClick={handleNewBlog}
        >
          <Plus className="me-2" size={16} />
          Add New Blog
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <div className="blog-image">
                        <img 
                          src={blog.featuredImage || 'https://via.placeholder.com/60x40'} 
                          alt={blog.title}
                          className="img-thumbnail"
                          style={{width: '60px', height: '40px', objectFit: 'cover'}}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="blog-info">
                        <h6 className="mb-1">{blog.title}</h6>
                        <p className="text-muted mb-0 small">{blog.excerpt}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${blog.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">{blog.createdAt}</small>
                    </td>
                    <td>
                      <div className="blog-tags">
                        {blog.tags?.map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark me-1 mb-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(blog)}
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="blog-dashboard">
      <style jsx>{`
        .blog-dashboard {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        
        .dashboard.heading {
          font-size: 13px;
          background: white;
          border-radius: 8px;
          padding: 15px 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .dashboard.heading p span {
          font-weight: 500;
          color: #dc3545;
        }
        
        .card {
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        
        .form-label {
          font-weight: 500;
          margin-bottom: 5px;
          color: #495057;
        }
        
        .form-control:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
        
        .btn-primary {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        
        .btn-primary:hover {
          background-color: #c82333;
          border-color: #bd2130;
        }
        
        .editor-toolbar {
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 8px;
          background-color: #f8f9fa;
        }
        
        .editor-toolbar .btn {
          padding: 4px 8px;
          margin-right: 2px;
        }
        
        .blog-image img {
          border-radius: 4px;
        }
        
        .blog-info h6 {
          color: #495057;
          font-size: 14px;
        }
        
        .blog-tags .badge {
          font-size: 11px;
        }
        
        .action-buttons .btn {
          padding: 4px 8px;
        }
        
        th {
          font-size: 13px;
          font-weight: 500;
          color: #495057;
        }
        
        td {
          font-size: 13px;
        }
        
        @media (max-width: 768px) {
          .blog-dashboard {
            padding: 10px;
          }
          
          .dashboard.heading {
            padding: 10px 15px;
          }
          
          .editor-header {
            flex-direction: column;
            gap: 10px;
          }
          
          .editor-actions {
            width: 100%;
          }
          
          .editor-toolbar {
            flex-wrap: wrap;
          }
          
          .table-responsive {
            font-size: 11px;
          }
          
          .blog-info h6 {
            font-size: 12px;
          }
          
          .blog-tags .badge {
            font-size: 10px;
          }
        }
        
        @media (max-width: 576px) {
          th, td {
            font-size: 11px;
          }
          
          .blog-info h6 {
            font-size: 11px;
          }
          
          .action-buttons .btn {
            padding: 2px 6px;
          }
        }
      `}</style>

      <div className="dashboard heading w-100 d-flex justify-content-between">
        <p className="mb-0 d-flex align-items-center">
          Dashboard <ChevronRight className="mx-2" size={16} />
          <span className="cursor-pointer">Blog Management</span>
        </p>
      </div>

      <div className="blog-content">
        {currentView === 'list' ? <BlogList /> : <BlogEditor />}
      </div>
    </div>
  );
};

export default Blog;