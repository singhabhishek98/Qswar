const API_BASE_URL = 'https://qswar-admin-api-s-production.up.railway.app';

const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return { data: await response.json() };
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  },
  
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return { data: await response.json() };
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  },
  
  async adminLogin(data) {
    return this.post('/api/admin/login', {
      Admin_userName: data.email,
      Admin_password: data.password
    });
  },
  
  async adminCreate(data) {
    return this.post('/api/admin/create', {
      Admin_userName: data.name || data.email,
      Admin_email: data.email,
      Admin_password: data.password
    });
  }
};

export default api;