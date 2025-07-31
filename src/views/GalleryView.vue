<template>
  <main class="gallery-page">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h1 class="page-title">Confira os Registros das Nossas Oficinas!</h1>
          <p class="page-subtitle">
            Explore os momentos especiais capturados durante nossas oficinas e
            eventos. Cada imagem conta uma história de aprendizado e
            transformação.
          </p>
        </div>
      </div>

      <!-- Filtros por período -->
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8">
          <div class="filter-container">
            <button
              v-for="period in periods"
              :key="period.value"
              @click="selectedPeriod = period.value"
              :class="[
                'btn',
                'filter-btn',
                { active: selectedPeriod === period.value },
              ]"
            >
              {{ period.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center mb-5">
        <div class="loading-spinner">
          <i class="bi bi-arrow-clockwise spin"></i>
          <p class="mt-3">Carregando galeria...</p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center mb-5">
        <div class="error-message">
          <i class="bi bi-exclamation-triangle"></i>
          <p class="mt-3">{{ error }}</p>
        </div>
      </div>

      <!-- Gallery -->
      <div v-else class="masonry-gallery">
        <div
          v-for="(item, index) in filteredGalleryItems"
          :key="item.id || index"
          class="gallery-item"
          @click="openModal(item)"
        >
          <div class="image-card" :style="{ height: getRandomHeight() }">
            <AuthenticatedImage
              v-if="item.image"
              :src="item.image.url"
              class="image"
              :alt="item.title || 'Imagem da galeria'"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div v-else class="image-placeholder">
              <i class="bi bi-image"></i>
            </div>
            <div class="image-overlay">
              <div class="image-info">
                <h6>{{ item.title || "Sem título" }}</h6>
                <p>{{ formatDate(item.date) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="!loading && !error && filteredGalleryItems.length === 0"
        class="text-center"
      >
        <div class="empty-state">
          <i class="bi bi-images"></i>
          <h5 class="mt-3">Nenhuma imagem encontrada</h5>
          <p>Não há imagens disponíveis para o período selecionado.</p>
        </div>
      </div>
    </div>

    <!-- Modal para visualizar imagem -->
    <div v-if="selectedImage" class="image-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>
        <AuthenticatedImage :src="selectedImage.image?.url" :alt="selectedImage.title" />
        <div class="modal-info">
          <h5>{{ selectedImage.title }}</h5>
          <p>{{ formatDate(selectedImage.date) }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AuthenticatedImage from "@/components/AuthenticatedImage.vue";
import apiService from "@/services/api";

export default {
  name: "GalleryView",
  components: {
    AuthenticatedImage,
  },
  data() {
    return {
      galleryItems: [],
      loading: false,
      error: null,
      selectedPeriod: "all",
      selectedImage: null,
      periods: [
        { value: "all", label: "Todos os Períodos" },
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "recent", label: "Últimos 30 dias" },
      ],
      heights: [
        "250px",
        "300px",
        "350px",
        "400px",
        "450px",
        "280px",
        "320px",
        "380px",
      ],
    };
  },
  computed: {
    filteredGalleryItems() {
      if (this.selectedPeriod === "all") {
        return this.galleryItems;
      }

      if (this.selectedPeriod === "recent") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return this.galleryItems.filter(
          (item) => new Date(item.date) >= thirtyDaysAgo
        );
      }

      return this.galleryItems.filter(
        (item) =>
          new Date(item.date).getFullYear().toString() === this.selectedPeriod
      );
    },
  },
  async mounted() {
    await this.loadGalleryItems();
  },
  watch: {
    selectedPeriod() {
      // Trigger any additional filtering logic if needed
    },
  },
  methods: {
    async loadGalleryItems() {
      this.loading = true;
      this.error = null;

      try {
        // 1. FAZ A CHAMADA PARA O ENDPOINT CORRETO DO WORDPRESS
        // Substitua 'galeria' se o seu slug for diferente.
        // O parâmetro _embed pode ser útil para obter mais dados no futuro.
        const response = await apiService.get("/galeria?_embed");

        // --- PASSO DE DEBUG: INSPECIONE ISSO NO CONSOLE DO NAVEGADOR ---
        console.log("RESPOSTA COMPLETA DA API:", response);
        console.log(
          "DADOS DA RESPOSTA (response.data):",
          response[0].gallery_data
        );
        // --- FIM DO PASSO DE DEBUG ---

        // A CORREÇÃO FINAL ESTÁ AQUI:
        // Usamos 'response' diretamente, pois ele já é o array que precisamos.
        const galleries = response || [];

        this.galleryItems = galleries.flatMap((gallery) => {
          // Esta verificação continua sendo uma boa prática
          if (!gallery.gallery_data || !Array.isArray(gallery.gallery_data)) {
            return [];
          }

          return gallery.gallery_data.map((image) => ({
            id: image.id,
            title: gallery.title.rendered,
            date: gallery.date,
            image: {
              url: image.url_full,
              large: image.url_large,
              medium: image.url_medium,
            },
            alt: image.alt,
            caption: image.caption,
          }));
        });
      } catch (error) {
        this.error = "Erro ao carregar a galeria. Tente novamente mais tarde.";
        // Agora o console.error mostrará o erro original da API, se houver
        console.error("Gallery loading error:", error);
      } finally {
        this.loading = false;
      }
    },
    getRandomHeight() {
      return this.heights[Math.floor(Math.random() * this.heights.length)];
    },
    formatDate(dateString) {
      if (!dateString) return "Data não disponível";

      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    openModal(item) {
      this.selectedImage = item;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.selectedImage = null;
      document.body.style.overflow = "auto";
    },
    onImageLoad(event) {
      // Handle successful image load
      event.target.style.opacity = "1";
    },
    onImageError(event) {
      // Handle image load error - show placeholder
      event.target.style.display = "none";
      const placeholder = event.target.nextElementSibling;
      if (placeholder) {
        placeholder.style.display = "flex";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";
@use "sass:color";

.gallery-page {
  padding: 8rem 0;
  background: rgb(21, 23, 42);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(172, 0, 255, 0.3),
      rgba(6, 68, 216, 0.3),
      transparent
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top center,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
  line-height: 1.6;
}

// Filter buttons
.filter-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.3);
    color: #ffffff;
    transform: translateY(-2px);
  }

  &.active {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    border-color: transparent;
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(172, 0, 255, 0.3);
  }
}

// Loading and error states
.loading-spinner,
.error-message,
.empty-state {
  color: rgba(255, 255, 255, 0.8);

  i {
    font-size: 3rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p,
  h5 {
    color: rgba(255, 255, 255, 0.8);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Gallery styles
.masonry-gallery {
  column-count: 3;
  column-gap: 1.5rem;
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  display: inline-block;
  width: 100%;
  cursor: pointer;
}

.image-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(172, 0, 255, 0.3);
    box-shadow: 0 12px 40px rgba(6, 68, 216, 0.25);

    .image-overlay {
      opacity: 1;
    }
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.4);

  i {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1.5rem 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-info {
  color: #ffffff;

  h6 {
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
    margin: 0;
  }
}

// Modal styles
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  backdrop-filter: blur(16px);

  .image {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(172, 0, 255, 0.5);
  }
}

.modal-info {
  padding: 1.5rem;
  color: #ffffff;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  h5 {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    opacity: 0.8;
  }
}

// Responsive design
@media (max-width: 991.98px) {
  .gallery-page {
    padding: 6rem 0;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .masonry-gallery {
    column-count: 2;
    column-gap: 1rem;
  }

  .gallery-item {
    margin-bottom: 1rem;
  }
}

@media (max-width: 767.98px) {
  .page-title {
    font-size: 2rem;
  }

  .masonry-gallery {
    column-count: 1;
  }

  .filter-container {
    flex-direction: column;
    align-items: center;
  }

  .filter-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
