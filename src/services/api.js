import axios from 'axios';

class ApiService {
  // O construtor agora lê as variáveis de ambiente para a configuração inicial.
  constructor(baseURL = import.meta.env.VITE_API_BASE_URL) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // INTERCEPTOR DE REQUISIÇÃO (REQUEST)
    this.api.interceptors.request.use(
      (config) => {
        // Pega as credenciais do .env e as adiciona a cada requisição
        const username = import.meta.env.VITE_API_USERNAME;
        const password = import.meta.env.VITE_API_PASSWORD;

        if (username && password) {
          config.auth = {
            username,
            password,
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // INTERCEPTOR DE RESPOSTA (RESPONSE)
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Método GET genérico.
   * @param {string} endpoint - O endpoint da API (ex: '/posts').
   * @param {object} config - Configurações extras do Axios (ex: { params: {...} }).
   * @returns {Promise<any>}
   */
  async get(endpoint, config = {}) {
    try {
      const response = await this.api.get(endpoint, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Método especializado para buscar arquivos/imagens como Blob.
   * O interceptor de autenticação será aplicado automaticamente.
   */
  async getBlob(endpoint) {
    try {
      const response = await this.api.get(endpoint, {
        responseType: 'blob',
      });
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
