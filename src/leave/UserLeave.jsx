import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { leaveService } from '../utils/leaveService';

const UserLeave = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await leaveService.getUserLeaves();
      console.log('User leaves response:', response);
      setLeaves(Array.isArray(response) ? response : response.data || response.requests || []);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        const res = await leaveService.deleteLeave(id);
        console.log('Delete response:', res);
        fetchLeaves();
      } catch (error) {
        console.error('Error deleting leave:', error);
      }
    }
  };

  const handleSubmit = async (id) => {
    try {
      await leaveService.submitLeave(id);
      fetchLeaves();
    } catch (error) {
      console.error('Error submitting leave:', error);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'APPROVED') return 'bg-green-100 text-green-800';
    if (status === 'REJECTED') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">My Leave Requests</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/leave/create')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
              >
                <FaPlus /> New Request
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('leaveToken');
                  localStorage.removeItem('leaveUser');
                  navigate('/leave/login');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : leaves.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No leave requests found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leave.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>{leave.reason}</div>
                        {leave.feedback && (
                          <div className="text-xs text-blue-600 mt-1">Feedback: {leave.feedback}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          {leave.status === 'DRAFT' && (
                            <>
                              <button
                                onClick={() => navigate(`/leave/edit/${leave.id}`)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(leave.id)}
                                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                              >
                                <FaTrash /> Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLeave;
