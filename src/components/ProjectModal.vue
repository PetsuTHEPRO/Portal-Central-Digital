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
/* Nenhum estilo precisa ser alterado, todos continuam os mesmos */
.modal-content {
  border-radius: 0.5rem;
  border: none;
}
.modal-header {
  border-bottom: 1px solid var(--color-border);
}
.modal-title {
  font-weight: 600;
}
.modal-featured-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}
.modal-main-content {
  padding: 0 1rem 1rem 1rem;
}
.placeholder-bg {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.placeholder-icon {
  font-size: 5rem;
  color: var(--color-secondary-text);
}
</style>