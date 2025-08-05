<template>
  <main class="blog-view">
    <div class="container">
      <header class="blog-header text-center">
        <h1 class="page-title">Postagens</h1>
        <p class="page-subtitle">
          Fique por dentro das últimas novidades e artigos do Ponte Digital.
        </p>
      </header>

      <div v-if="loading" class="text-center loading-state">
        <div class="loading-spinner"><i class="bi bi-arrow-clockwise spin"></i></div>
        <p class="mt-3">Carregando postagens...</p>
      </div>

      <div v-else-if="error" class="text-center error-message">
        <i class="bi bi-exclamation-triangle"></i>
        <p class="mt-3 text-danger">{{ error }}</p>
      </div>

      <div v-else-if="postsList.length > 0" class="posts-list">
        <article v-for="post in postsList" :key="post.idDocumento" class="post-item">
          <div class="post-card">
            <div class="post-header">
              <div class="post-category" v-if="post.category">{{ post.category }}</div>
              <h2 class="post-title">
                <router-link :to="'/posts/' + post.idDocumento">{{ post.title }}</router-link>
              </h2>
              <div class="post-meta">
                <div class="meta-item">
                  <i class="bi bi-person"></i>
                  <span>{{ post.author }}</span>
                </div>
                <div class="meta-item">
                  <i class="bi bi-calendar3"></i>
                  <span>{{ formatDate(post.date) }}</span>
                </div>
                <div class="meta-item" v-if="post.readTime">
                  <i class="bi bi-clock"></i>
                  <span>{{ post.readTime }} min de leitura</span>
                </div>
              </div>
            </div>

            <div class="post-content">
              <p class="post-description">{{ post.summary }}</p>

              <div class="post-actions">
                <router-link :to="'/posts/' + post.idDocumento" class="btn btn-primary">Ler mais <i class="bi bi-arrow-right"></i></router-link>
                <div class="post-tags" v-if="post.tags && post.tags.length > 0">
                  <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="text-center empty-state">
        <i class="bi bi-journal-text"></i>
        <h5 class="mt-3">Nenhuma postagem encontrada</h5>
      </div>

      <nav v-if="pagination && pagination.pageCount > 1" aria-label="Navegação de Posts" class="pagination-nav">
        <div class="pagination-container">
          <button class="pagination-btn" :disabled="pagination.page === 1" @click="changePage(pagination.page - 1)">Anterior</button>
          <div class="page-numbers">
            <button v-for="page in pagination.pageCount" :key="page" class="page-btn" :class="{ active: page === pagination.page }" @click="changePage(page)">{{ page }}</button>
          </div>
          <button class="pagination-btn" :disabled="pagination.page === pagination.pageCount" @click="changePage(pagination.page + 1)">Próximo</button>
        </div>
      </nav>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/postStore';

// 1. Conecta o componente com a store Pinia que já criamos
const postStore = usePostStore();

// 2. Pega o state e as actions que precisamos da store
// 'storeToRefs' garante que o state continue reativo
const { postsList, pagination, loading, error } = storeToRefs(postStore);
const { fetchAllPosts } = postStore;

// 3. Função para formatar a data (pode ser movida para um arquivo de 'utils' no futuro)
const formatDate = (dateString) => {
  if (!dateString) return "Data não disponível";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

// 4. Função para mudar de página que agora chama a action da store
const changePage = (page) => {
  // Validação para não ir para páginas que não existem
  if (page < 1 || page > pagination.value.pageCount) return;
  
  window.scrollTo({ top: 0, behavior: "smooth" }); // Rola para o topo
  fetchAllPosts(page); // Pede à store para buscar os dados da nova página
};

// 5. Quando o componente é montado na tela, busca a primeira página de posts
onMounted(() => {
  fetchAllPosts(1);
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";
@use "sass:color";

.blog-view {
  padding: 8rem 0 6rem 0;
  background: rgb(21, 23, 42);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(172, 0, 255, 0.3),
      rgba(6, 68, 216, 0.3),
      transparent
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top right,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
}

.blog-header {
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0.5rem auto 0 auto;
  line-height: 1.6;
}

// Loading and error states
.loading-spinner,
.error-message,
.empty-state {
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem 0;

  i {
    font-size: 3rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p,
  h5 {
    color: rgba(255, 255, 255, 0.8);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.posts-list {
  max-width: 900px;
  margin: 0 auto;
}

.post-item {
  margin-bottom: 3rem;
}

.post-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2.5rem;
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(172, 0, 255, 0.03),
      rgba(6, 68, 216, 0.03)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(172, 0, 255, 0.3);
    box-shadow: 0 12px 40px rgba(6, 68, 216, 0.2);

    &::before {
      opacity: 1;
    }
  }
}

.post-header {
  margin-bottom: 1.5rem;
}

.post-category {
  display: inline-block;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  color: #ffffff;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;

  a {
    text-decoration: none;
    color: #ffffff;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #ac00ff, #0644d8);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  i {
    color: rgba(172, 0, 255, 0.8);
  }
}

.post-content {
  position: relative;
  z-index: 2;
}

.post-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #0644d8, #ac00ff);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(6, 68, 216, 0.4);
    text-decoration: none;
    color: white;
  }

  i {
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: translateX(3px);
  }
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(172, 0, 255, 0.2);
    border-color: rgba(172, 0, 255, 0.3);
    color: #ffffff;
  }
}

// Pagination styles (same as ProjectsView)
.pagination-nav {
  margin-top: 4rem;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.pagination-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.3);
    color: #ffffff;
    transform: translateY(-2px);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.3);
    color: #ffffff;
  }

  &.active {
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    border-color: transparent;
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(172, 0, 255, 0.3);
  }
}

// Responsive design
@media (max-width: 991.98px) {
  .blog-view {
    padding: 6rem 0 4rem 0;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .post-card {
    padding: 2rem;
  }

  .post-title {
    font-size: 1.75rem;
  }

  .post-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }

  .page-numbers {
    order: -1;
  }
}

@media (max-width: 767.98px) {
  .page-title {
    font-size: 2rem;
  }

  .post-card {
    padding: 1.5rem;
  }

  .post-title {
    font-size: 1.5rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .pagination-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
