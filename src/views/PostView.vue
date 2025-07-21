<template>
  <main v-if="post">
    <PostsSection :singlePost="post" />

    <article class="post-content container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor, quam eget finibus cursus, nulla magna semper nisl, sed vulputate magna nibh eget arcu. Suspendisse potenti. Sed vitae lacinia nisl. Curabitur vel dictum sapien. Nam vitae ex sit amet turpis venenatis interdum.</p>
          <p>Phasellus eu lorem ut ex dapibus commodo. Integer ac nisi eu justo aliquam consectetur. Proin quis nunc ex. In hac habitasse platea dictumst. Morbi nec leo nec elit consequat aliquam. Aliquam erat volutpat. Fusce id commodo enim.</p>
          
          <h4 class="my-4">Um subtítulo interessante</h4>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec at est ut elit commodo interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
        </div>
      </div>
    </article>
  </main>
  <div v-else class="container text-center py-5">
    <h2>Post não encontrado</h2>
  </div>
</template>

<script>
// Reutilizando o componente da seção de Posts que já temos!
import PostsSection from '@/components/post/PostsSection.vue';

export default {
  name: 'PostView',
  components: {
    PostsSection
  },
  props: {
    // O 'id' do post virá da URL, graças à configuração do router
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      post: null,
      // Vamos simular um banco de dados de posts
      allPosts: [
        { 
          id: 'oficinas-no-sabado', 
          badge: 'Novidade', 
          title: 'Ponte Digital Irá Fazer Oficinas no Sábado!',
          author: 'Jeane',
          date: '2025-08-18'
        },
        // ... outros posts poderiam ser adicionados aqui
      ]
    };
  },
  created() {
    // Este método é executado quando o componente é criado.
    // Ele busca o post correspondente na nossa lista simulada.
    this.post = this.allPosts.find(p => p.id === this.id);
  }
}
</script>

<style scoped lang="scss">
.post-content {
  padding: 3rem 0 6rem 0;
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }
}
</style>