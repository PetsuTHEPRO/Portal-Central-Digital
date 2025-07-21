<template>
  <main class="home-view">
    <HeroSection />
    <ProjectsSection />
    <PostsSection />
    <GallerySection />
  </main>
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue';
import ProjectsSection from '@/components/home/ProjectsSection.vue';
import PostsSection from '@/components/post/PostsSection.vue';
import GallerySection from '@/components/home/GallerySection.vue';


export default {
  name: 'HomeView',
  components: {
    HeroSection,
    ProjectsSection,
    PostsSection,
    GallerySection
  }
}
</script>