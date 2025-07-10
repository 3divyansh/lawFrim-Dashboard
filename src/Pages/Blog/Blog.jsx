import React, { useState, useRef } from 'react';
import { ChevronRight, Image, Bold, Italic, Underline, List, Link, Quote, Eye, Edit, Trash2, Plus, Save, X, Upload } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with Physiotherapy",
      content: "Physiotherapy is a healthcare profession that helps people restore, maintain and maximize their strength, function, movement and overall well-being. It focuses on improving quality of life through hands-on care, patient education, and prescribed movement.",
      featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      status: "published",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Benefits of Regular Exercise",
      content: "Regular exercise is one of the most important things you can do for your health. It helps improve cardiovascular health, strengthens muscles and bones, and boosts mental well-being. Exercise also helps maintain a healthy weight and reduces the risk of chronic diseases.",
      featuredImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      status: "draft",
      createdAt: "2024-01-10"
    }
  ]);

  const [currentView, setCurrentView] = useState('list');
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploadedImages, setUploadedImages] = useState({});
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    featuredImage: '',
    status: 'draft'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      featuredImage: '',
      status: 'draft'
    });
  };

  const handleNewBlog = () => {
    resetForm();
    setEditingBlog(null);
    setCurrentView('editor');
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      featuredImage: blog.featuredImage || '',
      status: blog.status
    });
    setEditingBlog(blog);
    setCurrentView('editor');
  };

  const handleSave = () => {
    const blogData = {
      ...formData,
      id: editingBlog ? editingBlog.id : Date.now(),
      createdAt: editingBlog ? editingBlog.createdAt : new Date().toISOString().split('T')[0]
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        const imageId = Date.now().toString();
        
        // Store the uploaded image
        setUploadedImages(prev => ({
          ...prev,
          [imageId]: imageDataUrl
        }));
        
        // Set as featured image
        setFormData(prev => ({
          ...prev,
          featuredImage: imageDataUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
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

  const insertUploadedImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file');
          return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          alert('File size should be less than 5MB');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target.result;
          const imageId = Date.now().toString();
          
          setUploadedImages(prev => ({
            ...prev,
            [imageId]: imageDataUrl
          }));
          
          // Insert image into content
          formatText('insertImage', imageDataUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const insertLink = () => {
    const url = prompt('Enter link URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      // Save cursor position
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(contentRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      const caretOffset = preCaretRange.toString().length;
      
      // Update content
      setFormData({ ...formData, content: contentRef.current.innerHTML });
      
      // Restore cursor position
      setTimeout(() => {
        if (contentRef.current) {
          const textNodes = [];
          const walker = document.createTreeWalker(
            contentRef.current,
            NodeFilter.SHOW_TEXT,
            null,
            false
          );
          let node;
          while (node = walker.nextNode()) {
            textNodes.push(node);
          }
          
          let currentOffset = 0;
          for (let i = 0; i < textNodes.length; i++) {
            const textNode = textNodes[i];
            const textLength = textNode.textContent.length;
            if (currentOffset + textLength >= caretOffset) {
              const range = document.createRange();
              const selection = window.getSelection();
              range.setStart(textNode, caretOffset - currentOffset);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
              break;
            }
            currentOffset += textLength;
          }
        }
      }, 0);
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
                <label className="form-label">Featured Image</label>
                <div className="image-upload-section">
                  <div className="d-flex gap-2 mb-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleImageUploadClick}
                    >
                      <Upload className="me-2" size={14} />
                      Upload Image
                    </button>
                    <span className="text-muted small">or</span>
                    <input
                      type="url"
                      className="form-control form-control-sm"
                      value={formData.featuredImage.startsWith('data:') ? '' : formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  {formData.featuredImage && (
                    <div className="mt-2">
                      <img 
                        src={formData.featuredImage} 
                        alt="Featured" 
                        className="img-thumbnail"
                        style={{maxWidth: '200px', maxHeight: '150px'}}
                      />
                      <div className="mt-1">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => setFormData({ ...formData, featuredImage: '' })}
                        >
                          <X size={12} className="me-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Blog Content</label>
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
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={insertUploadedImage}>
                      <Upload size={14} />
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
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('formatBlock', 'p')}>
                      P
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => formatText('formatBlock', 'blockquote')}>
                      <Quote size={14} />
                    </button>
                  </div>
                </div>
                <div
                  ref={contentRef}
                  className="form-control"
                  contentEditable
                  style={{minHeight: '400px', padding: '12px'}}
                  onInput={handleContentChange}
                  suppressContentEditableWarning={true}
                  dangerouslySetInnerHTML={{__html: formData.content}}
                />
                <small className="text-muted">Write your blog content here. You can format text, add images from URL or upload files, and create paragraphs.</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
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
                  <th>Content Preview</th>
                  <th>Status</th>
                  <th>Date</th>
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
                        <h6 className="mb-0">{blog.title}</h6>
                      </div>
                    </td>
                    <td>
                      <div className="content-preview">
                        <p className="text-muted mb-0 small" style={{maxWidth: '200px'}}>
                          {blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                        </p>
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
        
        .content-preview {
          max-width: 200px;
        }
        
        .action-buttons .btn {
          padding: 4px 8px;
        }
        
        .image-upload-section {
          border: 1px dashed #dee2e6;
          border-radius: 4px;
          padding: 12px;
          background-color: #f8f9fa;
        }
        
        .image-upload-section:hover {
          border-color: #dc3545;
        }
        
        th {
          font-size: 13px;
          font-weight: 500;
          color: #495057;
        }
        
        td {
          font-size: 13px;
        }
        
        [contentEditable]:focus {
          outline: none;
          border-color: #dc3545;
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