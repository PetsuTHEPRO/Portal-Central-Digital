<template>
  <section class="gallery-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-4">
        <div class="col-lg-8">
          <h2 class="section-title">Acesse Nossos Registros</h2>
          <router-link to="/galeria" class="btn btn-primary mt-2"
            >Galeria</router-link
          >
        </div>
      </div>

      <!-- Estado de loading -->
      <div v-if="loading" class="text-center">
        <div class="loading-spinner">
          <i class="bi bi-arrow-clockwise spin"></i>
          <p class="mt-3">Carregando galeria...</p>
        </div>
      </div>

      <!-- Estado de erro -->
      <div v-else-if="error" class="text-center">
        <div class="error-message">
          <i class="bi bi-exclamation-triangle"></i>
          <p class="mt-3 text-muted">{{ error }}</p>
        </div>
      </div>

      <!-- Grid da galeria -->
      <div v-else class="grid-gallery">
        <div 
          v-for="(item, index) in limitedGalleryItems" 
          :key="item.id || index" 
          class="gallery-item"
          @click="openImageModal(item)"
        >
          <div class="image-content">
            <img 
              v-if="item.image?.url" 
              :src="item.image.url" 
              :alt="item.alt || item.title"
              class="gallery-image"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div v-else class="image-placeholder">
              <i class="bi bi-image"></i>
            </div>
            <div class="image-overlay">
              <div class="overlay-content">
                <i class="bi bi-eye"></i>
                <span>{{ item.title || 'Visualizar' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Placeholders para completar o grid se não houver imagens suficientes -->
        <div 
          v-for="i in Math.max(0, 9 - limitedGalleryItems.length)" 
          :key="'placeholder-' + i" 
          class="gallery-item"
        >
          <div class="image-placeholder">
            <i class="bi bi-image"></i>
          </div>
        </div>
      </div>

      <!-- Modal de visualização de imagem -->
      <div v-if="selectedImage" class="image-modal" @click="closeImageModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeImageModal">
            <i class="bi bi-x-lg"></i>
          </button>
          <img :src="selectedImage.image?.full || selectedImage.image?.large || selectedImage.image?.url" :alt="selectedImage.title" />
          <div class="modal-info">
            <h5>{{ selectedImage.title }}</h5>
            <p v-if="selectedImage.date">{{ formatDate(selectedImage.date) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import apiService from '@/services/api';

export default {
  name: "GallerySection",
  data() {
    return {
      galleryItems: [],
      loading: true,
      error: null,
      selectedImage: null,
    };
  },
  computed: {
    limitedGalleryItems() {
      // Retorna apenas os primeiros 9 itens
      return this.galleryItems.slice(0, 9);
    }
  },
  async created() {
    await this.loadGalleryItems();
  },
  methods: {
    async loadGalleryItems() {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.get("/galeria?_embed");
        const galleries = response || [];

        this.galleryItems = galleries.flatMap((gallery) => {
          if (!gallery.gallery_data || !Array.isArray(gallery.gallery_data)) {
            return [];
          }

          return gallery.gallery_data.map((image) => ({
            id: image.id,
            title: gallery.title.rendered,
            date: gallery.date,
            image: {
              url: image.url_full || image.url_large || image.url_medium, // Prioriza a melhor qualidade
              large: image.url_large,
              full: image.url_full,
            },
            alt: image.alt,
            caption: image.caption,
          }));
        });

      } catch (error) {
        this.error = "Erro ao carregar a galeria";
        console.error("Gallery loading error:", error);
      } finally {
        this.loading = false;
      }
    },
    openImageModal(item) {
      this.selectedImage = item;
      document.body.style.overflow = 'hidden';
    },
    closeImageModal() {
      this.selectedImage = null;
      document.body.style.overflow = '';
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    onImageLoad() {
      // Callback quando a imagem carrega
    },
    onImageError(event) {
      // Callback quando há erro no carregamento
      console.error('Erro ao carregar imagem:', event);
    }
  },
  beforeUnmount() {
    // Limpa o overflow quando o componente é destruído
    document.body.style.overflow = '';
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.gallery-section {
  padding-top: 4rem;
  padding-bottom: 8rem;
  background: rgb(21, 23, 42);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(120, 100, 255, 0.1),
      transparent 60%
    );
    pointer-events: none;
  }
}

.section-title {
  font-weight: 700;
  color: #fff;
  font-size: 2.5rem;
  text-shadow: 0 0 20px rgba(120, 100, 255, 0.3);
  position: relative;
  margin-bottom: 1.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg,
      rgba(120, 100, 255, 0.8),
      rgba(60, 180, 255, 0.8)
    );
    border-radius: 2px;
  }
}

.btn-primary {
  background: linear-gradient(135deg,
    rgba(153, 0, 255, 0.9),
    rgba(5, 72, 255, 0.9)
  );
  border: none;
  color: #fff;
  padding: 0.85rem 2.5rem;
  font-weight: 500;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
  box-shadow: 0 8px 25px rgba(120, 100, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(120, 100, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
}

/* --- A galeria com CSS Grid - Versão com 9 itens --- */
.grid-gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 150px;
  gap: 1.25rem;
  padding: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
      rgba(120, 100, 255, 0.05),
      rgba(60, 180, 255, 0.05)
    );
    border-radius: 1.5rem;
    z-index: -1;
  }
}

.gallery-item {
  cursor: pointer;
  
  .image-content {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 
        0 15px 30px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(120, 100, 255, 0.2);
      
      .image-overlay {
        opacity: 1;
      }
      
      .gallery-image {
        transform: scale(1.05);
      }
    }
  }
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-align: center;
    
    i {
      font-size: 1.5rem;
    }
    
    span {
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}

.gallery-item .image-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(30, 32, 55, 0.5);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  i {
    font-size: 2rem;
    background: linear-gradient(135deg, #fff, #a0a0ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(120, 100, 255, 0.2);
    border-color: rgba(120, 100, 255, 0.3);
    
    i {
      transform: scale(1.1);
    }
  }
}

// Estados de loading e erro
.loading-spinner, .error-message {
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem 0;
  
  i {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #7864ff, #3cb4ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin-top: 1rem;
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Modal de visualização de imagem
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  overflow: hidden;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
    display: block;
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
}

.modal-info {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(16px);
  
  h5 {
    color: #fff;
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: 0.9rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* --- Posicionamento Explícito dos Itens no Grid --- */

/* Primeiro item ocupa 2x2 no canto superior esquerdo */
.gallery-item:nth-of-type(1) {
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}

/* Último item (o 9º) ocupa 2x2 no canto inferior direito */
.gallery-item:nth-of-type(9) {
  grid-column: 4 / span 2; /* Começa na coluna 3, ocupa 2 */
  grid-row: 2 / span 2; /* Começa na linha 2, ocupa 2 */
}

/* Responsividade ajustada */
@keyframes shine {
  0% {
    transform: rotate(45deg) translateY(-100%);
  }
  50%, 100% {
    transform: rotate(45deg) translateY(100%);
  }
}

@media (max-width: 991.98px) {
  .grid-gallery {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    gap: 1rem;
  }

  .gallery-item:nth-of-type(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }

  .gallery-item:nth-of-type(9) {
    grid-column: 2 / span 2;
    grid-row: 3 / span 2;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 767.98px) {
  .grid-gallery {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 100px;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .gallery-item:nth-of-type(1),
  .gallery-item:nth-of-type(9) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .gallery-item .image-placeholder {
    &:hover {
      transform: translateY(-3px);
    }
  }
}
</style>
