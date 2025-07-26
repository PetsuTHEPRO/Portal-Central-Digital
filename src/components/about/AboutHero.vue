<template>
  <section class="about-hero-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h1 class="section-title">Programa Ponte Digital</h1>
          <p class="section-subtitle">
            Através de projetos inovadores, buscamos transformar vidas ao integrar o conhecimento acadêmico com as demandas reais da sociedade.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="image-card">
            <img
              src="@/assets/about-image-destaque.svg"
              alt="Ponte Digital"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutHero'
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.about-hero-section {
  padding: 6rem 0;
}

.section-title {
  font-weight: 700;
  color: var(--color-title);
}

.section-subtitle {
  color: var(--color-title);
  font-size: 1.1rem;
}

.image-placeholder-large {
  width: 100%;
  height: 400px;
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary-text);
  font-size: 4rem;
  border: 1px solid var(--color-border);
}
</style>