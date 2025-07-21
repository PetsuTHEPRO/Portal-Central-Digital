<template>
  <section class="posts-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h2 class="section-title">Posts</h2>
        </div>
      </div>

      <div class="post-container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="post-card">
              <span class="post-badge">Novidade</span>
              <h3 class="post-title">Ponte Digital Irá Fazer Oficinas no Sábado!</h3>
              <div class="post-meta d-flex align-items-center">
                <div class="author-avatar">
                  <i class="bi bi-person"></i>
                </div>
                <div class="author-info">
                  <strong>Jeane</strong>
                  <span class="d-block">{{ postDate }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <div class="post-image-background">
              <i class="bi bi-image"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PostsSection',
  data() {
    return {
      postDate: new Intl.DateTimeFormat('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date('2025-08-18'))
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.posts-section {
  padding: 6rem 0;
  background-color: var(--color-background);
}

.section-title {
  font-weight: 700;
  color: var(--color-primary-text);
}

.post-container {
  position: relative;
}

.post-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2; // Fica na frente
}

.post-image-background {
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4rem;
  font-size: 4rem;
  color: var(--color-secondary-text);
  border: 1px solid var(--color-border);

  // Efeito de sobreposição
  position: absolute;
  width: 55%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1; // Fica atrás
}

.post-badge {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 2rem;
  display: inline-block;
  margin-bottom: 1rem;
}

.post-title {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.author-info {
  font-size: 0.9rem;
  line-height: 1.2;
  strong {
    color: var(--color-primary-text);
  }
  span {
    color: var(--color-secondary-text);
  }
}

// Ajustes para telas menores
@media (max-width: 991.98px) {
  .post-card {
    // Remove a sobreposição em telas menores
    transform: none;
  }
  .post-image-background {
    display: none; // Simplesmente esconde a imagem de fundo
  }
}
</style>