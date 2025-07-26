<template>
  <main v-if="post" class="post-view">
    
    <header class="post-header">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <span class="post-badge">{{ post.badge }}</span>
            
            <h1 class="post-title">{{ post.title }}</h1>
            
            <div class="post-meta">
              <span>Por <strong>{{ post.author }}</strong></span>
              <span class="mx-2">&middot;</span>
              <span>{{ formatDate(post.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="featured-image-container container my-5">
      <img :src="post.featuredImageUrl" :alt="post.title" class="featured-image">
    </div>

    <article class="post-content container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div v-html="post.content"></div>
        </div>
      </div>
    </article>

  </main>

  <div v-else class="container text-center py-5">
    <div class="alert alert-danger">
      <h2>Post não encontrado</h2>
      <p>O post que você está procurando não existe ou foi movido.</p>
      <router-link to="/posts" class="btn btn-primary">Voltar para as Postagens</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      post: null,
      // Banco de dados simulado com mais informações (imagem e conteúdo)
      allPosts: [
        { 
          id: 'oficinas-no-sabado', 
          badge: 'Novidade', 
          title: 'Ponte Digital Irá Fazer Oficinas no Sábado!',
          author: 'Jeane',
          date: '2025-08-18',
          featuredImageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // URL de uma imagem de exemplo
          content: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor, quam eget finibus cursus, nulla magna semper nisl, sed vulputate magna nibh eget arcu. Suspendisse potenti. Sed vitae lacinia nisl. Curabitur vel dictum sapien. Nam vitae ex sit amet turpis venenatis interdum.</p>
            <p>Phasellus eu lorem ut ex dapibus commodo. Integer ac nisi eu justo aliquam consectetur. Proin quis nunc ex. In hac habitasse platea dictumst. Morbi nec leo nec elit consequat aliquam. Aliquam erat volutpat. Fusce id commodo enim.</p>
            <br>
            <h4>Um subtítulo interessante</h4>
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec at est ut elit commodo interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
            <blockquote>"A tecnologia é melhor quando junta as pessoas." - Matt Mullenweg</blockquote>
            <p>Continuamos o desenvolvimento com foco na comunidade, sempre buscando novas formas de inovar e educar através de nossos projetos e oficinas.</p>
          `
        },
        // ... outros posts
      ]
    };
  },
  methods: {
    // Método para formatar a data de forma mais amigável
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
  },
  created() {
    this.post = this.allPosts.find(p => p.id === this.id);
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.post-view {
  background-color: var(--color-background);
}

// Estilos para o novo cabeçalho
.post-header {
  padding: 5rem 0 4rem 0;
  background-color: var(--color-surface); // Um fundo sutil para o cabeçalho
  border-bottom: 1px solid var(--color-border);
}

.post-badge {
  background-color: var(--color-primary);
  color: white;
  padding: 0.35rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 2rem;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-primary-text);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.post-meta {
  color: var(--color-secondary-text);
  font-size: 0.95rem;

  strong {
    color: var(--color-primary-text);
  }
}

// Estilos para a imagem de destaque
.featured-image-container {
  text-align: center;
}
.featured-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
}

// Estilos para o conteúdo do artigo
.post-content {
  padding: 0 0 6rem 0;
  
  // Estilização do conteúdo que vem do v-html
  // Usamos 'deep' para aplicar estilos a elementos filhos não escopados
  :deep(p) {
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: var(--color-secondary-text);
  }

  :deep(h4) {
    font-weight: 600;
    color: var(--color-primary-text);
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  :deep(blockquote) {
    border-left: 3px solid var(--color-primary);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--color-secondary-text);
  }
}

// Ajustes para telas menores
@media (max-width: 767.98px) {
  .post-title {
    font-size: 2.2rem;
  }
  .post-header {
    padding: 4rem 0 3rem 0;
  }
}
</style>