<template>
  <div
    class="modal fade"
    ref="projectModal"
    id="projectDetailModal"
    tabindex="-1"
    aria-labelledby="projectDetailModalLabel"
    aria-describedby="projectDetailDescription"
    aria-hidden="true"
    role="dialog"
    aria-modal="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content" v-if="project">
        <div class="modal-header">
          <h5 class="modal-title" id="projectDetailModalLabel">
            <i class="bi bi-folder-fill me-2" aria-hidden="true"></i>
            {{ project.title || 'Nome do Projeto' }}
          </h5>
          <button 
            type="button" 
            class="btn-close" 
            @click="closeModal" 
            @keydown.enter="closeModal"
            @keydown.space.prevent="closeModal"
            aria-label="Fechar modal de detalhes do projeto"
            title="Fechar modal"
          >
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>
        <div class="modal-body" role="main">
          <div id="projectDetailDescription" class="sr-only">
            Modal com detalhes completos do projeto {{ project.title || 'sem nome' }}, incluindo descrição, integrantes e galeria de imagens.
          </div>

          <!-- Imagem de Destaque -->
          <section class="project-featured-image" aria-labelledby="featured-image-title">
            <h6 id="featured-image-title" class="sr-only">Imagem de destaque do projeto</h6>
            <img
              v-if="project.imagemDestaqueUrl"
              :src="project.imagemDestaqueUrl"
              :alt="`Imagem de destaque do projeto ${project.title || 'sem nome'}`"
              tabindex="0"
              @keydown.enter="announceImage"
              role="img"
            />
            <div v-else class="placeholder-image" role="img" :aria-label="`Nenhuma imagem de destaque disponível para o projeto ${project.title || 'sem nome'}`">
              <i class="bi bi-image" aria-hidden="true"></i>
            </div>
          </section>

          <!-- Descrição -->
          <section class="project-section" aria-labelledby="description-title">
            <h6 id="description-title" class="section-title">Descrição</h6>
            <div 
              class="section-content" 
              v-html="project.description || 'Lorem ipsum dolor sit amet consectetur adipiscing elit mollis lorem ipsum dolor sit amet consectetur adipiscing elit mollis et placerat mollis et aliquam et ipsum mollis at. Mollis lorem ipsum dolor sit amet consectetur adipiscing elit mollis et placerat mollis et aliquam et..'"
              role="region"
              aria-describedby="description-title"
              tabindex="0"
            ></div>
          </section>

          <!-- Integrantes -->
          <section class="project-section" aria-labelledby="members-title">
            <h6 id="members-title" class="section-title">Integrantes do Projeto</h6>
            <div v-if="project.integrantes && project.integrantes.length > 0">
              <p class="section-subtitle">Conheça os membros responsáveis pelo desenvolvimento deste projeto.</p>
              <div class="integrantes-grid" role="region" aria-labelledby="members-title">
                <IntegrantesSlider :memberIds="project.integrantes" />
              </div>
            </div>
            <div v-else class="empty-state" role="status" aria-live="polite">
              <i class="bi bi-people" aria-hidden="true"></i>
              <p>Nenhum integrante foi definido para este projeto.</p>
            </div>
          </section>

          <!-- Galeria -->
          <section class="project-section" aria-labelledby="gallery-title">
            <h6 id="gallery-title" class="section-title">Galeria do Projeto</h6>
            <div v-if="project.galeria && project.galeria.length > 0">
              <p class="section-subtitle">Veja as imagens e capturas de tela relacionadas ao projeto.</p>
              <div 
                class="gallery-grid" 
                role="grid" 
                aria-labelledby="gallery-title"
                :aria-rowcount="Math.ceil(project.galeria.length / 3)"
                aria-colcount="3"
              >
                <div 
                  v-for="(image, index) in project.galeria" 
                  :key="image.id || index" 
                  class="gallery-item"
                  role="gridcell"
                  :aria-rowindex="Math.floor(index / 3) + 1"
                  :aria-colindex="(index % 3) + 1"
                  tabindex="0"
                  @click="openImageViewer(image)"
                  @keydown.enter="openImageViewer(image)"
                  @keydown.space.prevent="openImageViewer(image)"
                  :aria-label="`Imagem ${index + 1} da galeria: ${image.alt || 'sem descrição'}`"
                >
                  <img 
                    :src="image.url" 
                    :alt="image.alt || `Imagem ${index + 1} da galeria do projeto`"
                    role="img"
                    aria-describedby="gallery-instructions"
                  />
                </div>
              </div>
              <div id="gallery-instructions" class="sr-only">
                Use Enter ou Espaço para abrir a imagem em tamanho maior. Use Tab para navegar entre as imagens.
              </div>
            </div>
            <div v-else class="empty-state" role="status" aria-live="polite">
              <i class="bi bi-images" aria-hidden="true"></i>
              <p>Nenhuma imagem foi adicionada à galeria deste projeto.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import IntegrantesSlider from '@/components/IntegrantesSlider.vue';

