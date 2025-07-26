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

      <div v-if="projectStore.loading" class="d-flex justify-content-center">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="text-center text-danger">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="projectStore.projects.length > 0">
        <div class="row">
          <div
            v-for="project in paginatedProjects"
            :key="project.id"
            class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
          >
            <div class="project-card">
              <div
                v-if="!project.imagemDestaqueUrl"
                class="card-image-placeholder"
              >
                <i class="bi bi-image"></i>
              </div>
              <div v-else class="card-image">
                <AuthenticatedImage :src="project.imagemDestaqueUrl" :alt="project.title" />
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
// 1. REMOVA mapState dos imports
import { useProjectStore } from "@/stores/projectStore";
import ProjectModal from "@/components/ProjectModal.vue";
import AuthenticatedImage from "@/components/AuthenticatedImage.vue";

export default {
  name: "ProjectsView",
  components: { ProjectModal, AuthenticatedImage },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6,
      selectedProject: null,
    };
  },
  computed: {
    // 2. CRIE uma propriedade computada para a store inteira
    projectStore() {
      return useProjectStore();
    },

    // 3. ATUALIZE as outras propriedades para usar a 'projectStore'
    totalPages() {
      if (!this.projectStore.projects) return 0;
      return Math.ceil(this.projectStore.projects.length / this.itemsPerPage);
    },
    paginatedProjects() {
      if (!this.projectStore.projects) return [];
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.projectStore.projects.slice(start, end);
    },
  },
  methods: {
    // Seus métodos continuam iguais
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
    // A chamada no created continua igual, mas usando a propriedade computada
    this.projectStore.fetchProjects();
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.projects-section {
  padding: 6rem 0;
}

.section-title {
  font-weight: 700;
  color: var(--color-surface);
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--color-surface);
  font-size: 1.1rem;
}

.project-card {
  width: 100%;
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
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

/* --- CÓDIGO MODIFICADO E NOVO AQUI --- */

.card-image {
  /* MODIFICADO: Adicionamos uma altura fixa para consistência */
  height: 200px;
  border-bottom: 1px solid var(--color-border);
}

.card-image img {
  /* NOVO: Regras para a imagem se ajustar perfeitamente */
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-primary-text);
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

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid var(--color-surface); /* Cor de fundo do círculo */
  border-top-color: var(--color-primary-text); /* Cor da parte que gira */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
