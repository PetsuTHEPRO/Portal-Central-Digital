<template>
  <section class="metrics-section">
    <div class="container">
      <div class="row align-items:center background-metrics">
        <div class="col-lg-5 pe-lg-5 mb-5 mb-lg-0">
          <div class="icon-placeholder-lg mb-3">
            <i class="bi bi-graph-up-arrow"></i>
          </div>
          <h2 class="section-title">Nossas Métricas</h2>
          <p class="section-subtitle">
            Através de ações concretas, o Programa Ponte Digital tem ampliado sua atuação a cada edição. Nossos resultados refletem o compromisso com a transformação social por meio da educação e tecnologia.
          </p>
        </div>

        <div class="col-lg-7">
          <div class="row">
            <div
              v-for="(metric, index) in metrics"
              :key="index"
              class="col-md-6 mb-4"
            >
              <div class="metric-card" :class="{ 'is-dark': metric.isDark }">
                <h3 class="metric-value">{{ metric.value }}</h3>
                <h6 class="metric-title">{{ metric.title }}</h6>
                <p class="metric-description">{{ metric.description }}</p>
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
  name: 'MetricsSection',
  data() {
    return {
      metrics: [
        { value: '+20', title: 'Comunidades Alcançadas', description: 'Já impactamos dezenas de escolas por meio de ações educativas e tecnológicas.', isDark: true },
        { value: '99%', title: 'Satisfação dos Participantes', description: 'A maioria dos envolvidos reconhece o programa como transformador e essencial para formação digital.' },
        { value: '+10', title: 'Projetos Realizados', description: 'Desde oficinas até plataformas digitais, promovemos soluções reais para desafios sociais.' },
        { value: '+50', title: 'Voluntários Envolvidos', description: 'Alunos, professores e parceiros colaboram ativamente para levar conhecimento.' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';
@use "sass:color";

.metrics-section {
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
      circle at center right,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
}

.icon-placeholder-lg {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  font-size: 2rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  i {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(172, 0, 255, 0.3);
    box-shadow: 0 8px 32px rgba(6, 68, 216, 0.2);
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  font-size: 1.1rem;
}

.metric-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  height: 100%;
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(172, 0, 255, 0.05),
      rgba(6, 68, 216, 0.05)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(172, 0, 255, 0.3);
    box-shadow: 0 12px 40px rgba(6, 68, 216, 0.25);
    
    &::before {
      opacity: 1;
    }
  }

  &.is-dark {
    background: linear-gradient(135deg, 
      rgba(172, 0, 255, 0.2), 
      rgba(6, 68, 216, 0.2)
    );
    border-color: rgba(172, 0, 255, 0.3);
    
    &::before {
      background: linear-gradient(
        135deg,
        rgba(172, 0, 255, 0.1),
        rgba(6, 68, 216, 0.1)
      );
      opacity: 1;
    }

    &:hover {
      border-color: rgba(172, 0, 255, 0.5);
      box-shadow: 0 12px 40px rgba(172, 0, 255, 0.3);
    }

    .metric-value {
      color: #FFFFFF;
      text-shadow: 0 0 10px rgba(172, 0, 255, 0.5);
    }
    
    .metric-title {
      color: #FFFFFF;
    }
    
    .metric-description {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.metric-value {
  font-size: 3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.metric-title {
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.metric-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 0;
}

.background-metrics {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4rem 2rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1)
    );
    border-radius: inherit;
    z-index: -1;
    opacity: 0.5;
  }
}

// Responsive
@media (max-width: 991.98px) {
  .metrics-section {
    padding: 6rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .background-metrics {
    padding: 3rem 1.5rem;
  }

  .metric-card {
    padding: 1.5rem;
  }

  .metric-value {
    font-size: 2.5rem;
  }
}
</style>