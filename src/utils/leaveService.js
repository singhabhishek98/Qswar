const API_URL = '';

const safeJson = async (response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('leaveToken')}`
});

export const leaveService = {
  // Auth
  login: async (email, password, role) => {
    const endpoint = role === 'ADMIN' ? 'admin' : role === 'MANAGER' ? 'manager' : 'user';
    const response = await fetch(`${API_URL}/api/auth/${endpoint}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return safeJson(response);
  },

  // User
  createLeave: async (data) => {
    const response = await fetch(`${API_URL}/api/user/requests`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return safeJson(response);
  },

  getUserLeaves: async () => {
    const response = await fetch(`${API_URL}/api/user/requests`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  updateLeave: async (id, data) => {
    const response = await fetch(`${API_URL}/api/user/requests/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return safeJson(response);
  },

  submitLeave: async (id) => {
    const response = await fetch(`${API_URL}/api/user/requests/${id}/submit`, {
      method: 'PUT',
      headers: getHeaders()
    });
    return safeJson(response);
  },

  deleteLeave: async (id) => {
    const response = await fetch(`${API_URL}/api/user/requests/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return safeJson(response);
  },

  // Manager
  getManagerRequests: async () => {
    const response = await fetch(`${API_URL}/api/manager/requests`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  getManagerRequestsByStatus: async (status) => {
    const response = await fetch(`${API_URL}/api/manager/requests/status/${status}`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  getManagerRequest: async (id) => {
    const response = await fetch(`${API_URL}/api/manager/requests/${id}`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  getManagerUserById: async (id) => {
    const response = await fetch(`${API_URL}/api/manager/users/${id}`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  approveLeave: async (id, comment) => {
    const response = await fetch(`${API_URL}/api/manager/requests/${id}/approve`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ comment })
    });
    return safeJson(response);
  },

  rejectLeave: async (id, comment) => {
    const response = await fetch(`${API_URL}/api/manager/requests/${id}/reject`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ comment })
    });
    return safeJson(response);
  },

  // Admin - Leaves
  getAllLeaves: async () => {
    const response = await fetch(`${API_URL}/api/admin/leaves`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  getLeavesByStatus: async (status) => {
    const response = await fetch(`${API_URL}/api/admin/leaves/status/${status}`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/api/admin/leaves/stats`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  // Admin - Users
  createUser: async (data) => {
    const response = await fetch(`${API_URL}/api/admin/create/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return safeJson(response);
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/api/admin/getAll/users`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  getUserById: async (id) => {
    const response = await fetch(`${API_URL}/api/admin/users/${id}`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  updateUser: async (id, data) => {
    const response = await fetch(`${API_URL}/api/admin/user/update/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return safeJson(response);
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/api/admin/user/delete/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return safeJson(response);
  },

  // Admin - Managers
  createManager: async (data) => {
    const response = await fetch(`${API_URL}/api/admin/create/managers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return safeJson(response);
  },

  getAllManagers: async () => {
    const response = await fetch(`${API_URL}/api/admin/getAll/managers`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  getManagerById: async (id) => {
    const response = await fetch(`${API_URL}/api/admin/managers/${id}`, {
      headers: getHeaders()
    });
    return safeJson(response);
  },

  updateManager: async (id, data) => {
    const response = await fetch(`${API_URL}/api/admin/managers/update/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return safeJson(response);
  },

  deleteManager: async (id) => {
    const response = await fetch(`${API_URL}/api/admin/managers/delete/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return safeJson(response);
  }
};
