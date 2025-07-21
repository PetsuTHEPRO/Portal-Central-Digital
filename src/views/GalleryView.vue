<template>
  <main class="gallery-page">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h1 class="page-title">Confira os Registros das Nossas Oficinas!</h1>
          <p class="page-subtitle">
            Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit phasellus mollis sit aliquam sit nullam.
          </p>
        </div>
      </div>

      <div class="masonry-gallery">
        <div
          v-for="(item, index) in galleryItems"
          :key="index"
          class="gallery-item"
        >
          <div class="image-placeholder" :style="{ height: item.height }">
            <i class="bi bi-image"></i>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'GaleriaView',
  data() {
    return {
      // Lista de itens com alturas variadas para criar o efeito masonry
      galleryItems: [
        { height: '350px' }, { height: '450px' }, { height: '300px' },
        { height: '300px' }, { height: '250px' }, { height: '400px' },
        { height: '380px' }, { height: '320px' }, { height: '420px' },
        { height: '280px' }, { height: '360px' }, { height: '310px' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.gallery-page {
  padding: 6rem 0;
}

.page-title {
  font-weight: 700;
  color: var(--color-primary-text);
}

.page-subtitle {
  color: var(--color-secondary-text);
  font-size: 1.1rem;
}

/* A Mágica do Masonry com CSS Columns */
.masonry-gallery {
  column-count: 3; /* 3 colunas em telas grandes */
  column-gap: 1rem;
}

.gallery-item {
  /* Impede que um item se quebre entre duas colunas */
  break-inside: avoid;
  margin-bottom: 1rem;
  display: inline-block;
  width: 100%;
}

.image-placeholder {
  width: 100%;
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary-text);
  font-size: 2.5rem;
  border: 1px solid var(--color-border);
}

/* Deixando a galeria responsiva */
@media (max-width: 991.98px) {
  .masonry-gallery {
    column-count: 2; /* 2 colunas em tablets */
  }
}

@media (max-width: 767.98px) {
  .masonry-gallery {
    column-count: 1; /* 1 coluna em celulares */
  }
}
</style>