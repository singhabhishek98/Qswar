import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { leaveService } from '../utils/leaveService';

const STATUSES = ['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'DRAFT'];

const AdminLeave = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, draft: 0 });
  const [leaves, setLeaves] = useState([]);
  const [managers, setManagers] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState('ALL');

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [activeStatus]);

  const fetchStats = async () => {
    try {
      const res = await leaveService.getStats();
      setStats(res);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const [res, allUsers, allManagers] = await Promise.all([
        activeStatus === 'ALL' ? leaveService.getAllLeaves() : leaveService.getLeavesByStatus(activeStatus),
        leaveService.getAllUsers(),
        leaveService.getAllManagers()
      ]);

      const leavesData = Array.isArray(res) ? res : res.data || res.leaves || [];
      setLeaves(leavesData);

      const usersArr = Array.isArray(allUsers) ? allUsers : allUsers.data || [];
      console.log('All users:', allUsers);
      const userMap = {};
      usersArr.forEach(u => { userMap[u.id] = u.name || u.email; });
      setUsers(userMap);

      const managersArr = Array.isArray(allManagers) ? allManagers : allManagers.data || [];
      console.log('All managers:', allManagers);
      const managerMap = {};
      managersArr.forEach(m => { managerMap[m.id] = m.name || m.email; });
      setManagers(managerMap);

    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'APPROVED') return 'bg-green-100 text-green-800';
    if (status === 'REJECTED') return 'bg-red-100 text-red-800';
    if (status === 'DRAFT') return 'bg-gray-100 text-gray-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Leave Management Dashboard</h1>
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
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div><p className="text-gray-500 text-sm">Total</p><p className="text-3xl font-bold">{stats.total}</p></div>
              <FaCalendar className="text-4xl text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div><p className="text-gray-500 text-sm">Pending</p><p className="text-3xl font-bold">{stats.pending}</p></div>
              <FaUsers className="text-4xl text-yellow-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div><p className="text-gray-500 text-sm">Approved</p><p className="text-3xl font-bold">{stats.approved}</p></div>
              <FaCheckCircle className="text-4xl text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div><p className="text-gray-500 text-sm">Rejected</p><p className="text-3xl font-bold">{stats.rejected}</p></div>
              <FaTimesCircle className="text-4xl text-red-500" />
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {STATUSES.map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeStatus === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Leaves Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">All Leave Requests</h2>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : leaves.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No leave requests found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td className="px-6 py-4 text-sm">{users[leave.userId] || `...${leave.userId?.slice(-6)}`}</td>
                      <td className="px-6 py-4">{leave.leaveType}</td>
                      <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">{managers[leave.managerId] || `...${leave.managerId?.slice(-6)}`}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{leave.reason}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
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

export default AdminLeave;
