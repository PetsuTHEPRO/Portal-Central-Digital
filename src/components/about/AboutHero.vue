<template>
  <section class="about-hero-section">
    <!-- Floating background elements -->
    <div class="floating-elements">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
      <div class="floating-particles">
        <div class="particle" v-for="n in 15" :key="n" :style="{ animationDelay: `${n * 0.2}s` }"></div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <div class="logo-container mb-8" data-aos="fade-up" data-aos-duration="1000">
            <img
              src="@/assets/logoNoPadding.svg"
              alt="Logo Ponte Digital"
              class="hero-logo"
            />
          </div>
          <p class="section-subtitle typing-text" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
            <span class="typing-content">
              O Programa Ponte Digital conecta o IFMA à comunidade, promovendo
              inclusão digital e capacitação tecnológica. Através de projetos
              inovadores, buscamos transformar vidas ao integrar o conhecimento
              acadêmico com as demandas reais da sociedade.
            </span>
            <span class="typing-cursor">|</span>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="image-card" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1200">
            <div class="image-overlay"></div>
            <img src="@/assets/AboutHeroImage.jpg" alt="Ponte Digital" />
            <div class="image-shine"></div>
          </div>
        </div>
        <div class="description-container" data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
          <p class="section-subtitle" style="margin-bottom: 2rem;">
            O Programa Ponte Digital tem o objetivo de aproximar a academia (IFMA)
            da sociedade, de modo a promover a cidadania e melhores oportunidades
            ao seu público-alvo. O Programa Ponte Digital surgiu a partir de um
            desafio feito à turma de Gerenciamento de Projetos, do curso de
            Sistemas de Informação do IFMA (semestre letivo 2024.1), campus Monte
            Castelo, no âmbito da curricularização da extensão (PNE 13.005/2014).
          </p>
          <p class="section-subtitle" style="margin-bottom: 2rem;">
            Assim, a turma de Gerenciamento de Projetos (6º período), Fundamentos
            de Sistemas de Informação (2º período) e Atividade Curricular de
            Extensão 1 (3º período), com a mentoria e coordenação geral da profa.
            Jeane Ferreira (DComp), colaboram na gestão e execução de
            projetos vinculados ao Programa Ponte Digital
          </p>
          <p class="section-subtitle">
            O programa Ponte Digital pretende promover o conhecimento e a inclusão digital, por meio da integração
            de conhecimentos acadêmicos com as necessidades e experiências da
            comunidade. Todos os seus integrantes têm a consciência de que, mais
            do que uma tarefa acadêmica, essa é a oportunidade de iniciar um ciclo
            de ações que gerem impacto socioeconômico e sejam capazes de
            transformar a realidade de nossa sociedade para melhor.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: "AboutHero",
  data() {
    return {
      isTypingComplete: false
    };
  },
  mounted() {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100
    });

    // Adiciona efeito de typing para o texto após um delay
    setTimeout(() => {
      this.addTypingEffect();
    }, 1500);
    
    // Adiciona parallax scroll
    this.addParallaxEffect();
  },
  methods: {
    addTypingEffect() {
      const typingContent = document.querySelector('.typing-content');
      const typingCursor = document.querySelector('.typing-cursor');
      
      if (typingContent && typingCursor) {
        const fullText = typingContent.textContent.trim();
        typingContent.textContent = '';
        typingCursor.style.display = 'inline';
        
        let i = 0;
        const typeWriter = () => {
          if (i < fullText.length) {
            typingContent.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // Velocidade de digitação
          } else {
            // Quando terminar de digitar, fazer o cursor piscar algumas vezes e depois esconder
            this.isTypingComplete = true;
            setTimeout(() => {
              typingCursor.style.display = 'none';
            }, 2000);
          }
        };
        
        typeWriter();
      }
    },
    
    addParallaxEffect() {
      let ticking = false;
      
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements) {
          floatingElements.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
      };
      
      const requestParallaxUpdate = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', requestParallaxUpdate);
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";
@use "sass:color";

.about-hero-section {
  padding: 8rem 0;
  position: relative;
  background: linear-gradient(135deg, #151729 0%, #1a1b3a 50%, #151729 100%);
  overflow: hidden;
  min-height: 100vh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(172, 0, 255, 0.6),
      rgba(6, 68, 216, 0.6),
      rgba(172, 0, 255, 0.6),
      transparent
    );
    animation: gradientShine 3s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(172, 0, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(6, 68, 216, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(172, 0, 255, 0.05) 0%, transparent 70%);
    animation: backgroundPulse 6s ease-in-out infinite;
    pointer-events: none;
  }
}

// Floating background elements
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 6s ease-in-out infinite;
  
  &.orb-1 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(172, 0, 255, 0.3), rgba(172, 0, 255, 0.1));
    top: 10%;
    left: 5%;
    animation-delay: 0s;
    animation-duration: 8s;
  }
  
  &.orb-2 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(6, 68, 216, 0.4), rgba(6, 68, 216, 0.1));
    top: 60%;
    right: 10%;
    animation-delay: 2s;
    animation-duration: 10s;
  }
  
  &.orb-3 {
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(255, 106, 0, 0.2), rgba(255, 106, 0, 0.05));
    bottom: 20%;
    left: 70%;
    animation-delay: 4s;
    animation-duration: 12s;
  }
}

.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(172, 0, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat 15s linear infinite;
  
  &:nth-child(odd) {
    background: rgba(6, 68, 216, 0.6);
    animation-duration: 20s;
  }
  
  &:nth-child(3n) {
    background: rgba(255, 106, 0, 0.4);
    animation-duration: 25s;
  }
}

