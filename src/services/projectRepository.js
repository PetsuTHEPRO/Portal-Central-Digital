import apiService from './api';

class ProjectRepository {
  constructor() {
    this.endpoint = '/projects';
  }

  // Get all projects with pagination
  async getProjects(page = 1, pageSize = 10) {
    try {
      return await apiService.getPaginated(this.endpoint, page, pageSize);
    } catch (error) {
      throw error;
    }
  }

  // Get a single project by ID with all relations
  async getProjectById(id) {
    try {
      return await apiService.getWithPopulate(`${this.endpoint}/${id}`, [
        'thumbnail',
        'gallery',
        'category'
      ]);
    } catch (error) {
      throw error;
    }
  }

  // Get featured projects
  async getFeaturedProjects() {
    try {
      const filters = {
        'filters[featured][$eq]': true
      };
      return await apiService.getPaginated(this.endpoint, 1, 6, filters);
    } catch (error) {
      throw error;
    }
  }

  // Search projects
  async searchProjects(query) {
    try {
      const filters = {
        '_q': query
      };
      return await apiService.get(this.endpoint, filters);
    } catch (error) {
      throw error;
    }
  }
}

export const projectRepository = new ProjectRepository();
export default projectRepository;
