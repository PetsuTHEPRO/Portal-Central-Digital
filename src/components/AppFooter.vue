<template>
  <footer class="app-footer">
    <div class="container">
      <div class="row py-5">
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <div class="logo-placeholder mb-3">
            <i class="bi bi-image"></i>
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
          <h6 class="footer-heading">Portfolio</h6>
          <ul class="list-unstyled">
            <li><router-link to="/galeria">Galeria</router-link></li>
          </ul>
        </div>
        
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="footer-heading">Contatos</h6>
          <ul class="list-unstyled contact-info">
            <li>
                <div class="icon-placeholder-sm"><i class="bi bi-envelope"></i></div>
                <span>Email:<br>pontedigital@gma<br>il.com</span>
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
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss';

.app-footer {
  background-color: #101720 !important;
  color: white;
}

.logo-placeholder {
  width: 50px;
  height: 50px;
  border: 1px solid var(--footer-border);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: var(--footer-text);
}

.footer-heading {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.list-unstyled li {
  margin-bottom: 0.5rem;
}

.list-unstyled a {
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: white;
  }
}

.social-icons a {  
  color: white;
  margin-right: 1rem;
  font-size: 1.2rem;
  transition: color 0.2s ease;
  &:hover {
    color: white;
  }
}

.copyright-section {
  border-top: 1px solid var(--footer-border);
  font-size: 0.9rem;
}

.contact-info li {
    display: flex;
    align-items: flex-start;
}
.icon-placeholder-sm {
    width: 40px;
    height: 40px;
    border: 1px solid var(--footer-border);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    color: white;
    flex-shrink: 0;
    margin-right: 0.75rem;
}
</style>