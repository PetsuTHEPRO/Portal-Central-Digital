<template>
  <section class="projects-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h2 class="section-title">Nossos Projetos Recentes</h2>
          <p class="section-subtitle">
            Uma amostra dos trabalhos que nos orgulhamos de ter desenvolvido.
          </p>
        </div>
      </div>

      <div class="row">
        <div
          v-for="(project, index) in featuredProjects"
          :key="index"
          class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
        >
          <div class="project-card">
            <div class="card-image-placeholder">
              <i class="bi bi-image"></i>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet consectetoli tur adipiscing elit
                semper dalar.
              </p>
              <a href="#" class="learn-more">
                Ver Detalhes <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-center">
          <router-link to="/projetos" class="btn btn-primary"
            >Ver Todos os Projetos</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProjectsSection",
  data() {
    return {
      // Apenas os projetos em destaque para a home
      featuredProjects: [
        { title: "Web design" },
        { title: "Web development" },
        { title: "UX/UI design" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.projects-section {
  padding: 6rem 0;
  background-color: var(--color-surface);
}

.section-title {
  font-weight: 700;
  color: var(--color-primary-text);
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--color-secondary-text);
  font-size: 1.1rem;
}

.project-card {
  width: 100%;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
  }
}

.card-image-placeholder {
  height: 200px;
  background-color: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-secondary-text);
  border-bottom: 1px solid var(--color-border);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-text {
  color: var(--color-secondary-text);
  font-size: 0.95rem;
}

.learn-more {
  color: var(--color-primary-text);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }
}

.btn-primary {
  background-color: var(--button-primary-bg);
  border-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
}
</style>
