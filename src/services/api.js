import axios from 'axios';

class ApiService {
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
   * Método POST genérico.
   * @param {string} endpoint - O endpoint da API.
   * @param {object} data - Os dados a serem enviados.
   * @param {object} config - Configurações extras do Axios.
   * @returns {Promise<any>}
   */
  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await this.api.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Método PUT genérico.
   * @param {string} endpoint - O endpoint da API.
   * @param {object} data - Os dados a serem enviados.
   * @param {object} config - Configurações extras do Axios.
   * @returns {Promise<any>}
   */
  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.api.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Método DELETE genérico.
   * @param {string} endpoint - O endpoint da API.
   * @param {object} config - Configurações extras do Axios.
   * @returns {Promise<any>}
   */
  async delete(endpoint, config = {}) {
    try {
      const response = await this.api.delete(endpoint, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Método para obter conteúdo com paginação.
   * @param {string} endpoint - O endpoint da API.
   * @param {number} page - Número da página.
   * @param {number} pageSize - Tamanho da página.
   * @param {object} filters - Filtros adicionais.
   * @returns {Promise<any>}
   */
  async getPaginated(endpoint, page = 1, pageSize = 10, filters = {}) {
    try {
      const params = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        ...filters,
      };
      const response = await this.get(endpoint, { params });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Método para obter conteúdo com relacionamentos (populates).
   * @param {string} endpoint - O endpoint da API.
   * @param {Array<string>} populates - Array de campos para popular.
   * @returns {Promise<any>}
   */
  async getWithPopulate(endpoint, populates = []) {
    try {
      const params = {};
      populates.forEach((field) => {
        params[`populate[${field}]`] = true;
      });
      const response = await this.get(endpoint, { params });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Create instance with default config
const apiService = new ApiService();

export default apiService;
