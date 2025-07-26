<template>
  <section class="posts-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h2 class="section-title">Posts</h2>
        </div>
      </div>

      <div class="post-container">
        <div class="post-card">
          <span class="post-badge">Novidade</span>
          <h3 class="post-title">
            Ponte Digital Irá Fazer Oficinas no Sábado!
          </h3>
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

        <div class="post-image-background d-none d-lg-block">
          <i class="bi bi-image"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PostsSection",
  data() {
    return {
      postDate: new Intl.DateTimeFormat("pt-BR", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date("2025-08-18")),
    };
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.posts-section {
  padding: 2rem 0;
}

.section-title {
  font-weight: 700;
  color: var(--color-primary-text);
}

.post-container {
  /* O container agora é o nosso "palco" de posicionamento */
  position: relative;
  /* Garante que o container tenha uma altura mínima para os elementos absolutos */
  min-height: 350px;
  display: flex;
  align-items: center;
}

.post-card {
  background-color: var(--color-surface);
  padding: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2; /* Garante que o card fique na frente */

  /* Em telas grandes, o card ocupa metade do espaço */
  width: 50%;
}

.post-image-background {
  /* NÃO ESTÁ MAIS DENTRO DE UMA COLUNA. AGORA É POSICIONADO LIVREMENTE. */
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4rem;
  font-size: 4rem;
  color: var(--color-secondary-text);
  border: 1px solid var(--color-border);

  position: absolute;
  z-index: 1; /* Fica atrás do card */

  /* AUMENTADO: Para ficar maior e mais visível por trás do card */
  width: 65%;
  height: 110%; /* Pouco maior que o card para "sangrar" */

  /* Posicionamento exato */
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.post-badge {
  background-color: #0644d8;
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
  color: var(--color-primary-text);
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-secondary-text);
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
  .post-container {
    display: block; /* Volta ao layout de bloco normal */
  }
  .post-card {
    width: 100%; /* O card ocupa a largura toda */
    margin: 0; /* Reseta margens */
  }
  .post-image-background {
    display: none; /* A imagem de fundo é escondida */
  }
}
</style>
