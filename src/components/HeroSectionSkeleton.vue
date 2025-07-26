<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-container">
        <div class="image-main-placeholder skeleton-box"></div>
        <div class="card-content-skeleton">
          <div class="skeleton-box title-skeleton"></div>
          <div class="skeleton-box text-skeleton"></div>
          <div class="skeleton-box text-skeleton short"></div>
          <div class="skeleton-box button-skeleton"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
/* Estilos para alinhar o skeleton com o componente real */
.hero-section { padding: 8rem 0; overflow: hidden; }
.hero-container { position: relative; display: flex; align-items: center; min-height: 450px; }
.image-main-placeholder { width: 70%; height: 450px; }
.card-content-skeleton {
  position: absolute;
  z-index: 2;
  width: 50%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: var(--color-surface);
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
.title-skeleton { height: 2.5rem; margin-bottom: 1.5rem; width: 60%; }
.text-skeleton { height: 1rem; margin-bottom: 1rem; }
.text-skeleton.short { width: 80%; }
.button-skeleton { height: 3rem; width: 40%; margin-top: 1rem; }
</style>