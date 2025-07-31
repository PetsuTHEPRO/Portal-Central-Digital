<template>
  <section class="posts-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="posts-content">
            <h2 class="section-title">
              Fique por dentro das <span class="title-accent">Novidades</span>
            </h2>
            
            <div class="featured-post">
              <div class="post-header">
                <div class="post-date">
                  <i class="bi bi-calendar3"></i>
                  <span>{{ postDate }}</span>
                </div>
              </div>
              
              <h3 class="post-title">
                Ponte Digital Irá Fazer Oficinas no Sábado!
              </h3>
              
              <p class="post-excerpt">
                Não perca essa oportunidade única de aprender com nossa equipe especializada. 
                Workshops exclusivos sobre desenvolvimento web, design e tecnologias emergentes.
              </p>
              
              <div class="post-meta">
                <div class="author-info">
                  <div class="author-avatar">
                    <i class="bi bi-person-circle"></i>
                  </div>
                  <div class="author-details">
                    <strong>Jeane Silva</strong>
                    <span>Coordenadora</span>
                  </div>
                </div>
              </div>
              
              <div class="post-actions">
                <router-link to="/posts/ponte-digital-oficinas-sabado" class="btn btn-primary post-btn-primary">
                  <span>Ler Post</span>
                  <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="posts-visual">
            <div class="visual-container">
              <router-link to="/posts/ponte-digital-oficinas-sabado" class="main-post-card clickable-card">
                <div class="card-image">
                  <div class="image-placeholder">
                    <i class="bi bi-image"></i>
                  </div>
                  <div class="image-overlay">
                    <div class="view-post-button">
                      <i class="bi bi-eye"></i>
                      <span>Ver Post</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="posts-footer text-center mt-5">
        <router-link to="/posts" class="btn-view-blog">
          <span>Ver Todos os Posts</span>
          <i class="bi bi-arrow-right"></i>
        </router-link>
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
  }
};
</script>

<style scoped lang="scss">
.posts-section {
  padding: 8rem 0;
  background: rgb(21, 23, 42);
  position: relative;
  min-height: 100vh;
}

.posts-content {
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 2rem;
  line-height: 1.2;
  
  .title-accent {
    background: linear-gradient(135deg, #0644d8, #ac00ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.featured-post {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  padding: 2rem;
  backdrop-filter: blur(16px);
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(6, 68, 216, 0.3);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  
  i {
    color: rgba(6, 68, 216, 0.7);
  }
}

.post-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.post-excerpt {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: rgba(6, 68, 216, 0.8);
}

.author-details {
  strong {
    color: #fff;
    display: block;
    font-weight: 600;
  }
  
  span {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }
}

.post-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.post-btn-primary {
  background: linear-gradient(135deg, #0644d8, #ac00ff);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(6, 68, 216, 0.3);
    color: white;
    text-decoration: none;
  }
  
  &:focus {
    color: white;
    text-decoration: none;
  }
}

.posts-visual {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.visual-container {
  position: relative;
  width: 500px;
  height: 350px;
}

.main-post-card {
  position: relative;
  width: 400px;
  height: 300px;
  margin: 50px auto;
  display: block;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    text-decoration: none;
  }
}

.card-image {
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  border: 2px solid rgba(6, 68, 216, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.2);
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.view-post-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
  background: linear-gradient(135deg, #0644d8, #ac00ff);
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  
  i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  span {
    font-size: 1.1rem;
    font-weight: 600;
  }
}

.main-post-card:hover .image-overlay {
  opacity: 1;
}

.posts-footer {
  position: relative;
  z-index: 2;
  margin-top: 4rem;
}

.btn-view-blog {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(6, 68, 216, 0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s ease;
  backdrop-filter: blur(8px);
  
  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, rgba(6, 68, 216, 0.2), rgba(172, 0, 255, 0.2));
    border-color: rgba(6, 68, 216, 0.5);
    box-shadow: 0 10px 30px rgba(6, 68, 216, 0.2);
    color: white;
    text-decoration: none;
  }
}

// Responsive
@media (max-width: 991.98px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .visual-container {
    width: 350px;
    height: 250px;
    margin-top: 3rem;
  }
  
  .main-post-card {
    width: 320px;
    height: 220px;
  }
  
  .post-actions {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 767.98px) {
  .posts-section {
    padding: 4rem 0;
  }
  
  .featured-post {
    padding: 1.5rem;
  }
  
  .post-title {
    font-size: 1.5rem;
  }
  
  .visual-container {
    width: 300px;
    height: 200px;
  }
  
  .main-post-card {
    width: 280px;
    height: 180px;
  }
}
</style>