export default {
  name: "ProjectModal",
  components: {
    IntegrantesSlider
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      modalInstance: null,
    };
  },
  mounted() {
    // A única coisa necessária aqui é inicializar o modal do Bootstrap
    try {
      this.modalInstance = new Modal(this.$refs.projectModal);
    } catch (error) {
      console.error('Error creating modal instance:', error);
    }

    // E avisar o componente pai quando o modal for fechado
    this.$refs.projectModal.addEventListener('hidden.bs.modal', () => {
      this.$emit('close');
    });

    // Adicionar listeners para acessibilidade
    this.$refs.projectModal.addEventListener('shown.bs.modal', () => {
      this.handleModalOpen();
    });

    // Listener para tecla ESC
    document.addEventListener('keydown', this.handleEscKey);
  },
  beforeUnmount() {
    // Limpar listeners
    document.removeEventListener('keydown', this.handleEscKey);
  },
  methods: {
    openModal() {
      if (this.modalInstance && this.project) {
        this.modalInstance.show();
      }
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
      this.$emit("close");
    },
    openImageViewer(image) {
      // Funcionalidade para abrir visualizador de imagem (implementar se necessário)
      console.log('Abrir imagem:', image);
      // Anunciar para leitores de tela
      this.announceToScreenReader(`Abrindo imagem: ${image.alt || 'sem descrição'}`);
    },
    handleModalOpen() {
      // Focar no título quando o modal abrir
      this.$nextTick(() => {
        const title = this.$refs.projectModal.querySelector('#projectDetailModalLabel');
        if (title) {
          title.focus();
        }
      });
    },
    handleEscKey(event) {
      if (event.key === 'Escape' && this.modalInstance) {
        this.closeModal();
      }
    },
    announceImage() {
      const announcement = `Imagem de destaque do projeto ${this.project.title || 'sem nome'}`;
      this.announceToScreenReader(announcement);
    },
    announceToScreenReader(message) {
      // Criar um elemento temporário para anúncios
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      // Remover após um tempo
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  },
};
</script>

<style scoped lang="scss">
.modal-content {
  border-radius: 1rem;
  border: none;
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  color: #fff;
}

.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem 1rem 0 0;
  padding: 1.5rem 2rem;

  .modal-title {
    font-weight: 600;
    font-size: 1.25rem;
    color: #fff;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    i {
      color: #ac00ff;
      margin-right: 0.5rem;
    }
  }

  .btn-close {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    i {
      color: #fff;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    &:hover {
      background: rgba(255, 0, 0, 0.2);
      border-color: rgba(255, 0, 0, 0.3);
      transform: scale(1.1);

      i {
        color: #ff6b6b;
      }
    }
  }
}

.modal-body {
  padding: 2rem;
  background: transparent;
}

.project-featured-image {
  width: 100%;
  height: 250px;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);

    i {
      font-size: 3rem;
      background: linear-gradient(135deg, #ac00ff, #0644d8);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.project-section {
  margin-bottom: 2.5rem;

  .section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgba(172, 0, 255, 0.3);
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .section-content {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

.integrantes-grid {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  .gallery-item {
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      border-color: rgba(172, 0, 255, 0.3);
    }

    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      display: block;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.7);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
}

// Dark overlay for better readability
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

// Acessibilidade
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

// Focus indicators para acessibilidade
*:focus {
  outline: 2px solid #ac00ff !important;
  outline-offset: 2px !important;
  border-radius: 4px;
}

.gallery-item:focus,
.project-featured-image img:focus {
  outline: 3px solid #ac00ff !important;
  outline-offset: 4px !important;
  transform: scale(1.02);
  transition: all 0.3s ease;
}

.btn-close:focus {
  outline: 2px solid #fff !important;
  outline-offset: 2px !important;
  background: rgba(172, 0, 255, 0.3) !important;
}

// Melhor contraste para textos
.section-content {
  color: rgba(255, 255, 255, 0.95) !important;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.85) !important;
}

// Estados de hover/focus para galeria
.gallery-item {
  &:hover,
  &:focus {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 30px rgba(172, 0, 255, 0.3);
    border-color: rgba(172, 0, 255, 0.5);
  }
  
  &:focus-visible {
    outline: 3px solid #ac00ff;
    outline-offset: 4px;
  }
}

// Responsivo
@media (max-width: 768px) {
  .modal-body {
    padding: 1rem;
  }

  .project-featured-image {
    height: 200px;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;

    .gallery-item img {
      height: 120px;
    }
  }
  
  .integrantes-grid {
    padding: 1rem;
  }
}
</style>