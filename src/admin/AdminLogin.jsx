import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      if (isLogin) {
        // Login
        const response = await api.adminLogin({ email: formData.email, password: formData.password });
        const data = response.data;
        
        if (data) {
          const token = data.access_token || data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(data.user || { email: formData.email }));
          navigate('/admin/dashboard');
        } else {
          setError('Login failed');
        }
      } else {
        // Signup
        const response = await api.adminCreate({ email: formData.email, password: formData.password });
        const data = response.data;
        
        if (data) {
          setSuccess('Account created successfully! Logging in...');
          const token = data.access_token || data.token;
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data.user || { name: formData.name, email: formData.email }));
            setTimeout(() => navigate('/admin/dashboard'), 1000);
          } else {
            setIsLogin(true);
            setSuccess('Account created! Please login now.');
            setFormData({ name: '', email: '', password: '' });
          }
        } else {
          setError('Signup failed');
        }
      }
    } catch (err) {
      setError(err.message || (isLogin ? 'Login failed. Check your credentials.' : 'Signup failed. Try again.'));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Admin Login' : 'Admin Signup'}
        </h2>
        
        {error && <p className="text-red-400 mb-4 text-center text-sm">{error}</p>}
        {success && <p className="text-green-400 mb-4 text-center text-sm">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              required={!isLogin}
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;