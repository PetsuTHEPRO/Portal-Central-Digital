<template>
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
import axios from 'axios';

export default {
  name: 'AuthenticatedImage',
  props: {
    // A URL original e protegida da imagem
    src: {
      type: String,
      required: true,
    },
    // O texto alternativo para a imagem
    alt: {
      type: String,
      default: 'Imagem',
    },
  },
  data() {
    return {
      localSrc: null, // Armazenará a URL local da imagem (blob URL)
      loading: true,
    };
  },
  watch: {
    // Usamos um 'watch' para que a imagem seja recarregada se a URL mudar
    src: {
      immediate: true, // Executa o handler assim que o componente é criado
      async handler(newSrc) {
        if (!newSrc) {
          this.loading = false;
          return;
        }

        this.loading = true;
        this.localSrc = null;

        const config = {
          auth: {
            username: 'terrace',
            password: 'earsplitting',
          },
          // ESSENCIAL: Diz ao axios para tratar a resposta como dados binários
          responseType: 'blob',
        };

        try {
          const response = await axios.get(newSrc, config);
          const blob = response.data;
          
          // Cria uma URL temporária no navegador para o dado binário da imagem
          this.localSrc = URL.createObjectURL(blob);
        } catch (error) {
          console.error('Erro ao buscar imagem autenticada:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  },
  methods: {
    onImageLoad() {
      // Image loaded successfully
    }
  },
  beforeUnmount() {
    // IMPORTANTE: Libera a memória usada pela blob URL quando o componente é destruído
    if (this.localSrc) {
      URL.revokeObjectURL(this.localSrc);
    }
  },
};
</script>

<style scoped lang="scss">
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