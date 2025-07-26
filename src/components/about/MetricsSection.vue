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
        { value: '200+', title: 'Comunidades Alcançadas', description: 'Já impactamos dezenas de bairros e localidades por meio de ações educativas e tecnológicas.', isDark: true },
        { value: '99%', title: 'Satisfação dos Participantes', description: 'A maioria dos envolvidos reconhece o programa como transformador e essencial para sua formação digital.' },
        { value: '34+', title: 'Projetos Realizados', description: 'Desde oficinas até plataformas digitais, promovemos soluções reais para desafios sociais.' },
        { value: '100+', title: 'Voluntários Envolvidos', description: 'Alunos, professores e parceiros colaboram ativamente para levar conhecimento à comunidade.' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.metrics-section {
  padding: 6rem 0;
}

.icon-placeholder-lg {
  width: 60px;
  height: 60px;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: var(--color-primary-text);
  font-size: 1.5rem;
}

.section-title {
  font-weight: 700;
  color: var(--color-primary-text);
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--color-secondary-text);
  line-height: 1.7;
}

.metric-card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  border-radius: 0.5rem;
  height: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.05);
  }

  &.is-dark {
    background-color: #0644D8;
    color: #f8f9fa; /* Um branco suave */
    border-color: var(--button-primary-bg);

    .metric-value {
      color: var(--button-primary-text);
    }
    .metric-title {
       color: var(--button-primary-text);
    }
    .metric-description {
      color: #ced4da; /* Um cinza claro para o texto escuro */
    }
  }
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-title);
  margin-bottom: 0.5rem;
}

.metric-title {
  font-weight: 600;
  color: var(--color-title);
  margin-bottom: 0.75rem;
}

.metric-description {
  font-size: 0.9rem;
  color: var(--color-secondary-text);
  line-height: 1.5;
}

.background-metrics{
  background-color: var(--color-surface);
  padding: 6rem 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>