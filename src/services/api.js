import axios from 'axios';

class ApiService {
  constructor(baseURL = 'http://localhost:1337/api') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Generic GET method
  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Generic POST method
  async post(endpoint, data = {}) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Generic PUT method
  async put(endpoint, data = {}) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Generic DELETE method
  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Method to get content with pagination
  async getPaginated(endpoint, page = 1, pageSize = 10, filters = {}) {
    try {
      const params = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        ...filters,
      };
      const response = await this.get(endpoint, params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Method to get content with relations (populates)
  async getWithPopulate(endpoint, populates = []) {
    try {
      const params = {};
      populates.forEach((field) => {
        params[`populate[${field}]`] = true;
      });
      const response = await this.get(endpoint, params);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Create instance with default config
const apiService = new ApiService();

export default apiService;
