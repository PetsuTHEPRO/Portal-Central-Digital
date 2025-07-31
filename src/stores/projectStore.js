import { defineStore } from 'pinia'
import axios from 'axios'

// Criamos nosso "armazém" de projetos
export const useProjectStore = defineStore('projects', {
  // O 'state' é onde os dados ficam guardados
  state: () => ({
    projects: [],
    loading: true,
    error: null,
  }),

  // 'actions' são os métodos que alteram o estado
  actions: {
    async fetchProjects() {
      // **A LÓGICA PRINCIPAL ESTÁ AQUI**
      // Se já temos projetos no nosso armazém, não fazemos nada.
      if (this.projects.length > 0) {
        this.loading = false;
        return;
      }

      this.loading = true;
      this.error = null;
      
      try {
        const url = "https://opulent-journey.localsite.io/wp-json/wp/v2/projetos";
        const config = {
          auth: {
            username: 'terrace',
            password: 'earsplitting'
          }
        };
        const response = await axios.get(url, config);

        // Mapeamos e guardamos os dados no 'state'
        this.projects = response.data.map((project) => ({
          id: project.id,
          title: project.title.rendered,
          description: project.content.rendered, // Descrição completa para o modal
          resumo: project.acf.resumo_projeto || project.excerpt.rendered, // Resumo para o card
          content: project.acf.resumo_projeto || project.excerpt.rendered, // Para compatibilidade
          integrantes: project.acf.integrantes_projeto || [],
          imagemDestaqueUrl: project.acf.imagem_de_destaque ? project.acf.imagem_de_destaque.url : null,
          galeria: project.acf.galeria_do_projeto || [],
          status: project.acf.status_do_projeto || 'Ativo'
        }));
      } catch (err) {
        this.error = "Não foi possível carregar os projetos.";
        console.error("Erro ao buscar projetos:", err);
      } finally {
        this.loading = false;
      }
    }
  }
})