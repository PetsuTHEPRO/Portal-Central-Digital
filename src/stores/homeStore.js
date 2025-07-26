import { defineStore } from 'pinia'
import axios from 'axios'

export const useHomeStore = defineStore('home', {
  // 1. Estado inicial: loading começa como 'true'
  state: () => ({
    pageData: null,
    loading: true,
    error: null,
  }),

  actions: {
    // 2. Action para buscar os dados
    async fetchHomePageData() {
      // Se já temos os dados (por causa da persistência), não fazemos nada
      if (this.pageData) {
        this.loading = false; // Apenas garantimos que o loading termine
        return;
      }

      this.loading = true; // Garante que o loading está ativo
      try {
        const config = { auth: { username: "terrace", password: "earsplitting" } };
        const response = await axios.get("https://opulent-journey.localsite.io/wp-json/wp/v2/home", config);
        this.pageData = response.data[0];
      } catch (err) {
        console.error("Não foi possível carregar os dados da página com Axios:", err);
        this.error = 'Falha ao carregar conteúdo.';
      } finally {
        this.loading = false;
      }
    }
  },

  // 3. Habilitamos a persistência para o F5 não precisar recarregar
  persist: true,
})
