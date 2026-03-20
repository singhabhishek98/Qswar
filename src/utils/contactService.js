import api from './api.js';

export const contactService = {
  async sendMessage(data) {
    try {
      const response = await api.post('/api/contact', {
        name: data.name,
        email: data.email,
        contact: data.mobile,
        message: data.message
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },

  async getMessages() {
    try {
      const response = await api.get('/api/admin/submission');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
};