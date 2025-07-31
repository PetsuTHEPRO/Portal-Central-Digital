<template>
  <section class="projects-section">
    <div class="section-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <div class="container">
      <div class="section-header text-center mb-5">
        <h2 class="section-title" data-aos="fade-up" data-aos-delay="100">
          Nossos <span class="title-accent">Projetos</span>
        </h2>
        <p class="section-subtitle" data-aos="fade-up" data-aos-delay="200">
          Descubra os projetos que estão moldando o futuro digital através de soluções 
          criativas e tecnologia de vanguarda.
        </p>
      </div>

      <div v-if="loading" class="loading-state text-center">
        <div class="loading-spinner"></div>
        <p>Carregando projetos incríveis...</p>
      </div>

      <div v-else-if="error" class="error-state text-center">
        <div class="error-icon">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <p>{{ error }}</p>
      </div>

      <div v-else-if="featuredProjects.length > 0" class="projects-grid">
        <div
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="project-card-wrapper"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <div class="project-card" @click="openProjectModal(project)">
            <div class="card-header">
              <div class="project-status">
                <div class="status-dot"></div>
                <span>{{ project.status || 'Ativo' }}</span>
              </div>
              <div class="card-number">{{ String(index + 1).padStart(2, '0') }}</div>
            </div>

            <div class="card-visual">
              <div v-if="!project.imagemDestaqueUrl" class="visual-placeholder">
                <div class="placeholder-content">
                  <i class="bi bi-layers"></i>
                  <div class="placeholder-shimmer"></div>
                </div>
              </div>
              <div v-else class="visual-image">
                <img :src="project.imagemDestaqueUrl" :alt="project.title" />
              </div>
            </div>

            <div class="card-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.resumo }}</p>
              
              <div class="card-footer">
                <div class="project-tech">
                  <div class="tech-tags">
                    <span class="tech-tag">Web</span>
                    <span class="tech-tag">Design</span>
                  </div>
                </div>
                <button class="project-btn" @click.stop="openProjectModal(project)" type="button">
                  <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            <div class="card-glow"></div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state text-center">
        <div class="empty-icon">
          <i class="bi bi-folder2-open"></i>
        </div>
        <h3>Em Breve</h3>
        <p>Novos projetos incríveis estão sendo desenvolvidos!</p>
      </div>

      <div class="section-actions text-center mt-5" data-aos="fade-up" data-aos-delay="400">
        <router-link to="/projetos" class="btn-view-all">
          <span>Ver Todos os Projetos</span>
          <i class="bi bi-arrow-right"></i>
          <div class="btn-particles">
            <span class="particle" v-for="i in 5" :key="i"></span>
          </div>
        </router-link>
      </div>
    </div>
    
    <!-- Modal de Detalhes do Projeto -->
    <ProjectModal 
      ref="projectModal"
      :project="selectedProject"
      @close="closeModal"
    />
  </section>
</template>

<script>
// 1. Importe o seu apiService
import apiService from '@/services/api'; // Ajuste o caminho se necessário
import ProjectModal from '@/components/ProjectModal.vue';

export default {
  name: "ProjectsSection",
  components: {
    // 2. Registre o componente para uso no template
    ProjectModal,
  },
  emits: ['view-details'],
  data() {
    return {
      featuredProjects: [],
      loading: true,
      error: null,
      selectedProject: null,
    };
  },
  async created() {
    // 3. Buscar os 3 últimos projetos
    try {
      // Buscar todos os projetos, ordenados por data de criação (mais recentes primeiro)
      const projectsResponse = await apiService.get('/projetos', {
        params: {
          per_page: 3, // Limitar a 3 projetos
          orderby: 'date', // Ordenar por data
          order: 'desc' // Ordem decrescente (mais recentes primeiro)
        }
      });

      // O mapeamento dos dados
      this.featuredProjects = projectsResponse.map(project => ({
        id: project.id,
        title: project.title.rendered,
        resumo: project.acf.resumo_projeto || project.excerpt.rendered,
        description: project.content.rendered,
        // A URL da imagem é passada para o AuthenticatedImage
        imagemDestaqueUrl: project.acf.imagem_de_destaque ? project.acf.imagem_de_destaque.url : null,
        status: project.acf.status_do_projeto || 'Ativo',
        integrantes: project.acf.integrantes || [],
        galeria: project.acf.galeria || []
      }));

    } catch (error) {
      // O erro já é logado pelo interceptor, aqui apenas atualizamos a UI
      this.error = "Não foi possível carregar os projetos.";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    openProjectModal(project) {
      this.selectedProject = project;
      // Aguarda o próximo tick para garantir que o projeto foi atualizado
      this.$nextTick(() => {
        if (this.$refs.projectModal) {
          this.$refs.projectModal.openModal();
        }
      });
    },
    closeModal() {
      this.selectedProject = null;
    }
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.projects-section {
  padding: 8rem 0;
  position: relative;
  background: rgb(21, 23, 42);
  overflow: hidden;
}

.section-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  
  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
    animation: float-shapes 8s ease-in-out infinite;
  }
  
  .shape-1 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(172, 0, 255, 0.3), transparent);
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  .shape-2 {
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(6, 68, 216, 0.3), transparent);
    top: 60%;
    right: 15%;
    animation-delay: -3s;
  }
  
  .shape-3 {
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(172, 0, 255, 0.2), transparent);
    bottom: 20%;
    left: 60%;
    animation-delay: -6s;
  }
}

