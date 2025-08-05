<template>
  <!-- Loading state -->
  <div v-if="loading" class="loading-container">
    <div class="container text-center">
      <div class="loading-spinner">
        <i class="bi bi-arrow-clockwise spin"></i>
        <p class="mt-3">Carregando postagem...</p>
      </div>
    </div>
  </div>

  <!-- Error state -->
  <div v-else-if="error" class="error-container">
    <div class="container text-center">
      <div class="error-message">
        <i class="bi bi-exclamation-triangle"></i>
        <h2 class="mt-3">Erro ao carregar postagem</h2>
        <p>{{ error }}</p>
        <router-link to="/posts" class="btn btn-primary mt-3">
          <i class="bi bi-arrow-left"></i>
          Voltar para as Postagens
        </router-link>
      </div>
    </div>
  </div>

  <!-- Post content -->
  <main v-else-if="currentPost" class="post-view">
    <header class="post-header">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <!-- Category badge -->
            <span v-if="currentPost.category" class="post-badge">
              {{ currentPost.category.name || currentPost.category }}
            </span>

            <h1 class="post-title">{{ currentPost.title }}</h1>

            <div class="post-meta">
              <div class="meta-item">
                <i class="bi bi-person"></i>
                <span>{{
                  currentPost.author?.name || currentPost.author || "Autor não informado"
                }}</span>
              </div>
              <div class="meta-item">
                <i class="bi bi-calendar3"></i>
                <span>{{ formatDate(currentPost.publishedAt || currentPost.date) }}</span>
              </div>
              <div class="meta-item" v-if="currentPost.readingTime">
                <i class="bi bi-clock"></i>
                <span>{{ currentPost.readingTime }} min de leitura</span>
              </div>
            </div>

            <!-- Tags -->
            <div class="post-tags" v-if="currentPost.tags && currentPost.tags.length > 0">
              <span v-for="tag in currentPost.tags" :key="tag.id || tag" class="tag">
                {{ tag.name || tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Featured image -->
    <div
      v-if="currentPost.featuredImage || currentPost.featuredImageUrl"
      class="featured-image-container"
    >
      <div class="container">
        <div class="image-wrapper">
          <img
            :src="currentPost.featuredImage?.url || currentPost.featuredImageUrl"
            :alt="currentPost.title"
            class="featured-image"
            @error="onImageError"
          />
        </div>
      </div>
    </div>

    <!-- Post content -->
    <article class="post-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="content-wrapper">
              <div class="post-summary" v-if="currentPost.summary">
                <p>{{ currentPost.summary }}</p>
              </div>

              <div class="post-body" v-html="currentPost.content"></div>

              <!-- Share buttons -->
              <div class="post-actions">
                <div class="share-buttons">
                  <span class="share-label">Compartilhar:</span>
                  <button
                    class="share-btn"
                    @click="shareOnTwitter"
                    title="Compartilhar no Twitter"
                  >
                    <i class="bi bi-twitter"></i>
                  </button>
                  <button
                    class="share-btn"
                    @click="shareOnFacebook"
                    title="Compartilhar no Facebook"
                  >
                    <i class="bi bi-facebook"></i>
                  </button>
                  <button
                    class="share-btn"
                    @click="shareOnLinkedIn"
                    title="Compartilhar no LinkedIn"
                  >
                    <i class="bi bi-linkedin"></i>
                  </button>
                  <button
                    class="share-btn"
                    @click="copyLink"
                    title="Copiar link"
                  >
                    <i class="bi bi-link-45deg"></i>
                  </button>
                </div>

                <router-link to="/posts" class="btn btn-outline-primary">
                  <i class="bi bi-arrow-left"></i>
                  Voltar para as Postagens
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </main>

  <!-- Not found state -->
  <div v-else class="not-found-container">
    <div class="container text-center">
      <div class="not-found-message">
        <i class="bi bi-journal-x"></i>
        <h2 class="mt-3">Post não encontrado</h2>
        <p>O post que você está procurando não existe ou foi removido.</p>
        <router-link to="/posts" class="btn btn-primary">
          <i class="bi bi-arrow-left"></i>
          Voltar para as Postagens
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/postStore";

// O componente agora recebe o ID da rota como uma 'prop'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const postStore = usePostStore();
const { currentPost, loading, error } = storeToRefs(postStore);
const { fetchPostById } = postStore;

const formatDate = (dateString) => {
  if (!dateString) return "Data não disponível";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

// Quando o componente é montado, busca o post usando o ID da prop
onMounted(() => {
  fetchPostById(props.id);
});

// (Opcional, mas recomendado) Se o ID na URL mudar sem a página recarregar,
// busca os dados do novo post.
watch(currentPost, (novoPost) => {
  // A primeira vez que a página carrega, novoPost será null.
  // A segunda vez, quando a API responder, ele terá os dados do post.
  if (novoPost) {
    console.log("A PIZZA CHEGOU! O post foi atualizado:", novoPost);
  }
});

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(this.post.title);
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    "_blank"
  );
};

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(this.post.title);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
    "_blank"
  );
};
const copyLink = () => {
  try {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
    alert("Link copiado para a área de transferência!");
  } catch (err) {
    console.error("Erro ao copiar link:", err);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";
@use "sass:color";

.post-view {
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
      circle at top center,
      rgba(172, 0, 255, 0.08),
      rgba(6, 68, 216, 0.08),
      transparent 70%
    );
    pointer-events: none;
  }
}

