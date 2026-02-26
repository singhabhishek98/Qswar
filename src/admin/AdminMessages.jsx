import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBell, FaArrowLeft, FaUser, FaEnvelope, FaClock, FaEye } from 'react-icons/fa';

const AdminMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        const unread = data.filter(msg => !msg.isRead).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:3000/messages/${messageId}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Failed to mark as read');
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
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
              <div className="flex items-center space-x-2">
                <FaBell className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{unreadCount} unread</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Contact Messages</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and respond to customer inquiries</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-6 text-center">
                <FaEnvelope className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">No messages yet.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`p-6 hover:bg-gray-50 transition-colors ${!msg.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <FaUser className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{msg.name}</h3>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FaEnvelope className="h-3 w-3" />
                            <span>{msg.email}</span>
                            <span>•</span>
                            <FaClock className="h-3 w-3" />
                            <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!msg.isRead && (
                        <button
                          onClick={() => markAsRead(msg._id)}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                        >
                          <FaEye className="h-3 w-3 mr-1" />
                          Mark as read
                        </button>
                      )}
                      {!msg.isRead && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;