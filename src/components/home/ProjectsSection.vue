<template>
  <section class="projects-section">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h2 class="section-title">Projetos</h2>
          <p class="section-subtitle">
            Uma amostra dos trabalhos que nos orgulhamos de ter desenvolvido.
          </p>
        </div>
      </div>

      <div v-if="loading" class="text-center">Carregando projetos...</div>
      <div v-else-if="error" class="text-center text-danger">{{ error }}</div>

      <div v-else-if="featuredProjects.length > 0" class="row">
        <div
          v-for="project in featuredProjects"
          :key="project.id"
          class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
        >
          <div class="project-card">
            <div v-if="!project.imagemDestaqueUrl" class="card-image-placeholder">
              <i class="bi bi-image"></i>
            </div>
            <div v-else class="card-image">
              <img :src="project.imagemDestaqueUrl" :alt="project.title" />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">{{ project.resumo }}</p>
              <button
                class="btn btn-primary mt-auto"
                @click="$emit('view-details', project)"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center">
        <p>Nenhum projeto recente para mostrar.</p>
      </div>

    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProjectsSection",
  emits: ['view-details'],
  data() {
    return {
      featuredProjects: [],
      loading: true,
      error: null,
    };
  },
  // Usamos async no created para poder usar await dentro dele
  async created() {
    const config = { auth: { username: 'terrace', password: 'earsplitting' } };

    try {
      // --- PASSO 1: Buscar os IDs dos projetos em destaque ---
      const homeUrl = "https://opulent-journey.localsite.io/wp-json/wp/v2/home";
      const homeResponse = await axios.get(homeUrl, config);
      
      // O endpoint /home retorna um array, pegamos o primeiro item
      const homeData = homeResponse.data[0]; 
      const projectIds = homeData.acf.projetos_destaque; // Ex: [18] ou [18, 25, 30]

      // Se não houver IDs de projetos, não precisamos fazer mais nada
      if (!projectIds || projectIds.length === 0) {
        this.loading = false;
        return;
      }

      // --- PASSO 2: Usar os IDs para buscar os detalhes dos projetos ---
      // A API do WordPress aceita múltiplos IDs separados por vírgula no parâmetro 'include'
      const projectsUrl = `https://opulent-journey.localsite.io/wp-json/wp/v2/projetos?include=${projectIds.join(',')}`;
      
      const projectsResponse = await axios.get(projectsUrl, config);

      // --- PASSO 3: Mapear os dados recebidos para o nosso componente ---
      this.featuredProjects = projectsResponse.data.map(project => ({
        id: project.id,
        title: project.title.rendered,
        // Usamos o resumo do ACF se existir, senão o resumo padrão do post
        resumo: project.acf.resumo_projeto || project.excerpt.rendered,
        imagemDestaqueUrl: project.acf.imagem_de_destaque ? project.acf.imagem_de_destaque.url : null,
        // Adicionamos os outros campos que o modal pode precisar
        content: project.content.rendered,
        integrantes: project.acf.integrantes_projeto || [],
        galeria: project.acf.galeria_do_projeto || [],
        status: project.acf.status_do_projeto
      }));

    } catch (error) {
      console.error("Erro ao buscar projetos em destaque:", error);
      this.error = "Não foi possível carregar os projetos.";
    } finally {
      // Este bloco sempre será executado, com ou sem erro
      this.loading = false;
    }
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.projects-section {
  padding: 6rem 0;
}

.section-title {
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--color-primary-text);
  font-size: 1.1rem;
}

.project-card {
  width: 100%;
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  // Adicionado para que o card se comporte como um container flex para o card-body
  display: flex;
  flex-direction: column;

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

.card-image {
  height: 200px;
  border-bottom: 1px solid var(--color-border);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-body {
  padding: 1.5rem;
  /* MODIFICADO: Transforma o corpo do card em uma coluna flexível */
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Faz com que este elemento se estique */
}

.card-title {
  font-weight: 600;
  color: var(--color-primary-text);
  margin-bottom: 0.75rem;
}

.card-text {
  color: var(--color-secondary-text);
  font-size: 0.95rem;

  /* NOVO: Trunca o texto em 3 linhas e adiciona "..." */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.btn-primary {
  /* O 'mt-auto' no seu botão já funciona com o flexbox do .card-body */
  border-color: var(--button-primary-bg);
  color: #0644D8;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}
</style>