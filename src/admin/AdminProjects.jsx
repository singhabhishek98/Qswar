import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';

const AdminProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', tech: '', description: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataImg
      });

      if (response.ok) {
        const data = await response.json();
        const fullImageUrl = `http://localhost:3000${data.url}`;
        setFormData({...formData, image: fullImageUrl});
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login first');
      navigate('/admin/login');
      return;
    }

    try {
      const url = editId ? `http://localhost:3000/projects/${editId}` : 'http://localhost:3000/projects';
      const method = editId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        fetchProjects();
        setShowForm(false);
        setFormData({ title: '', tech: '', description: '', image: '' });
        setEditId(null);
        alert('Project saved successfully!');
      } else if (response.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
      } else {
        alert('Failed to save project');
      }
    } catch (err) {
      console.error('Failed to save project');
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setFormData({ title: project.title, tech: project.tech, description: project.description, image: project.image });
    setEditId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error('Failed to delete project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/admin/dashboard')} className="text-gray-600 hover:text-gray-900">
                ← Dashboard
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Manage Projects</h1>
            </div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => { setShowForm(!showForm); setEditId(null); setFormData({ title: '', tech: '', description: '', image: '' }); }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <FaPlus /> Add New Project
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h3 className="text-lg font-medium mb-4">{editId ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Technologies (e.g., React, Node.js)"
                value={formData.tech}
                onChange={(e) => setFormData({...formData, tech: e.target.value})}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <textarea
                placeholder="Project Description (Optional)"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-md"
                rows={3}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Project Image</label>
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 transition-colors">
                      <FaUpload className="text-gray-400" />
                      <span className="text-gray-600">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="h-32 w-auto rounded-md border" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" disabled={uploading}>
                  {editId ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-sm border p-6">
              {project.image && <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              {project.tech && <p className="text-sm text-purple-600 mb-2">{project.tech}</p>}
              {project.description && <p className="text-sm text-gray-600 mb-4">{project.description}</p>}
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(project._id)} className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
