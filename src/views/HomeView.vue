<template>
  <main class="home-view">
    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" />

    <!-- Conteúdo Principal -->
    <div v-else class="home-content" :class="{ 'fade-in': !isLoading }">
      <HeroSection />
      <PostsSection />
      <ProjectsSection />
      <GallerySection />
    </div>
  </main>
</template>

<script>
import { useHomeStore } from "@/stores/homeStore";
import { useProjectStore } from "@/stores/projectStore";
import LoadingScreen from "@/components/LoadingScreen.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import ProjectsSection from "@/components/home/ProjectsSection.vue";
import PostsSection from "@/components/home/PostsSection.vue";
import GallerySection from "@/components/home/GallerySection.vue";
import apiService from '@/services/api';

export default {
  name: "HomeView",
  components: {
    LoadingScreen,
    HeroSection,
    ProjectsSection,
    PostsSection,
    GallerySection,
  },
  data() {
    return {
      isLoading: true
    };
  },
  async created() {
    // Fallback para garantir que o loading sempre termine
    setTimeout(() => {
      if (this.isLoading) {
        console.warn('Loading timeout - forçando remoção do loading');
        this.isLoading = false;
      }
    }, 3000);
    
    await this.loadAllHomeData();
  },
  methods: {
    async loadAllHomeData() {
      try {
        // Delay mínimo para mostrar o loading
        await this.delay(800);
        
        // Carregar dados em paralelo mas aguardar todos terminarem
        await Promise.allSettled([
          this.loadHomeData(),
          this.loadProjects(),
          this.loadGalleryPreview()
        ]);
        
        // Delay adicional para garantir que a animação seja vista
        await this.delay(400);
        
        // Remove loading após tudo carregar
        this.isLoading = false;
        
      } catch (error) {
        console.error('Erro geral ao carregar dados da home:', error);
        this.isLoading = false;
      }
    },
    
    async loadHomeData() {
      try {
        const homeStore = useHomeStore();
        await homeStore.fetchHomePageData();
      } catch (error) {
        console.warn('Erro ao carregar dados da home:', error);
      }
    },
    
    async loadProjects() {
      try {
        const projectStore = useProjectStore();
        await projectStore.fetchProjects();
      } catch (error) {
        console.warn('Erro ao carregar projetos:', error);
      }
    },
    
    async loadGalleryPreview() {
      try {
        await apiService.get("/galeria?per_page=9");
      } catch (error) {
        console.warn('Erro ao carregar preview da galeria:', error);
      }
    },
    
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style scoped lang="scss">
.home-view {
  position: relative;
  min-height: 100vh;
}

// Home Content Fade In
.home-content {
  opacity: 0;
  
  &.fade-in {
    opacity: 1;
    animation: fadeInUp 0.8s ease-out;
  }
}

// Animation
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>