import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { leaveService } from '../utils/leaveService';

const STATUSES = ['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'DRAFT'];

const ManagerLeave = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState('ALL');

  useEffect(() => {
    fetchLeaves();
  }, [activeStatus]);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = activeStatus === 'ALL'
        ? await leaveService.getManagerRequests()
        : await leaveService.getManagerRequestsByStatus(activeStatus);
      setLeaves(Array.isArray(response) ? response : response.data || response.requests || []);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await leaveService.approveLeave(id, comment[id] || '');
      console.log('Approve response:', res);
      fetchLeaves();
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (id) => {
    if (!comment[id]) {
      alert('Please provide a comment for rejection');
      return;
    }
    try {
      const res = await leaveService.rejectLeave(id, comment[id]);
      console.log('Reject response:', res);
      fetchLeaves();
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Leave Requests</h1>
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
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {STATUSES.map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : leaves.length === 0 ? (
          <div className="text-center text-gray-500 bg-white p-8 rounded-lg">No requests found</div>
        ) : (
          <div className="grid gap-4">
            {leaves.map((leave) => (
              <div key={leave.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{leave.name || leave.userName || `User: ...${leave.userId?.slice(-6)}`}</h3>
                    <p className="text-gray-600">{leave.leaveType} Leave</p>
                    <p className="text-sm text-gray-500">
                      {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-gray-700">{leave.reason}</p>
                    <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{leave.status}</span>
                  </div>
                  {leave.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(leave.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(leave.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  )}
                </div>
                {leave.status === 'PENDING' && (
                  <div className="mt-4">
                    <textarea
                      placeholder="Add comment (required for rejection)..."
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      value={comment[leave.id] || ''}
                      onChange={(e) => setComment({...comment, [leave.id]: e.target.value})}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerLeave;
