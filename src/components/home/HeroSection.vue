<template>
  <section class="hero-section">
    <div class="hero-background">
      <div class="floating-elements">
        <div class="floating-element" v-for="i in 6" :key="i"></div>
      </div>
      <div class="gradient-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    </div>

    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="hero-content" data-aos="fade-right" data-aos-duration="1000">
            <div class="hero-logo">
              <img src="@/assets/logoNoPadding.svg" alt="Portal Central Digital" />
            </div>
            <p class="hero-description">
              O Programa Ponte Digital conecta o IFMA à comunidade, promovendo inclusão digital e 
              capacitação tecnológica. Através de projetos inovadores, buscamos transformar vidas ao 
              integrar o conhecimento acadêmico com as demandas reais da sociedade.
            </p>
            <div class="hero-actions">
              <router-link to="/projetos" class="btn btn-primary hero-btn-primary">
                <span>Descobrir Projetos</span>
                <i class="bi bi-arrow-right"></i>
                <div class="btn-glow"></div>
              </router-link>
              <router-link to="/sobre-nos" class="btn btn-secondary hero-btn-secondary">
                <i class="bi bi-info-circle"></i>
                <span>Ler Mais</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2">
          <div class="hero-visual" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div class="visual-container">
              <div class="main-visual">
                <div class="visual-content">
                  <img src="@/assets/FigIcon.svg" alt="Figura Central" class=" bi bi cpu" />
                  <div class="pulse-ring"></div>
                  <div class="pulse-ring delay-1"></div>
                  <div class="pulse-ring delay-2"></div>
                </div>
                <div class="floating-cards">
                  <div class="card-mini card-1">
                    <i class="bi bi-code-square"></i>
                  </div>
                  <div class="card-mini card-2">
                    <i class="bi bi-palette"></i>
                  </div>
                  <div class="card-mini card-3">
                    <i class="bi bi-lightning"></i>
                  </div>
                  <div class="card-mini card-4">
                    <i class="bi bi-shield-check"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-scroll-indicator">
      <div class="scroll-line"></div>
      <div class="scroll-text">Role para descobrir</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';
@use "sass:color";
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap');

.hero-section {
  position: relative;
  background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 25%, #2a1f3d 50%, #1e2a4a 75%, #0f1419 100%);
  background-image: url('@/assets/bg.webp');
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(172, 0, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(6, 68, 216, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 0, 150, 0.08) 0%, transparent 50%);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(172, 0, 255, 0.05) 0%, transparent 25%, rgba(6, 68, 216, 0.05) 50%, transparent 75%, rgba(172, 0, 255, 0.03) 100%);
    animation: gradientMove 8s ease-in-out infinite;
    z-index: 1;
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  
  .floating-element {
    position: absolute;
    width: 6px;
    height: 6px;
    background: rgba(172, 0, 255, 0.6);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(172, 0, 255, 0.4);
    
    &:nth-child(1) {
      top: 20%;
      left: 20%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 40%;
      right: 30%;
      animation-delay: -2s;
      background: rgba(6, 68, 216, 0.6);
      box-shadow: 0 0 10px rgba(6, 68, 216, 0.4);
    }
    
    &:nth-child(3) {
      bottom: 30%;
      left: 15%;
      animation-delay: -4s;
      background: rgba(255, 0, 150, 0.6);
      box-shadow: 0 0 10px rgba(255, 0, 150, 0.4);
    }
    
    &:nth-child(4) {
      top: 60%;
      right: 20%;
      animation-delay: -1s;
      background: rgba(6, 68, 216, 0.6);
      box-shadow: 0 0 10px rgba(6, 68, 216, 0.4);
    }
    
    &:nth-child(5) {
      bottom: 20%;
      right: 40%;
      animation-delay: -3s;
      background: rgba(255, 0, 150, 0.6);
      box-shadow: 0 0 10px rgba(255, 0, 150, 0.4);
    }
    
    &:nth-child(6) {
      top: 80%;
      left: 60%;
      animation-delay: -5s;
      background: rgba(6, 68, 216, 0.6);
      box-shadow: 0 0 10px rgba(6, 68, 216, 0.4);
    }
  }
}

