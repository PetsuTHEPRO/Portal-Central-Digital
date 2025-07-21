<template>
  <section class="projects-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h2 class="section-title">Todos os Projetos</h2>
          <p class="section-subtitle">
            Explore nosso portfólio de trabalhos concluídos e veja o que podemos
            fazer por você.
          </p>
        </div>
      </div>

      <div v-if="loading" class="text-center">
        <p>Carregando projetos...</p>
      </div>

      <div v-else-if="error" class="text-center text-danger">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="allProjects.length > 0">
        <div class="row">
          <div
            v-for="project in paginatedProjects"
            :key="project.id"
            class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
          >
            <div class="project-card">
              <div class="card-image-placeholder">
                <i class="bi bi-image"></i>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ project.title }}</h5>
                <p class="card-text">
                  {{ project.content }}
                </p>
                <button
                  class="btn btn-outline-secondary mt-auto"
                  @click="showProjectDetails(project)"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav
          v-if="totalPages > 1"
          aria-label="Navegação de página"
          class="mt-5"
        >
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="prevPage"
                >Anterior</a
              >
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{
                page
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a class="page-link" href="#" @click.prevent="nextPage"
                >Próximo</a
              >
            </li>
          </ul>
        </nav>
      </div>

      <div v-else class="text-center no-projects-message">
        <p>Nenhum projeto encontrado no momento.</p>
      </div>

      <ProjectModal :project="selectedProject" @close="closeModal" />
    </div>
  </section>
</template>

<script>
import axios from "axios"; // 1. Importe o Axios
import ProjectModal from "@/components/ProjectModal.vue"; // 1. Importe o novo componente

export default {
  name: "ProjectsView",
  components: {
    ProjectModal
  },
  data() {
    return {
      // A lista agora começa vazia.
      allProjects: [],
      // Adicionamos estados para controle de UI
      loading: true,
      error: null,
      currentPage: 1,
      itemsPerPage: 6,
      selectedProject: null,
    };
  },
  computed: {
    // As propriedades computadas de paginação continuam funcionando perfeitamente!
    totalPages() {
      if (!this.allProjects) return 0;
      return Math.ceil(this.allProjects.length / this.itemsPerPage);
    },
    paginatedProjects() {
      if (!this.allProjects) return [];
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allProjects.slice(start, end);
    },
  },
  methods: {
    showProjectDetails(project) {
      this.selectedProject = project;
    },
    closeModal() {
      this.selectedProject = null;
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  created() {
    // CERTIFIQUE-SE QUE ESTA URL É EXATAMENTE A QUE FUNCIONA NO NAVEGADOR
    const url = "http://localhost:10003/wp-json/wp/v2/projetos";

    axios
      .get(url)
      .then((response) => {
        this.allProjects = response.data.map((project) => ({
          id: project.id,
          title: project.title.rendered,
          description: project.content.rendered,
          content: project.acf.resumo_projeto,
          integrantes: project.acf.integrantes || [],
          imagemDestaqueUrl: project.acf.imagem_de_destaque ? project.acf.imagem_de_destaque.url : null,
          galeria: project.acf.galeria_do_projeto || [],
          status: project.acf.status_do_projeto
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
        this.error =
          "Não foi possível carregar os projetos. Tente novamente mais tarde.";
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.projects-section {
  padding: 6rem 0;
  background-color: var(--color-surface);
}

.section-title {
  font-weight: 700;
  color: var(--color-primary-text);
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--color-secondary-text);
  font-size: 1.1rem;
}

.project-card {
  width: 100%;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
  }
}

.card-image-placeholder {
  height: 200px;
  background-color: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-secondary-text);
  border-bottom: 1px solid var(--color-border);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-text {
  color: var(--color-secondary-text);
  font-size: 0.95rem;
}

.learn-more {
  color: var(--color-primary-text);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }
}
</style>
