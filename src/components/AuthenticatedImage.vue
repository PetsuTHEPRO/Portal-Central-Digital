<template>
  <!-- O template (HTML) permanece exatamente o mesmo, com os estados de loading, imagem e erro -->
  <div v-if="loading" class="image-loading">
    <div class="skeleton-box">
      <div class="skeleton-shimmer"></div>
    </div>
  </div>
  
  <img 
    v-else-if="localSrc" 
    :src="localSrc" 
    :alt="alt" 
    class="authenticated-image"
    @load="onImageLoad"
  />
  
  <div v-else class="error-placeholder">
    <i class="bi bi-exclamation-triangle"></i>
    <span class="error-text">Erro ao carregar imagem</span>
  </div>
</template>

<script>
// 1. MUDANÇA: Importamos nosso apiService em vez do axios.
import apiService from '@/services/api'; // Ajuste o caminho se necessário

export default {
  name: 'AuthenticatedImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Imagem',
    },
  },
  data() {
    return {
      localSrc: null,
      loading: true,
    };
  },
  watch: {
    src: {
      immediate: true,
      async handler(newSrc) {
        if (!newSrc) {
          this.loading = false;
          return;
        }

        this.loading = true;
        this.localSrc = null;

        try {
          // 2. MUDANÇA: A lógica de autenticação foi removida daqui.
          // Usamos o método 'getBlob' do nosso serviço, que já é autenticado
          // pelo interceptor. A chamada fica muito mais limpa.
          const blob = await apiService.getBlob(newSrc);
          
          this.localSrc = URL.createObjectURL(blob);
        } catch (error) {
          // O erro já é logado no console pelo interceptor do apiService.
          console.error(`Erro ao buscar a imagem ${newSrc}:`, error);
        } finally {
          this.loading = false;
        }
      },
    },
  },
  methods: {
    onImageLoad() {
      // Lógica para quando a imagem carregar, se necessário.
    }
  },
  beforeUnmount() {
    // A lógica de limpeza da memória permanece a mesma e é muito importante.
    if (this.localSrc) {
      URL.revokeObjectURL(this.localSrc);
    }
  },
};
</script>

<style scoped lang="scss">
/* Os estilos permanecem exatamente os mesmos */
.image-loading {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.skeleton-box {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(172, 0, 255, 0.1),
    rgba(6, 68, 216, 0.1),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.authenticated-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.error-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2rem;
  gap: 0.5rem;
  backdrop-filter: blur(8px);

  i {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .error-text {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
  }
}
</style>