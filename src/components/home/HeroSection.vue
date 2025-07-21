<template>
  <section class="hero-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <div class="image-main-placeholder">
            <i class="bi bi-image-fill"></i>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card-content">
            <h1 class="card-title">Ponte Digital</h1>
            <p class="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elidolor mattis sit phasellus mollis sit aliquam sit nullam neques.
            </p>
            <div class="d-flex align-items-center">
              <button class="btn btn-primary me-3">Conhecer Projetos <i class="bi bi-arrow-right"></i></button>
              <button class="btn btn-secondary">Ler Mais</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.hero-section {
  padding: 8rem 0;
}

.image-main-placeholder {
  width: 100%;
  height: 450px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: var(--color-secondary-text);
}

.card-content {
  background-color: var(--color-background);
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  transform: translateX(-15%);
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

// Responsividade para o card
@media (max-width: 991.98px) {
  .hero-section {
    padding: 4rem 0;
  }
  .card-content {
    transform: translateX(0);
    margin-top: 2rem;
  }
}
</style>