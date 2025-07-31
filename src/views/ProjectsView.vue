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

      <div v-if="projectStore.loading" class="text-center">
        <div class="loading-spinner">
          <i class="bi bi-arrow-clockwise spin"></i>
          <p class="mt-3">Carregando projetos...</p>
        </div>
      </div>

      <div v-else-if="projectStore.error" class="text-center">
        <div class="error-message">
          <i class="bi bi-exclamation-triangle"></i>
          <p class="mt-3 text-danger">{{ projectStore.error }}</p>
        </div>
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
                  {{ project.resumo || project.content }}
                </p>
                <!-- Teste com div clicável -->
                <div
                  class="btn btn-primary mt-auto clickable-btn"
                  @click.stop="showProjectDetails(project)"
                  role="button"
                  tabindex="0"
                  @keydown.enter="showProjectDetails(project)"
                  @keydown.space="showProjectDetails(project)"
                >
                  Ver Detalhes <i class="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          v-if="totalPages > 1"
          aria-label="Navegação de página"
          class="mt-5"
        >
          <div class="pagination-container">
            <button 
              class="pagination-btn"
              :class="{ disabled: currentPage === 1 }"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              <i class="bi bi-chevron-left"></i>
              Anterior
            </button>
            
            <div class="page-numbers">
              <button
                v-for="page in totalPages"
                :key="page"
                class="page-btn"
                :class="{ active: page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="pagination-btn"
              :class="{ disabled: currentPage === totalPages }"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              Próximo
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </nav>
      </div>

      <div v-else class="text-center">
        <div class="empty-state">
          <i class="bi bi-folder2-open"></i>
          <h5 class="mt-3">Nenhum projeto encontrado</h5>
          <p>Não há projetos disponíveis no momento.</p>
        </div>
      </div>

      <ProjectModal ref="projectModal" :project="selectedProject" @close="closeModal" />
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
      console.log('Button clicked! Project:', project.title); // Debug temporário
      this.selectedProject = project;
      // Aguarda o próximo tick para garantir que o projeto foi atualizado
      this.$nextTick(() => {
        if (this.$refs.projectModal) {
          this.$refs.projectModal.openModal();
        } else {
          console.error('Modal ref not found');
        }
      });
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
@use "sass:color";

.projects-section {
  padding: 8rem 0;
  background: rgb(21, 23, 42);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(172, 0, 255, 0.3),
      rgba(6, 68, 216, 0.3),
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at bottom center,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
  line-height: 1.6;
}

// Loading and error states
.loading-spinner, .error-message, .empty-state {
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem 0;
  
  i {
    font-size: 3rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p, h5 {
    color: rgba(255, 255, 255, 0.8);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.project-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(172, 0, 255, 0.05),
      rgba(6, 68, 216, 0.05)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none; // Importante para não bloquear cliques
    z-index: 0;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(172, 0, 255, 0.3);
    box-shadow: 0 12px 40px rgba(6, 68, 216, 0.25);
    
    &::before {
      opacity: 1;
    }
  }
}

.card-image-placeholder {
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  i {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.card-image {
  height: 200px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
}

.project-card:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 200px);
  position: relative;
  z-index: 2;
}

.card-title {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #FFFFFF;
  font-size: 1.25rem;
}

.card-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #0644D8, #ac00ff);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  margin-top: auto;
  position: relative;
  z-index: 3;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(6, 68, 216, 0.4);
    background: linear-gradient(135deg, color.adjust(#0644D8, $lightness: -10%), color.adjust(#ac00ff, $lightness: -10%));
  }
  
  &:focus {
    outline: 2px solid rgba(172, 0, 255, 0.5);
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  i {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover i {
    transform: translateX(3px);
  }
}

.clickable-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 44px; // Área mínima para toque
  pointer-events: auto !important;
}

// Pagination styles
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.pagination-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.3);
    color: #FFFFFF;
    transform: translateY(-2px);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.3);
    color: #FFFFFF;
  }

  &.active {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    border-color: transparent;
    color: #FFFFFF;
    box-shadow: 0 4px 16px rgba(172, 0, 255, 0.3);
  }
}

// Responsive design
@media (max-width: 991.98px) {
  .projects-section {
    padding: 6rem 0;
  }

  .section-title {
    font-size: 2.5rem;
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }

  .page-numbers {
    order: -1;
  }
}

@media (max-width: 767.98px) {
  .section-title {
    font-size: 2rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .pagination-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