.section-header {
  position: relative;
  z-index: 2;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(172, 0, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
  color: rgba(172, 0, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;
  
  i {
    font-size: 1.2rem;
  }
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  .title-accent {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

.loading-state {
  position: relative;
  z-index: 2;
  padding: 4rem 0;
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top: 3px solid #ac00ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }
}

.error-state, .empty-state {
  position: relative;
  z-index: 2;
  padding: 4rem 0;
  
  .error-icon, .empty-icon {
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #fff;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card-wrapper {
  position: relative;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(16px);
  
  &:hover {
    transform: translateY(-10px);
    border-color: rgba(172, 0, 255, 0.3);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 0 30px rgba(172, 0, 255, 0.1);
    
    .card-glow {
      opacity: 1;
    }
    
    .visual-image {
      img {
        transform: scale(1.1);
      }
    }
    
    .project-btn {
      transform: translateX(5px);
      background: linear-gradient(135deg, #ac00ff, #0644d8);
      color: white;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  position: relative;
  z-index: 2;
}

.project-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  
  .status-dot {
    width: 8px;
    height: 8px;
    background: #00ff88;
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
  }
}

.card-number {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-visual {
  margin: 1rem 1.5rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  height: 200px;
}

.visual-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  .placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
    i {
      font-size: 3rem;
      color: rgba(255, 255, 255, 0.2);
    }
  }
  
  .placeholder-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(172, 0, 255, 0.1), transparent);
    animation: shimmer 2s ease-in-out infinite;
  }
}

.visual-image {
  width: 100%;
  height: 100%;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
}

.card-content {
  padding: 0 1.5rem 1.5rem;
  position: relative;
  z-index: 2;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.project-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-tags {
  display: flex;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
}

.project-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  cursor: pointer;
  position: relative;
  z-index: 3;
  pointer-events: auto !important;
  
  i {
    font-size: 1rem;
  }
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, rgba(172, 0, 255, 0.3), rgba(6, 68, 216, 0.3));
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
  filter: blur(8px);
  pointer-events: none;
}

.section-actions {
  position: relative;
  z-index: 2;
  margin-top: 4rem;
}

.btn-view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(172, 0, 255, 0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  
  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, rgba(172, 0, 255, 0.2), rgba(6, 68, 216, 0.2));
    border-color: rgba(172, 0, 255, 0.5);
    box-shadow: 0 10px 30px rgba(172, 0, 255, 0.2);
    color: white;
    
    .btn-particles .particle {
      animation: particle-float 1s ease-out forwards;
    }
  }
}

.btn-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(172, 0, 255, 0.6);
    border-radius: 50%;
    opacity: 0;
    
    &:nth-child(1) { top: 20%; left: 20%; }
    &:nth-child(2) { top: 80%; left: 30%; }
    &:nth-child(3) { top: 40%; right: 25%; }
    &:nth-child(4) { bottom: 30%; right: 20%; }
    &:nth-child(5) { top: 60%; left: 60%; }
  }
}

// Animations
@keyframes float-shapes {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes particle-float {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

// Responsive
@media (max-width: 1199.98px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 767.98px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-card {
    margin: 0 1rem;
  }
  
  .floating-shapes {
    display: none;
  }
}
</style>
