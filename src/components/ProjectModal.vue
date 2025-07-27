<template>
  <div
    class="modal fade"
    ref="projectModal"
    id="projectDetailModal"
    tabindex="-1"
    aria-labelledby="projectDetailModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content" v-if="project">
        <div class="modal-header">
          <h5 class="modal-title" id="projectDetailModalLabel">{{ project.title }}</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img
            v-if="project.imagemDestaqueUrl"
            :src="project.imagemDestaqueUrl"
            class="modal-featured-image"
            :alt="'Imagem para ' + project.title"
          />
          <div v-else class="modal-featured-image placeholder-bg">
            <i class="bi bi-image placeholder-icon"></i>
          </div>

          <div class="modal-main-content">
            <p><strong>Status:</strong> <span class="badge bg-primary ms-2">{{ project.status }}</span></p>
            <h6>Descrição</h6>
            <p v-html="project.description"></p>
            <hr class="my-4" />

            <h6 v-if="project.integrantes && project.integrantes.length > 0">Integrantes</h6>
            <IntegrantesSlider :memberIds="project.integrantes" />
              
            <hr class="my-4" />

            <h6 v-if="project.galeria && project.galeria.length > 0">Galeria</h6>
            <div class="row g-2">
              <div v-for="image in project.galeria" :key="image.id" class="col-lg-4 col-md-6">
                <img :src="image.url" class="img-fluid rounded" :alt="image.alt" />
              </div>
            </div>
          </div>
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
    this.modalInstance = new Modal(this.$refs.projectModal);

    // E avisar o componente pai quando o modal for fechado
    this.$refs.projectModal.addEventListener('hidden.bs.modal', () => {
      this.$emit('close');
    });
  },
  watch: {
    // Este watch continua controlando se o modal abre ou fecha
    project(newVal) {
      if (newVal) {
        this.modalInstance.show();
      } else {
        this.modalInstance.hide();
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
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

  .btn-close {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    filter: invert(1);

    &:hover {
      background: rgba(255, 0, 0, 0.2);
      border-color: rgba(255, 0, 0, 0.3);
      transform: scale(1.1);
    }
  }
}

.modal-title {
  font-weight: 600;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-body {
  padding: 2rem;
}

.modal-featured-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
}

.modal-main-content {
  padding: 0 1rem 1rem 1rem;

  h6 {
    color: #fff;
    font-weight: 600;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }

  .badge {
    background: linear-gradient(135deg, #ac00ff, #0644d8) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    font-weight: 500;
    padding: 0.5rem 1rem;
  }

  hr {
    border-color: rgba(255, 255, 255, 0.1);
    margin: 2rem 0;
  }

  .row .col-lg-4,
  .row .col-md-6 {
    img {
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        border-color: rgba(172, 0, 255, 0.3);
      }
    }
  }
}

.placeholder-bg {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
}

.placeholder-icon {
  font-size: 5rem;
  color: rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

// Dark overlay for better readability
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}
</style>