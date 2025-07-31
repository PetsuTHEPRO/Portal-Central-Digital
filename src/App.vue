<template>
  <div id="app">
    <AppNavbar />
    <router-view/>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  },
  mounted() {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }
}
</script>

<style lang="scss">
// Importando as variáveis de cores para uso global
@use '@/assets/styles/main.scss';
@use '@/assets/styles/_variables.scss';

// Estilos globais
body {
  font-family: var(--font-family-base);
  color: var(--color-primary-text);
}

body {
  /* Isso é uma cor de fallback. Se o navegador for muito antigo
    e não suportar gradientes, ele mostrará esta cor sólida.
  */
  background-color: #DADAE8;

  /* Esta é a propriedade que cria o gradiente.
    Ela sobrescreve o background-color em navegadores modernos.
  */
  background-image: linear-gradient(
    to bottom,      /* A direção do gradiente: de cima para baixo */
    #DADAE8,       /* Cor inicial (no topo) */
    #B5B5CC        /* Cor final (na base) */
  );

  /* Para garantir que o gradiente não se repita em páginas muito longas
    e ocupe toda a altura da tela.
  */
  background-repeat: no-repeat;
  background-attachment: fixed; /* Opcional: mantém o fundo fixo ao rolar a página */
  min-height: 100vh; /* Garante que o body ocupe no mínimo toda a altura da tela */
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>