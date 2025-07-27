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
@use "sass:color";

.founders-section {
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
      circle at bottom left,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
}

.section-title {
  font-size: 2.5rem;
  color: #FFFFFF;
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  line-height: 1.6;
}

.btn-primary {
  background-color: #0644D8;
  border: none;
  color: white;
  padding: 0.85rem 1.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  
  &:hover {
    background-color: color.adjust(#0644D8, $lightness: -10%);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(6, 68, 216, 0.3);
  }
}

/* Grid para as fotos dos fundadores */
.founders-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  .founder-card:nth-of-type(2) {
    margin-top: 4rem;
  }
  .founder-card:nth-of-type(3) {
    margin-top: -4rem;
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.founder-card {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.image-placeholder {
  width: 100%;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  i {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 2;
    position: relative;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: rgba(172, 0, 255, 0.3);
    box-shadow: 0 8px 32px rgba(6, 68, 216, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
}

.founder-info {
  margin-top: 1.5rem;
}

.founder-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #FFFFFF;
  font-size: 1.1rem;
}

.founder-role {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin-bottom: 0;
}

/* Ajustes para telas menores */
@media (max-width: 991.98px) {
  .founders-section {
    padding: 6rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .founders-grid {
    grid-template-columns: 1fr;

    .founder-card:nth-of-type(2),
    .founder-card:nth-of-type(3) {
      margin-top: 0;
      grid-column: auto;
    }
  }

  .image-placeholder {
    height: 250px;
    font-size: 2.5rem;
  }
}
</style>
