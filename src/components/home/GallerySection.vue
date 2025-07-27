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
  padding-top: 4rem;
  padding-bottom: 8rem;
  background: rgb(21, 23, 42);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(120, 100, 255, 0.1),
      transparent 60%
    );
    pointer-events: none;
  }
}

.section-title {
  font-weight: 700;
  color: #fff;
  font-size: 2.5rem;
  text-shadow: 0 0 20px rgba(120, 100, 255, 0.3);
  position: relative;
  margin-bottom: 1.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg,
      rgba(120, 100, 255, 0.8),
      rgba(60, 180, 255, 0.8)
    );
    border-radius: 2px;
  }
}

.btn-primary {
  background: linear-gradient(135deg,
    rgba(153, 0, 255, 0.9),
    rgba(5, 72, 255, 0.9)
  );
  border: none;
  color: #fff;
  padding: 0.85rem 2.5rem;
  font-weight: 500;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
  box-shadow: 0 8px 25px rgba(120, 100, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(120, 100, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
}

/* --- A galeria com CSS Grid - Versão com 9 itens --- */
.grid-gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 150px;
  gap: 1.25rem;
  padding: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
      rgba(120, 100, 255, 0.05),
      rgba(60, 180, 255, 0.05)
    );
    border-radius: 1.5rem;
    z-index: -1;
  }
}

.gallery-item .image-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(30, 32, 55, 0.5);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  i {
    font-size: 2rem;
    background: linear-gradient(135deg, #fff, #a0a0ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(120, 100, 255, 0.2);
    border-color: rgba(120, 100, 255, 0.3);
    
    i {
      transform: scale(1.1);
    }
  }
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
@keyframes shine {
  0% {
    transform: rotate(45deg) translateY(-100%);
  }
  50%, 100% {
    transform: rotate(45deg) translateY(100%);
  }
}

@media (max-width: 991.98px) {
  .grid-gallery {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    gap: 1rem;
  }

  .gallery-item:nth-of-type(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }

  .gallery-item:nth-of-type(9) {
    grid-column: 2 / span 2;
    grid-row: 3 / span 2;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 767.98px) {
  .grid-gallery {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 100px;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .gallery-item:nth-of-type(1),
  .gallery-item:nth-of-type(9) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .gallery-item .image-placeholder {
    &:hover {
      transform: translateY(-3px);
    }
  }
}
</style>
