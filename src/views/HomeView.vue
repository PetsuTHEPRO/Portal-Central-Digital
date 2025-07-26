<template>
  <main class="home-view">
    <HeroSection />
    <PostsSection />
    <ProjectsSection />
    <GallerySection />
  </main>
</template>

<script>
import { useHomeStore } from "@/stores/homeStore"; // Importa a NOVA store
import HeroSection from "@/components/home/HeroSection.vue";
import ProjectsSection from "@/components/home/ProjectsSection.vue";
import PostsSection from "@/components/home/PostsSection.vue";
import GallerySection from "@/components/home/GallerySection.vue";

export default {
  name: "HomeView",
  components: {
    HeroSection,
    ProjectsSection,
    PostsSection,
    GallerySection,
  },
  created() {
    // Ao criar a HomeView, disparamos a busca pelos dados da home.
    // Os componentes filhos irão reagir às mudanças de estado (loading, pageData)
    // que acontecerão dentro da store.
    useHomeStore().fetchHomePageData();
  },
};
</script>