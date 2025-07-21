<template>
  <main>
    <AboutHero id="missao"/>
    <FoundersSection id="fundadores"/>
    <MetricsSection id="nossas-metricas"/>
  </main>
</template>

<script>
import AboutHero from '@/components/about/AboutHero.vue';
import FoundersSection from '@/components/about/FoundersSection.vue';
import MetricsSection from '@/components/about/MetricsSection.vue';

export default {
  name: 'AboutView',
  components: {
    AboutHero,
    FoundersSection,
    MetricsSection
  }
}
</script>