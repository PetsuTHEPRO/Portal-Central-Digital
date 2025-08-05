import { defineStore } from "pinia";
// Só precisamos da função que busca a Home agora!
import { getHomePageData, getPosts, getPostById } from "@/services/strapi";

/**
 * Transforma um objeto de postagem "cru" da API Strapi v4 em um objeto limpo e pronto para o frontend.
 * @param {object} postFromApi - O objeto de postagem individual retornado pela API.
 * @returns {object|null} Um objeto de postagem formatado ou nulo se a entrada for inválida.
 */
function mapSinglePostData(postFromApi) {
  console.log("postFromApi", postFromApi);
  // Se não recebermos um post, retornamos nulo para evitar erros.
  if (!postFromApi || !postFromApi.data) return null;

  const attr = postFromApi.data;

  // 1. Monta a URL completa da imagem de destaque (que está dentro de um componente)
  const featuredImageUrl = attr.imagem_destaque?.url
    ? `${attr.imagem_destaque?.url}`
    : null;

  // 2. Monta a URL completa do avatar do autor (que é uma relação aninhada)
  const avatarUrl = attr.autor?.data?.attributes?.foto?.data?.attributes?.url
    ? `${STRAPI_URL}${attr.autor.data.attributes.foto.data.attributes.url}`
    : null;
    
  // 3. Converte o conteúdo Rich Text do Strapi para uma string HTML simples
  const renderContent = (contentBlocks) => {
    if (!contentBlocks) return '';
    // Este é um renderizador simples. Para mais complexidade (imagens no corpo, etc.),
    // bibliotecas como 'strapi-blocks-renderer-vue' podem ser usadas.
    return contentBlocks.map(block => {
      if (block.type === 'paragraph') {
        return `<p>${block.children.map(child => child.text).join('')}</p>`;
      }
      // Adicione outros tipos de bloco aqui (ex: 'heading', 'list') se necessário
      return '';
    }).join('');
  };

  // 4. Retorna o objeto final, limpo e organizado
  return {
    id: postFromApi.id,
    title: attr.titulo,
    summary: attr.resumo,
    content: renderContent(attr.conteudo), // Usa a função para converter o conteúdo
    date: attr.data_publicacao,
    readingTime: attr.tempo_leitura,

    // Dados da Imagem de Destaque
    featuredImageUrl: featuredImageUrl,
    featuredImageAlt: attr.imagem_destaque?.texto_alternativo ?? 'Imagem de destaque do post',
    featuredImageCaption: attr.imagem_destaque?.legenda ?? null,

    // Dados do Autor
    author: {
      name: attr.autor?.nome ?? 'Autor Desconhecido',
      role: attr.autor?.cargo ?? '',
      avatarUrl: avatarUrl,
    },
    
    // Dados das Relações
    category: attr.categoria?.nome ?? 'Sem Categoria',
    tags: attr.tags?.map(tag => tag.nome) ?? [],
  };
}

// Esta função vai mapear o objeto 'postagem' que vem DENTRO da resposta da Home
function mapNestedPostData(post) {
  if (!post) return null;

  // 2. AQUI ESTÁ A MUDANÇA
  // Verificamos se a imagem existe. Se sim, montamos a URL completa.
  const imageUrl = post.imagem_destaque ? `${post.imagem_destaque?.url}` : null;

  const avatarUrl = post.autor?.avatar ? `${post.autor?.avatar?.url}` : null;

  // O seu JSON já é plano, então não precisamos da variável 'attr'
  return {
    id: post.id,
    idDocumento: post.documentId,
    title: post.titulo,
    excerpt: post.resumo,
    content: post.conteudo,
    date: post.data_publicacao,
    readingTime: post.tempo_leitura,
    featuredImageUrl: imageUrl,
    author: {
      name: post.autor?.nome ?? "Autor Desconhecido",
      role: post.autor?.cargo ?? "",
      avatarUrl: avatarUrl, // Exemplo se tivesse foto
    },
    category: post.categoria?.nome ?? "Postagem",
    tags: post.tags?.map((tag) => tag.nome) ?? [],
  };
}

// Mapeador para os posts da lista (que são mais simples)
function mapPostListItem(post) {
  const attr = post;
  console.log(post)
  return {
    id: attr.id,
    idDocumento: attr.documentId,
    title: attr.titulo,
    summary: attr.resumo,
    date: attr.data_publicacao,
    readTime: attr.tempo_leitura,
    category: attr.categoria?.data?.attributes?.nome ?? "Postagem",
    author: attr.autor?.data?.attributes?.nome ?? "Autor Desconhecido",
    tags: attr.tags?.data?.map((tag) => tag.attributes.nome) ?? [],
  };
}

export const usePostStore = defineStore("posts", {
  state: () => ({
    featuredPost: null,
    postsList: [], // << ADICIONE ESTA LINHA (começa como um array vazio)
    pagination: null,
    currentPost: null,
    loading: false,
    error: null,
  }),

  actions: {
    // << CORREÇÃO: Renomeado para 'fetchAllPosts' e com a lógica correta
    async fetchAllPosts(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        // Busca a lista de posts com paginação
        const response = await getPosts({
          page: page,
          pageSize: 10,
        });

        // Usa .map() para aplicar a função de mapeamento em CADA item da lista
        console.log("Resposta da action fetchAllPosts:", response);
        this.postsList = response.data.map(mapPostListItem);
        this.pagination = response.meta.pagination;
      } catch (err) {
        this.error = "Não foi possível carregar as postagens.";
        console.error("Erro na action fetchAllPosts:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchFeaturedPost() {
      this.loading = true;
      this.error = null;

      try {
        // 1. FAZEMOS A ÚNICA CHAMADA NECESSÁRIA
        const homeData = await getHomePageData();

        if (!homeData || !homeData.data.postagem) {
          throw new Error(
            "Nenhuma postagem em destaque encontrada nos dados da Home."
          );
        }

        // 2. USAMOS OS DADOS QUE JÁ TEMOS. SEM SEGUNDA CHAMADA!
        // Passamos o objeto 'postagem' que já veio dentro da 'homeData' para a nossa função de mapeamento.
        this.featuredPost = mapNestedPostData(homeData.data.postagem);

        // Agora este console.log vai funcionar!
        console.log("Post mapeado com sucesso:", this.featuredPost);
      } catch (err) {
        this.error = "Não foi possível carregar a postagem em destaque.";
        console.error("Erro na action fetchFeaturedPost:", err);
      } finally {
        this.loading = false;
      }
    },
    // NOVA ACTION PARA ENCONTRAR E IR PARA A PÁGINA DE UM POST
    async fetchPostById(id) {
      this.loading = true;
      this.error = null;
      this.currentPost = null; // Limpa o post anterior para evitar mostrar dados antigos
      try {
        // 1. Chama a função de serviço para buscar o post pelo ID
        const postData = await getPostById(id);

        if (!postData) {
          throw new Error("Post não encontrado.");
        }

        // 2. Mapeia os dados recebidos para um formato limpo
        this.currentPost = mapSinglePostData(postData); // Use o mapeador de post completo

        console.log("Post individual carregado com sucesso:", this.currentPost);
      } catch (err) {
        this.error = "Não foi possível carregar esta postagem.";
        console.error(`Erro na action fetchPostById com ID ${id}:`, err);
      } finally {
        this.loading = false;
      }
    },
  },
});
