<template>
  <div v-if="loading" class="skeleton-box" :style="{ width: '100%', height: '100%' }"></div>
  
  <img v-else-if="localSrc" :src="localSrc" :alt="alt" />
  
  <div v-else class="error-placeholder">
    <i class="bi bi-exclamation-triangle"></i>
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
  beforeUnmount() {
    // IMPORTANTE: Libera a memória usada pela blob URL quando o componente é destruído
    if (this.localSrc) {
      URL.revokeObjectURL(this.localSrc);
    }
  },
};
</script>

<style scoped>
/* Estilo para o placeholder em caso de erro */
.error-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #a0a0a0;
  font-size: 2rem;
}
</style>