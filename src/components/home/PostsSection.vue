<template>
  <section class="posts-section">
    <div class="section-background">
      <div class="animated-grid">
        <div class="grid-line" v-for="i in 20" :key="i"></div>
      </div>
    </div>

    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="posts-content" data-aos="fade-right">

            
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
                <button class="btn btn-primary post-btn-primary" href="/posts/1">
                  <span>Ler Post</span>
                  <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="posts-visual" data-aos="fade-left" data-aos-delay="200">
            <div class="visual-container">
              <div class="main-post-card">
                <div class="card-image">
                  <div class="image-placeholder">
                    <i class="bi bi-image"></i>
                    <div class="loading-shimmer"></div>
                  </div>
                  <div class="image-overlay">
                  </div>
                </div>
                
                <div class="card-pulse"></div>
              </div>
              
              <div class="floating-cards">
                <div class="mini-card card-1">
                  <div class="mini-content">
                    <i class="bi bi-lightning"></i>
                    <span>Workshop</span>
                  </div>
                </div>
                
                <div class="mini-card card-2">
                  <div class="mini-content">
                    <i class="bi bi-people"></i>
                    <span>Oficinas</span>
                  </div>
                </div>
                
                <div class="mini-card card-3">
                  <div class="mini-content">
                    <i class="bi bi-calendar-event"></i>
                    <span>Sábado</span>
                  </div>
                </div>
              </div>
              
              <div class="connection-lines">
                <svg width="100%" height="100%" class="connection-svg">
                  <path d="M50,50 Q150,100 250,50" stroke="rgba(172, 0, 255, 0.3)" stroke-width="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0,300;150,150;300,0" dur="3s" repeatCount="indefinite"/>
                  </path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="posts-footer text-center mt-5" data-aos="fade-up" data-aos-delay="400">
        <router-link to="/posts" class="btn-view-blog">
          <span>Ver Todos os Posts</span>
          <i class="bi bi-arrow-right"></i>
          <div class="btn-ripple"></div>
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
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.posts-section {
  padding: 8rem 0;
  background: rgb(21, 23, 42);
  position: relative;
  overflow: hidden;
  height: 105vh;
}

.section-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.animated-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  
  .grid-line {
    position: absolute;
    background: linear-gradient(45deg, rgba(172, 0, 255, 0.3), rgba(6, 68, 216, 0.3));
    animation: grid-flow 4s ease-in-out infinite;
    
    &:nth-child(odd) {
      width: 1px;
      height: 100%;
      left: calc(var(--i) * 5%);
      animation-delay: calc(var(--i) * 0.1s);
    }
    
    &:nth-child(even) {
      height: 1px;
      width: 100%;
      top: calc(var(--i) * 5%);
      animation-delay: calc(var(--i) * 0.1s);
    }
  }
}

.posts-content {
  position: relative;
  z-index: 2;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(6, 68, 216, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
  color: rgba(6, 68, 216, 0.9);
  font-size: 1rem;
  font-weight: 500;
  
  i {
    font-size: 1.2rem;
  }
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

.post-badge {
  background: linear-gradient(135deg, rgba(255, 87, 34, 0.9), rgba(255, 193, 7, 0.9));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3);
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

.post-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  
  i {
    color: rgba(6, 68, 216, 0.7);
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(6, 68, 216, 0.3);
  }
}

.post-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateY(-2px);
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
  width: 700px;
  height: 425px;
  margin: 50px auto;
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
  overflow: hidden;
}

.loading-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(6, 68, 216, 0.1), transparent);
  animation: shimmer 2s ease-in-out infinite;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image:hover .image-overlay {
  opacity: 1;
}

.play-button {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #0644d8, #ac00ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 30px rgba(6, 68, 216, 0.4);
  }
}

.card-pulse {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid rgba(6, 68, 216, 0.3);
  border-radius: 1.75rem;
  animation: pulse-border 2s ease-in-out infinite;
}

.floating-cards {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mini-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.75rem;
  backdrop-filter: blur(8px);
  animation: float-mini 3s ease-in-out infinite;
  
  .mini-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    white-space: nowrap;
    
    i {
      color: rgba(6, 68, 216, 0.8);
    }
  }
  
  &.card-1 {
    top: -320px;
    left: 660px;
    animation-delay: 0s;
  }
  
  &.card-2 {
    top: -50px;
    right: -50px;
    animation-delay: -1s;
  }
  
  &.card-3 {
    bottom: 760px;
    left: -30px;
    animation-delay: -2s;
  }
}

.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.connection-svg {
  position: absolute;
  top: 0;
  left: 0;
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
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  
  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, rgba(6, 68, 216, 0.2), rgba(172, 0, 255, 0.2));
    border-color: rgba(6, 68, 216, 0.5);
    box-shadow: 0 10px 30px rgba(6, 68, 216, 0.2);
    color: white;
    
    .btn-ripple {
      animation: ripple 0.6s linear;
    }
  }
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

// Animations
@keyframes grid-flow {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.02);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulse-border {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

@keyframes float-mini {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

// Responsive
@media (max-width: 991.98px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .visual-container {
    width: 400px;
    height: 275px;
    margin-top: 3rem;
  }
  
  .main-post-card {
    width: 320px;
    height: 180px;
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
  
  .animated-grid {
    display: none;
  }
  
  .floating-cards {
    display: none;
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
    height: 157px;
  }
}
</style>
