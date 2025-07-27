<template>
  <section class="about-hero-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <div class="logo-container mb-4">
            <img
              src="@/assets/logo.svg"
              alt="Logo Ponte Digital"
              class="hero-logo"
            />
          </div>
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
              src="@/assets/logoPd.svg"
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
@use "sass:color";

.about-hero-section {
  padding: 8rem 0;
  position: relative;
  background: rgb(21, 23, 42);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(172, 0, 255, 0.3),
      rgba(6, 68, 216, 0.3),
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top left,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
}

.logo-container {
  .hero-logo {
    height: 256px;
    width: auto;
    filter: drop-shadow(0 0 20px rgba(172, 0, 255, 0.3));
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      filter: drop-shadow(0 5px 25px rgba(172, 0, 255, 0.5));
    }
  }
}

.section-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 2.2rem;
  padding: 0.5rem;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.25rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.image-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  margin-top: 3rem;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg,
      rgba(172, 0, 255, 0.3),
      rgba(6, 68, 216, 0.3)
    );
    border-radius: inherit;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
  }

  &:hover img {
    transform: scale(1.02);
  }
}

// Responsivo
@media (max-width: 991.98px) {
  .about-hero-section {
    padding: 6rem 0;
  }

  .logo-container .hero-logo {
    height: 80px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }
}
</style>