.gradient-orbs {
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.4;
    animation: pulse 6s ease-in-out infinite;
  }
  
  .orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(172, 0, 255, 0.6), rgba(255, 0, 150, 0.3), transparent);
    top: -200px;
    right: -200px;
    animation-delay: 0s;
  }
  
  .orb-2 {
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(6, 68, 216, 0.5), rgba(0, 150, 255, 0.3), transparent);
    bottom: -175px;
    left: -175px;
    animation-delay: -2s;
  }
  
  .orb-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 0, 150, 0.4), rgba(172, 0, 255, 0.2), transparent);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -1s;
  }
}

.hero-content {
  position: relative;
  z-index: 3;
  padding: 1.5rem 0;
}

.hero-logo {
  text-align: start;
  margin-bottom: 3rem;

  img {
    height: 15rem;
    width: auto;
    filter: drop-shadow(0 0 20px rgba(172, 0, 255, 0.3));
    animation: logoGlow 3s ease-in-out infinite alternate;
  }
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 500px;
  text-align: start;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.hero-btn-primary {
  position: relative;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  border: none;
  color: white;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  overflow: hidden;
  
  .btn-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(172, 0, 255, 0.4);
    
    .btn-glow {
      left: 100%;
    }
  }
}

.hero-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
}

.hero-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(172, 0, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    color: white;
    text-decoration: none;
  }
}

.hero-visual {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.visual-container {
  position: relative;
  width: 400px;
  height: 400px;
}

.main-visual {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-content {
  position: relative;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(172, 0, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(16px);
  box-shadow: 
    0 0 50px rgba(172, 0, 255, 0.2),
    inset 0 0 50px rgba(6, 68, 216, 0.1);
  
  img {
    width: 80px;
    height: 80px;
    filter: drop-shadow(0 0 20px rgba(172, 0, 255, 0.4));
    animation: rotate 10s linear infinite;
  }
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(172, 0, 255, 0.3);
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
  
  &.delay-1 {
    animation-delay: 0.7s;
  }
  
  &.delay-2 {
    animation-delay: 1.4s;
  }
}

.floating-cards {
  position: absolute;
  width: 100%;
  height: 100%;
}

.card-mini {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  animation: float 4s ease-in-out infinite;
  
  i {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  &.card-1 {
    top: -30px;
    left: -30px;
    animation-delay: 0s;
    
    &:hover i {
      color: #ac00ff;
    }
  }
  
  &.card-2 {
    top: -30px;
    right: -30px;
    animation-delay: -1s;
    
    &:hover i {
      color: #0644d8;
    }
  }
  
  &.card-3 {
    bottom: -30px;
    left: -30px;
    animation-delay: -2s;
    
    &:hover i {
      color: #ac00ff;
    }
  }
  
  &.card-4 {
    bottom: -30px;
    right: -30px;
    animation-delay: -3s;
    
    &:hover i {
      color: #0644d8;
    }
  }
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  animation: bounce 2s ease-in-out infinite;
}

.scroll-line {
  width: 1px;
  height: 30px;
  background: linear-gradient(to bottom, rgba(172, 0, 255, 0.8), transparent);
}

// Animations
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 10px rgba(172, 0, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 20px rgba(172, 0, 255, 0.4);
  }
}

@keyframes logoGlow {
  0% {
    filter: drop-shadow(0 0 20px rgba(172, 0, 255, 0.3));
  }
  100% {
    filter: drop-shadow(0 0 30px rgba(172, 0, 255, 0.6));
  }
}

@keyframes pulse-ring {
  0% {
    width: 200px;
    height: 200px;
    opacity: 1;
  }
  100% {
    width: 350px;
    height: 350px;
    opacity: 0;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes gradientMove {
  0%, 100% {
    background-position: 0% 0%;
    opacity: 0.5;
  }
  25% {
    background-position: 100% 0%;
    opacity: 0.8;
  }
  50% {
    background-position: 100% 100%;
    opacity: 0.6;
  }
  75% {
    background-position: 0% 100%;
    opacity: 0.7;
  }
}

// Responsive
@media (max-width: 991.98px) {
  .hero-logo img {
    height: 100px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .visual-container {
    width: 300px;
    height: 300px;
  }
  
  .visual-content {
    width: 150px;
    height: 150px;
    
    img {
      width: 60px;
      height: 60px;
    }
  }
}

@media (max-width: 767.98px) {
  .hero-section {
    min-height: 80vh;
    padding: 1.5rem 0;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-logo img {
    height: 80px;
  }
  
  .visual-content img {
    width: 50px;
    height: 50px;
  }
  
  .floating-elements {
    display: none;
  }
  
  .gradient-orbs .orb {
    display: none;
  }
}
</style>