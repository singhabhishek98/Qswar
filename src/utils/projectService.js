import api from './api.js';

export const projectService = {
  async getAllProjects() {
    try {
      const response = await api.get('/api/projects/allProjects');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch projects');
    }
  },

  async addProject(data) {
    try {
      const response = await api.post('/api/projects/addProject', {
        projectName: data.projectName,
        clientName: data.clientName,
        tech: data.tech,
        description: data.description
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add project');
    }
  }
};
