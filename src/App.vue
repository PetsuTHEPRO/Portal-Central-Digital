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

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  }
}
</script>

<style lang="scss">
// Importando as variáveis de cores para uso global
@use '@/assets/styles/_variables.scss';

// Estilos globais
body {
  font-family: var(--font-family-base);
  background-color: var(--color-background);
  color: var(--color-primary-text);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>