<template>
  <main class="blog-view">
    <div class="container">
      <header class="blog-header text-center">
        <h1 class="page-title">Postagens</h1>
        <p class="page-subtitle">Fique por dentro das últimas novidades e artigos do Ponte Digital.</p>
      </header>

      <div class="posts-list">
        <article v-for="post in paginatedPosts" :key="post.id" class="post-item">
          
          <h2 class="post-title">
            <router-link :to="'/posts/' + post.id">{{ post.title }}</router-link>
          </h2>

          <div class="post-meta">
            <span>Por <strong>{{ post.author }}</strong></span>
            <span class="mx-2">&middot;</span>
            <span>{{ formatDate(post.date) }}</span>
          </div>

          <p class="post-description">{{ post.summary }}</p>

        </article>
      </div>

      <nav v-if="totalPages > 1" aria-label="Navegação de Posts" class="pagination-nav">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevPage">Anterior</a>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">Próximo</a>
          </li>
        </ul>
      </nav>

    </div>
  </main>
</template>

<script>
export default {
  name: 'BlogView',
  data() {
    return {
      // Estado para controle da paginação
      currentPage: 1,
      itemsPerPage: 5, // Quantos posts por página

      // Banco de dados simulado com vários posts para testar a paginação
      allPosts: [
        { id: 'oficinas-no-sabado', title: 'Ponte Digital Irá Fazer Oficinas no Sábado!', author: 'Jeane', date: '2025-08-18', summary: 'Venha participar de nossas oficinas práticas de tecnologia e inovação. Uma oportunidade única para aprender e colaborar.' },
        { id: 'novo-projeto-ia', title: 'Lançamento do Novo Projeto de Inteligência Artificial', author: 'Carlos', date: '2025-08-15', summary: 'Apresentamos nosso mais novo projeto focado em soluções de IA para a comunidade local, visando otimizar processos e gerar impacto social.' },
        { id: 'parceria-com-universidade', title: 'Firmamos Parceria com a Universidade Federal', author: 'Admin', date: '2025-08-10', summary: 'Uma nova aliança estratégica que irá expandir nossas pesquisas e o alcance de nossos programas educacionais.' },
        { id: 'inscricoes-abertas-2025', title: 'Inscrições Abertas para o Programa 2025.2', author: 'Ana', date: '2025-08-05', summary: 'Não perca a chance de fazer parte da nossa próxima turma. As vagas são limitadas, garanta já a sua!' },
        { id: 'resumo-evento-julho', title: 'Resumo do Nosso Último Evento de Julho', author: 'Pedro', date: '2025-08-01', summary: 'Confira os melhores momentos, palestras e resultados do nosso encontro mensal que reuniu mais de 100 pessoas.' },
        { id: 'desenvolvimento-sustentavel', title: 'Tecnologia e Desenvolvimento Sustentável', author: 'Mariana', date: '2025-07-28', summary: 'Como a tecnologia pode ser uma aliada fundamental na busca por um futuro mais sustentável para todos.' },
        { id: 'dicas-de-carreira-tech', title: 'Dicas para Iniciar uma Carreira em Tecnologia', author: 'Carlos', date: '2025-07-22', summary: 'Um guia completo para estudantes e entusiastas que desejam dar os primeiros passos no mercado de trabalho de TI.' },
      ]
    };
  },
  computed: {
    /**
     * Calcula o número total de páginas necessárias.
     * Ex: 7 posts e 5 por página -> Math.ceil(7 / 5) = 2 páginas.
     */
    totalPages() {
      return Math.ceil(this.allPosts.length / this.itemsPerPage);
    },

    /**
     * Retorna apenas a fatia de posts correspondente à página atual.
     * A mágica da paginação acontece aqui!
     */
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allPosts.slice(start, end);
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo(0, 0); // Opcional: rola a página para o topo
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo(0, 0);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo(0, 0);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.blog-view {
  padding: 4rem 0 6rem 0;
}

.blog-header {
  margin-bottom: 4rem;
}

.page-title {
  font-weight: 700;
  color: var(--color-surface);
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-surface);
  max-width: 600px;
  margin: 0.5rem auto 0 auto;
}

.post-item {
  padding-bottom: 2.5rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none; // Remove a borda do último item
  }
}

.post-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  a {
    text-decoration: none;
    color: #0644D8;
    transition: color 0.2s ease;

    &:hover {
      color: #0644D8;
      text-decoration: underline;
    }
  }
}

.post-meta {
  font-size: 0.9rem;
  color: var(--color-surface);
  margin-bottom: 1rem;

  strong {
    color: var(--color-primary-text);
  }
}

.post-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-surface);
}

.pagination-nav {
  margin-top: 2rem;
}
</style>