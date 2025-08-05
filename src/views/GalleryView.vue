<template>
  <main class="gallery-page">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h1 class="page-title">Galeria de Mídia</h1>
          <p class="page-subtitle">
            Explore os momentos especiais capturados durante nossas oficinas e
            eventos.
          </p>
        </div>
      </div>

      <div v-if="loading" class="text-center mb-5">
        <div class="loading-spinner">
          <i class="bi bi-arrow-clockwise spin"></i>
          <p class="mt-3">Carregando galeria...</p>
        </div>
      </div>

      <div v-else-if="error" class="text-center mb-5">
        <div class="error-message">
          <i class="bi bi-exclamation-triangle"></i>
          <p class="mt-3 text-danger">{{ error }}</p>
        </div>
      </div>

      <div v-else-if="images.length > 0">
        <div class="masonry-gallery">
          <div
            v-for="image in images"
            :key="image.id"
            class="gallery-item"
            @click="openModal(image)"
          >
            <div class="image-card" :style="{ height: getRandomHeight() }">
              <img
                :src="image.url"
                :alt="image.alt || image.name"
                class="image"
              />
              <div class="image-overlay">
                <div class="image-info">
                  <h6>{{ image.caption || image.name }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav v-if="pagination && pagination.pageCount > 1" class="pagination-nav mt-5">
          <div class="pagination-container">
            <button class="pagination-btn" :disabled="pagination.page === 1" @click="changePage(pagination.page - 1)">Anterior</button>
            <div class="page-numbers">
              <button v-for="page in pagination.pageCount" :key="page" class="page-btn" :class="{ active: page === pagination.page }" @click="changePage(page)">{{ page }}</button>
            </div>
            <button class="pagination-btn" :disabled="pagination.page === pagination.pageCount" @click="changePage(pagination.page + 1)">Próximo</button>
          </div>
        </nav>
      </div>

      <div v-else class="text-center">
        </div>
    </div>

    <div v-if="selectedImage" class="image-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>
        <img :src="selectedImage.url" :alt="selectedImage.alt" />
        <div class="modal-info">
          <h5>{{ selectedImage.caption || selectedImage.name }}</h5>
          <p v-if="selectedImage.albumTitle">Álbum: {{ selectedImage.albumTitle }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
// Vamos criar e usar uma 'galleryStore' para os álbuns
import { useGalleryStore } from "@/stores/galeriaStore";

const galleryStore = useGalleryStore();
const { images, pagination, loading, error } = storeToRefs(galleryStore);
const { fetchImages } = galleryStore;

// Lógica do Modal
const selectedImage = ref(null);
const selectedAlbumTitle = ref("");

const openModal = (image, albumTitle) => {
  selectedImage.value = image;
  selectedAlbumTitle.value = albumTitle;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedImage.value = null;
  selectedAlbumTitle.value = "";
  document.body.style.overflow = "auto";
};

// Lógica da Paginação (se aplicável)
const changePage = (page) => {
  if (page < 1 || (pagination.value && page > pagination.value.pageCount))
  return;
window.scrollTo({ top: 0, behavior: "smooth" });
fetchImages(page);
};

onMounted(() => {
  fetchImages(1);
  console.log(images, "faz nem sentido")
});

// Funções de formatação e altura aleatória (mantidas)
const heights = ["250px", "300px", "350px", "400px", "450px"];
const getRandomHeight = () =>
  heights[Math.floor(Math.random() * heights.length)];
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
