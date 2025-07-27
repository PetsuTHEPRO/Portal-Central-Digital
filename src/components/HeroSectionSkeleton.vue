<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-container">
        <div class="image-main-placeholder skeleton-box"></div>
        <div class="card-content-skeleton">
          <div class="skeleton-box title-skeleton"></div>
          <div class="skeleton-box text-skeleton"></div>
          <div class="skeleton-box text-skeleton short"></div>
          <div class="skeleton-box button-skeleton"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  padding: 8rem 0;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(172, 0, 255, 0.1), rgba(6, 68, 216, 0.1));
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top, rgba(172, 0, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
}

.hero-container {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 450px;
}

.image-main-placeholder {
  width: 70%;
  height: 450px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent
    );
    animation: shimmer 2s infinite;
  }
}

.card-content-skeleton {
  position: absolute;
  z-index: 2;
  width: 50%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.skeleton-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(172, 0, 255, 0.1),
      rgba(6, 68, 216, 0.1),
      transparent
    );
    animation: shimmer 2s infinite;
  }
}

.title-skeleton {
  height: 2.5rem;
  margin-bottom: 1.5rem;
  width: 60%;
}

.text-skeleton {
  height: 1rem;
  margin-bottom: 1rem;

  &.short {
    width: 80%;
  }
}

.button-skeleton {
  height: 3rem;
  width: 40%;
  margin-top: 1rem;
  border-radius: 0.375rem;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>