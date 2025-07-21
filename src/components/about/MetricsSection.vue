<template>
  <section class="metrics-section">
    <div class="container">
      <div class="row align-items:center">
        <div class="col-lg-5 pe-lg-5 mb-5 mb-lg-0">
          <div class="icon-placeholder-lg mb-3">
            <i class="bi bi-graph-up-arrow"></i>
          </div>
          <h2 class="section-title">Nossas Métricas</h2>
          <p class="section-subtitle">
            Lorem ipsum dolor sit amet consectetur adipiscing elit nunc sit velit eget sollicitudin sit posuere augue vestibulum eget turpis lobortis donec.
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
        { value: '200+', title: 'Comunidades Alcançadas', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit', isDark: true },
        { value: '99%', title: 'Satisfação dos Participantes', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit' },
        { value: '34+', title: 'Projetos Realizados', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit' },
        { value: '100+', title: 'Voluntários Envolvidos', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.metrics-section {
  padding: 6rem 0;
  background-color: var(--color-surface);
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
    background-color: var(--button-primary-bg);
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
  color: var(--color-primary-text);
  margin-bottom: 0.5rem;
}

.metric-title {
  font-weight: 600;
  color: var(--color-primary-text);
  margin-bottom: 0.75rem;
}

.metric-description {
  font-size: 0.9rem;
  color: var(--color-secondary-text);
  line-height: 1.5;
}
</style>