.logo-container {
  position: relative;
  z-index: 10;
  
  .hero-logo {
    height: 15rem;
    margin-bottom: 3rem;
    width: auto;
    filter: drop-shadow(0 0 30px rgba(172, 0, 255, 0.5)) drop-shadow(0 0 60px rgba(6, 68, 216, 0.3));
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    animation: logoGlow 4s ease-in-out infinite;

    &:hover {
      transform: translateY(-10px) scale(1.05);
      filter: drop-shadow(0 10px 40px rgba(172, 0, 255, 0.7)) drop-shadow(0 0 80px rgba(6, 68, 216, 0.5));
    }
  }
}

.section-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2.2rem;
  padding: 0.5rem;
  background: linear-gradient(135deg, #ac00ff, #0644d8, #ff6a00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientText 3s ease-in-out infinite;
  text-shadow: none;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
  }
}

.typing-text {
  position: relative;
  z-index: 10;
  
  .typing-content {
    display: inline;
  }
  
  .typing-cursor {
    display: inline;
    color: #ac00ff;
    font-weight: bold;
    animation: blink 1s infinite;
    margin-left: 2px;
  }
}

.description-container {
  margin-top: 4rem;
  position: relative;
  z-index: 10;
}

.image-card {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  margin-top: 3rem;
  transform: perspective(1000px) rotateX(0deg);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(
      45deg,
      rgba(172, 0, 255, 0.5),
      rgba(6, 68, 216, 0.5),
      rgba(255, 106, 0, 0.3),
      rgba(172, 0, 255, 0.5)
    );
    background-size: 400% 400%;
    border-radius: inherit;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s ease;
    animation: gradientRotate 4s ease-in-out infinite;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(172, 0, 255, 0.1) 0%,
      transparent 50%,
      rgba(6, 68, 216, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: 3;
  }

  .image-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.8s ease;
    z-index: 4;
  }

  &:hover {
    transform: perspective(1000px) rotateX(5deg) translateY(-15px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 50px rgba(172, 0, 255, 0.3);

    &::before {
      opacity: 1;
    }

    .image-overlay {
      opacity: 1;
    }

    .image-shine {
      transform: translateX(100%);
    }

    img {
      transform: scale(1.05);
    }
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 1.5rem;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
    display: block;
  }
}

// Animations
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) translateX(0px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(100px);
    opacity: 0;
  }
}

@keyframes gradientShine {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes backgroundPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 0 30px rgba(172, 0, 255, 0.5)) drop-shadow(0 0 60px rgba(6, 68, 216, 0.3)); }
  50% { filter: drop-shadow(0 0 40px rgba(172, 0, 255, 0.8)) drop-shadow(0 0 80px rgba(6, 68, 216, 0.5)); }
}

@keyframes gradientText {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes gradientRotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

// Container styles
.container {
  position: relative;
  z-index: 10;
}

// Dynamic particle positioning
.particle {
  &:nth-child(1) { left: 10%; animation-delay: 0.5s; animation-duration: 20s; }
  &:nth-child(2) { left: 25%; animation-delay: 1s; animation-duration: 18s; }
  &:nth-child(3) { left: 40%; animation-delay: 1.5s; animation-duration: 22s; }
  &:nth-child(4) { left: 60%; animation-delay: 2s; animation-duration: 19s; }
  &:nth-child(5) { left: 75%; animation-delay: 2.5s; animation-duration: 21s; }
  &:nth-child(6) { left: 90%; animation-delay: 3s; animation-duration: 17s; }
  &:nth-child(7) { left: 15%; animation-delay: 3.5s; animation-duration: 23s; }
  &:nth-child(8) { left: 35%; animation-delay: 4s; animation-duration: 16s; }
  &:nth-child(9) { left: 55%; animation-delay: 4.5s; animation-duration: 24s; }
  &:nth-child(10) { left: 70%; animation-delay: 5s; animation-duration: 20s; }
  &:nth-child(11) { left: 85%; animation-delay: 5.5s; animation-duration: 18s; }
  &:nth-child(12) { left: 5%; animation-delay: 6s; animation-duration: 22s; }
  &:nth-child(13) { left: 45%; animation-delay: 6.5s; animation-duration: 19s; }
  &:nth-child(14) { left: 65%; animation-delay: 7s; animation-duration: 21s; }
  &:nth-child(15) { left: 80%; animation-delay: 7.5s; animation-duration: 17s; }
}

// Responsivo
@media (max-width: 991.98px) {
  .about-hero-section {
    padding: 6rem 0;
    min-height: auto;
  }

  .logo-container .hero-logo {
    height: 10rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .floating-orb {
    &.orb-1 {
      width: 200px;
      height: 200px;
    }
    
    &.orb-2 {
      width: 150px;
      height: 150px;
    }
    
    &.orb-3 {
      width: 180px;
      height: 180px;
    }
  }

  .image-card {
    &:hover {
      transform: perspective(1000px) rotateX(2deg) translateY(-10px);
    }
  }
}

@media (max-width: 767.98px) {
  .about-hero-section {
    padding: 4rem 0;
  }

  .logo-container .hero-logo {
    height: 8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .floating-orb {
    display: none; // Remove orbs on very small screens for performance
  }

  .typing-text {
    white-space: normal; // Allow text wrapping on mobile
    
    .typing-content {
      white-space: normal;
    }
    
    .typing-cursor {
      display: none; // Hide cursor on mobile for better UX
    }
  }
}
</style>
