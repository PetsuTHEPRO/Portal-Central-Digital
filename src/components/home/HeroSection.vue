<template>
  <section v-if="!homeStore.loading && homeStore.pageData" class="hero-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-9">
          <div
            class="image-main-placeholder"
            :style="{
              backgroundImage:
                'url(' +
                (homeStore.pageData.acf.capa_projeto
                  ? homeStore.pageData.acf.capa_projeto.url
                  : '') +
                ')',
            }"
          ></div>
        </div>

        <div class="col-lg-6">
          <div class="card-content">
            <h1 class="card-title">
              {{ homeStore.pageData.acf.projeto_titulo }}
            </h1>
            <p class="card-text">
              {{ homeStore.pageData.acf.projetos_subtitulo }}
            </p>
            <div class="d-flex align-items-center">
              <button class="btn btn-primary me-3">
                <router-link class="dropdown-item" to="/sobre-nos"
                  >Conhecer o Projeto<i class="bi bi-arrow-right ms-2"></i
                ></router-link>
              </button>
              <button class="btn btn-secondary">
                <router-link class="dropdown-item" to="/sobre-nos"
                  >Ler Mais</router-link
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <HeroSectionSkeleton v-else />
</template>

<script>
import { useHomeStore } from "@/stores/homeStore";
import HeroSectionSkeleton from "@/components/HeroSectionSkeleton.vue"; // Importa o skeleton

export default {
  name: "HeroSection",
  components: {
    HeroSectionSkeleton, // Registra o skeleton
  },
  setup() {
    // Usamos o setup() para ter acesso à store de forma mais limpa no Vue 3
    const homeStore = useHomeStore();

    // Exponha a store para o template
    return {
      homeStore,
    };
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.hero-section {
  padding: 8rem 0;
  // Adicionado para garantir que o overflow não cause problemas
  overflow: hidden;
}

// Vamos criar um seletor específico para a coluna do card para não afetar outros .col-lg-6
.row > .col-lg-6 {
  // --- MUDANÇA PRINCIPAL #1: PUXANDO A COLUNA PARA A ESQUERDA ---
  // Usamos uma margem negativa para puxar a coluna inteira do card
  // para a esquerda, fazendo-a sobrepor a coluna da imagem.
  margin-left: -28%;

  // --- MUDANÇA PRINCIPAL #2: GARANTINDO A SOBREPOSIÇÃO ---
  // z-index só funciona com 'position' definido. 'relative' não tira
  // o elemento do fluxo normal, mas permite usar z-index.
  position: relative;
  z-index: 2; // Um valor maior que o da imagem (que é 0 por padrão)
}

.image-main-placeholder {
  width: 100%;
  height: 450px;
  border-radius: 0.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-content {
  background-color: var(--color-surface);
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

  // O transform não é mais necessário aqui, pois movemos a coluna inteira
  // transform: translateX(-15%); // REMOVIDO
}

.card-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary-text);
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1.1rem;
  color: var(--color-secondary-text);
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Estilos dos botões (sem alterações) */
.btn-primary {
  background-color: var(--button-primary-bg);
  border-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--button-secondary-bg);
  border: 1px solid var(--button-secondary-border);
  color: var(--button-secondary-text);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-secondary:hover {
  background-color: #d8dde2;
}

// --- MUDANÇA PRINCIPAL #3: AJUSTE DE RESPONSIVIDADE ---
@media (max-width: 991.98px) {
  .hero-section {
    padding: 4rem 0;
  }

  // No mobile, as colunas ficam uma em cima da outra.
  // Precisamos resetar a margem negativa para evitar que o layout quebre.
  .row > .col-lg-6 {
    margin-left: 0;
  }

  .card-content {
    // Adicionamos uma margem no topo para separar o card da imagem
    margin-top: -50px; // Valor negativo para puxar um pouco para cima da imagem
    position: relative; // Garante que fique acima da imagem se houver sobreposição
    z-index: 2;
  }

  .image-main-placeholder {
    height: 350px;
  }
}
</style>
