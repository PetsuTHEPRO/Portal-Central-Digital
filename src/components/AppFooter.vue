<template>
  <footer id="footer" class="app-footer">
  <div class="container">
    <div class="row py-5">
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <div class="logo-placeholder mb-3">
            <img
              v-if="logoSrc"
              :src="logoSrc"
              alt="Ponte Digital"
              height="60"
            />
            <i v-else class="bi bi-image"></i>
          </div>
          <p class="footer-text">O Programa Ponte Digital conecta o IFMA à comunidade, promovendo inclusão digital e capacitação tecnológica.</p>
          <div class="social-icons">
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-twitter"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-linkedin"></i></a>
            <a href="#"><i class="bi bi-youtube"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="footer-heading">Sobre Nós</h6>
          <ul class="list-unstyled">
            <li><router-link to="/sobre-nos#missao">Missão</router-link></li>
            <li><router-link to="/sobre-nos#fundadores">Fundadores</router-link></li>
            <li><router-link to="/sobre-nos#nossas-metricas">Métricas</router-link></li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="footer-heading">Links Úteis</h6>
          <ul class="list-unstyled">
            <li><router-link to="/pontelink">PonteLink</router-link></li>
            <li><router-link to="/datahub">DataHub</router-link></li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="footer-heading">Portfólio</h6>
          <ul class="list-unstyled">
            <li><router-link to="/galeria">Galeria</router-link></li>
          </ul>
        </div>
        
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="footer-heading">Contatos</h6>
          <ul class="list-unstyled contact-info">
            <li>
                <div class="icon-placeholder-sm"><i class="bi bi-envelope"></i></div>
                <span>Email:<br>pontedigital@gmail.com</span>
            </li>
             <li>
                <div class="icon-placeholder-sm"><i class="bi bi-telephone"></i></div>
                <span>Phone:<br>(414) 687 - 5892</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="copyright-section text-center py-4">
        Copyright © 2025 Central Digital | All Rights Reserved
      </div>
    </div>
  </footer>
</template>

<script>
import srcLogo from "@/assets/logoPd.svg";

export default {
  name: 'AppFooter',
  data() {
    return {
      logoSrc: srcLogo,
    };
  },
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.app-footer {
  background: rgb(21, 23, 42);
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(6, 68, 216, 0.3),
      transparent
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at bottom right,
      rgba(6, 68, 216, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }
}

.logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s ease;
  
  img {
    height: 60px;
    transition: all 0.3s ease;
  }
  
  i {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
  }
  
  &:hover {
    transform: translateY(-3px);
    
    img, i {
      filter: drop-shadow(0 8px 20px rgba(172, 0, 255, 0.2));
    }
  }
}

.footer-heading {
  color: #fff;
  font-weight: 600;
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
  position: relative;
  padding-bottom: 0.75rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg,
      rgba(6, 68, 216, 0.8),
      #ac00ff
    );
    border-radius: 1px;
  }
}

.list-unstyled li {
  margin-bottom: 0.75rem;
}

.list-unstyled a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 4px;
    height: 4px;
    background: rgba(6, 68, 216, 0.5);
    border-radius: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #fff;
    transform: translateX(5px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    
    &::before {
      background: rgba(6, 68, 216, 1);
      box-shadow: 0 0 10px rgba(6, 68, 216, 0.5);
    }
  }
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  a {  
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.3rem;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    
    &:hover {
      color: #fff;
      transform: translateY(-3px);
      background: rgba(6, 68, 216, 0.15);
      border-color: rgba(6, 68, 216, 0.3);
      box-shadow: 0 8px 20px rgba(6, 68, 216, 0.2);
    }
  }
}

.copyright-section {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(6, 68, 216, 0.2),
      transparent
    );
  }
}

.contact-info {
  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    
    span {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.icon-placeholder-sm {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
  margin-right: 1rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  i {
    font-size: 1.1rem;
    background: linear-gradient(135deg, #fff, #a0a0ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(6, 68, 216, 0.15);
    border-color: rgba(6, 68, 216, 0.3);
    box-shadow: 0 8px 20px rgba(6, 68, 216, 0.2);
  }
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
</style>