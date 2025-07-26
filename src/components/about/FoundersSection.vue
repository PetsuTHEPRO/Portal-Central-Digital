<template>
  <section class="founders-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 mb-5 mb-lg-0">
          <h2 class="section-title">
            Conheça os Idealizadores do Programa Ponte Digital
          </h2>
          <p class="section-subtitle my-4">
            Conheça os idealizadores por trás do Programa Ponte Digital,
            responsáveis por transformar ideias em ações que conectam tecnologia
            e comunidade.
          </p>
          <!-- <router-link to="/contato" class="btn btn-primary"
            >Ler Mais <i class="bi bi-arrow-right"></i
          ></router-link> -->
        </div>

        <div class="col-lg-7">
          <div class="founders-grid mt-5">
            <div
              v-for="founder in founders"
              :key="founder.name"
              class="founder-card"
            >
              <div class="image-placeholder">
                <i class="bi bi-image"></i>
              </div>
              <div class="founder-info text-center mt-3">
                <h6 class="founder-name">{{ founder.name }}</h6>
                <p class="founder-role">{{ founder.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FoundersSection",
  data() {
    return {
      founders: [
        { name: "Prof. Jeane", role: "CEO & Founder" },
        { name: "Anderson Costa", role: "VP of Finance" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.founders-section {
  padding: 6rem 0;
  /* O gradiente é aplicado como uma imagem de fundo */
  background-image: linear-gradient(
    to bottom,
    rgba(35, 58, 86, 0) 0%,
    #233a56 10%,
    #233a56 20%,
    #233a56 80%,
    #233a56 95%,
    rgba(35, 58, 86, 0) 100%
  );
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-primary-text);
  font-weight: 700;
  line-height: 1.2;
}

.section-subtitle {
  color: var(--color-secondary-text);
  font-size: 1.1rem;
}

.btn-primary {
  background-color: var(--button-primary-bg);
  border-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}

/* Grid para as fotos dos fundadores */
.founders-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Duas colunas */
  gap: 2rem;

  /* Posicionamento criativo dos itens */
  .founder-card:nth-of-type(2) {
    margin-top: 4rem; /* Empurra o segundo card para baixo */
  }
  .founder-card:nth-of-type(3) {
    margin-top: -4rem; /* Puxa o terceiro card para cima */
    grid-column: 1 / span 2; /* Faz o terceiro card ocupar as duas colunas */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.image-placeholder {
  width: 100%;
  height: 300px;
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-secondary-text);
  border: 1px solid var(--color-border);
}

.founder-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.founder-role {
  color: var(--color-secondary-text);
  font-size: 0.9rem;
}

/* Ajustes para telas menores */
@media (max-width: 991.98px) {
  .founders-grid {
    grid-template-columns: 1fr; /* Uma coluna em telas menores */

    /* Reseta os posicionamentos criativos */
    .founder-card:nth-of-type(2),
    .founder-card:nth-of-type(3) {
      margin-top: 0;
      grid-column: auto;
    }
  }
}
</style>
