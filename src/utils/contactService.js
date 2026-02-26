import api from './api.js';

export const contactService = {
  async sendMessage(data) {
    try {
      const response = await api.post('/messages', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },

  async getMessages() {
    try {
      const response = await api.get('/messages');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
};