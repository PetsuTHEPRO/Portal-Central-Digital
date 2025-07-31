<template>
  <div
    v-if="isOpen"
    class="custom-modal-overlay"
    @click="closeModal"
  >
    <div 
      class="custom-modal-content"
      @click.stop
    >
      <div class="modal-header">
        <h3 class="modal-title">{{ project?.title || 'Projeto' }}</h3>
        <button 
          type="button" 
          class="btn-close"
          @click="closeModal"
          aria-label="Close"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      
      <div class="modal-body" v-if="project">
        <div v-if="project.imagemDestaqueUrl" class="modal-image">
          <img 
            :src="project.imagemDestaqueUrl" 
            :alt="project.title"
            class="img-fluid"
          />
        </div>
        
        <div class="modal-content-section">
          <div class="project-status mb-3">
            <span class="status-badge">{{ project.status || 'Ativo' }}</span>
          </div>
          
          <h6>Descrição</h6>
          <div class="project-description" v-html="project.description"></div>
          
          <div v-if="project.integrantes && project.integrantes.length > 0" class="mt-4">
            <h6>Integrantes</h6>
            <div class="integrantes-list">
              <span 
                v-for="integrante in project.integrantes" 
                :key="integrante"
                class="integrante-badge"
              >
                {{ integrante }}
              </span>
            </div>
          </div>
          
          <div v-if="project.galeria && project.galeria.length > 0" class="mt-4">
            <h6>Galeria</h6>
            <div class="gallery-grid">
              <img 
                v-for="image in project.galeria" 
                :key="image.id" 
                :src="image.url" 
                :alt="image.alt"
                class="gallery-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomProjectModal",
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    project(newVal) {
      if (newVal) {
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
      }
    }
  },
  methods: {
    openModal() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.isOpen = false;
      document.body.style.overflow = '';
      this.$emit("close");
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style scoped lang="scss">
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

.custom-modal-content {
  background: rgb(21, 23, 42);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  max-width: 800px;
  max-height: 90vh;
  width: 100%;
  overflow: hidden;
  animation: slideIn 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
}

.modal-title {
  color: #fff;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.btn-close {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  
  i {
    font-size: 1rem;
  }
}

.modal-body {
  padding: 0;
  max-height: calc(90vh - 100px);
  overflow-y: auto;
}

.modal-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.modal-content-section {
  padding: 2rem;
}

.status-badge {
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.project-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.integrantes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.integrante-badge {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.gallery-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h6 {
  color: #fff;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Scrollbar customizada
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: rgba(172, 0, 255, 0.3);
  border-radius: 4px;
  
  &:hover {
    background: rgba(172, 0, 255, 0.5);
  }
}

// Responsive
@media (max-width: 767.98px) {
  .custom-modal-overlay {
    padding: 1rem;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-content-section {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.25rem;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}
</style>