// Loading, error, and not found states
.loading-container,
.error-container,
.not-found-container {
  background: rgb(21, 23, 42);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

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
}

.loading-spinner,
.error-message,
.not-found-message {
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem;
  text-align: center;

  i {
    font-size: 4rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    color: #ffffff;
    margin: 1rem 0;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
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

// Post header
.post-header {
  padding: 8rem 0 4rem 0;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
}

.post-badge {
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  color: #ffffff;
  padding: 0.5rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 2rem;
  display: inline-block;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 16px rgba(172, 0, 255, 0.3);
}

.post-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.post-meta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;

  i {
    color: rgba(172, 0, 255, 0.8);
  }
}

.post-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.4rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(172, 0, 255, 0.2);
    border-color: rgba(172, 0, 255, 0.3);
    color: #ffffff;
  }
}

// Featured image
.featured-image-container {
  padding: 4rem 0;
  position: relative;
  z-index: 2;
}

.image-wrapper {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      rgba(172, 0, 255, 0.3),
      rgba(6, 68, 216, 0.3)
    );
    border-radius: inherit;
    z-index: -1;
    opacity: 0.6;
  }
}

.featured-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 1rem;
  transition: transform 0.3s ease;
}

// Post content
.post-content {
  padding: 2rem 0 8rem 0;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 3rem;
  backdrop-filter: blur(16px);
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
      rgba(172, 0, 255, 0.02),
      rgba(6, 68, 216, 0.02)
    );
    opacity: 0.5;
  }
}

.post-summary {
  position: relative;
  z-index: 2;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(172, 0, 255, 0.1);
  border: 1px solid rgba(172, 0, 255, 0.2);
  border-radius: 1rem;

  p {
    font-size: 1.2rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-style: italic;
  }
}

.post-body {
  position: relative;
  color: white;
  z-index: 2;

  :deep(p) {
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.85);
  }

  :deep(h4) {
    font-weight: 600;
    color: #ffffff;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :deep(h3) {
    font-weight: 600;
    color: #ffffff;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :deep(blockquote) {
    border-left: 3px solid rgba(172, 0, 255, 0.8);
    padding: 1.5rem 2rem;
    margin: 2rem 0;
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(172, 0, 255, 0.05);
    border-radius: 0 1rem 1rem 0;
    font-size: 1.1rem;
  }

  :deep(ul),
  :deep(ol) {
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }

  :deep(strong) {
    color: #ffffff;
  }

  :deep(a) {
    color: rgba(172, 0, 255, 0.9);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
}

// Post actions
.post-actions {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.share-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-label {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  margin-right: 0.5rem;
}

.share-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(172, 0, 255, 0.2);
    border-color: rgba(172, 0, 255, 0.4);
    color: #ffffff;
    transform: translateY(-2px);
  }
}

.btn-primary,
.btn-outline-primary {
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
    text-decoration: none;
  }
}

.btn-primary {
  background: linear-gradient(135deg, #0644d8, #ac00ff);
  border: none;
  color: white;

  &:hover {
    box-shadow: 0 8px 25px rgba(6, 68, 216, 0.4);
    color: white;
  }
}

.btn-outline-primary {
  background: transparent;
  border: 1px solid rgba(172, 0, 255, 0.5);
  color: rgba(172, 0, 255, 0.9);

  &:hover {
    background: rgba(172, 0, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.8);
    color: #ffffff;
  }
}

// Responsive design
@media (max-width: 991.98px) {
  .post-title {
    font-size: 2.5rem;
  }

  .post-header {
    padding: 6rem 0 3rem 0;
  }

  .content-wrapper {
    padding: 2rem;
  }

  .post-meta {
    gap: 1rem;
  }
}

@media (max-width: 767.98px) {
  .post-title {
    font-size: 2rem;
  }

  .post-header {
    padding: 5rem 0 2rem 0;
  }

  .content-wrapper {
    padding: 1.5rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .post-actions {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  .share-buttons {
    justify-content: center;
  }
}
</style>
