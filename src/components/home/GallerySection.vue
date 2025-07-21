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

      <div class="grid-gallery">
        <div v-for="i in 9" :key="i" class="gallery-item">
          <div class="image-placeholder">
            <i class="bi bi-image"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "GallerySection",
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.gallery-section {
  padding: 6rem 0;
  background-color: var(--color-background);
}

.section-title {
  font-weight: 700;
  color: var(--color-primary-text);
}

.btn-primary {
  background-color: var(--button-primary-bg);
  border-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: 0.75rem 2rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
}

/* --- A galeria com CSS Grid - Versão com 9 itens --- */
.grid-gallery {
  display: grid;
  /* ATUALIZADO: Um grid de 4 colunas */
  grid-template-columns: repeat(5, 1fr);
  /* Define uma altura base para as linhas */
  grid-auto-rows: 150px;
  gap: 1rem;
}

.gallery-item .image-placeholder {
  width: 100%;
  height: 100%;
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary-text);
  font-size: 2rem;
  border: 1px solid var(--color-border);
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
@media (max-width: 991.98px) {
  .grid-gallery {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px; /* Reduz a altura em telas menores */
  }

  .gallery-item:nth-of-type(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }

  .gallery-item:nth-of-type(9) {
    grid-column: 2 / span 2;
    grid-row: 3 / span 2;
  }
}

@media (max-width: 767.98px) {
  .grid-gallery {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 100px;
    gap: 0.5rem;
  }

  .gallery-item:nth-of-type(1),
  .gallery-item:nth-of-type(9) {
    grid-column: span 1;
    grid-row: span 1;
  }
}
</style>
