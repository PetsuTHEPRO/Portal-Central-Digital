<template>
  <div class="loading-screen">
    <div class="loading-container">
      <div class="logo-animation">
        <img src="@/assets/logoNoPadding.svg" alt="Portal Central Digital" />
      </div>
      <div class="loading-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen"
};
</script>

<style scoped lang="scss">
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(21, 23, 42);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.logo-animation {
  img {
    width: 80px;
    height: 80px;
    animation: miro-bounce 1.2s ease-in-out infinite;
  }
}

.loading-dots {
  display: flex;
  gap: 0.5rem;
  
  .dot {
    width: 8px;
    height: 8px;
    background: #ac00ff;
    border-radius: 50%;
    animation: dot-bounce 1.4s ease-in-out infinite;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

// Animação estilo Miro - movimento suave para frente e para trás
@keyframes miro-bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.02);
  }
}

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

// Versão escura (opcional)
.loading-screen.dark {
  background: #1a1a1a;
  
  .dot {
    background: #ac00ff;
  }
}

// Responsive
@media (max-width: 767.98px) {
  .logo-animation img {
    width: 60px;
    height: 60px;
  }
  
  .loading-dots .dot {
    width: 6px;
    height: 6px;
  }
}
</style>
