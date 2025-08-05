const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

async function fetchApi(endpoint, options = {}) {
  const mergedOptions = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const requestUrl = `${STRAPI_URL}/api${endpoint}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao fazer a chamada para a API:", error);
    throw error;
  }
}

// --- Funções de Gerenciamento ---

// HOME
export async function getHomePageData() {
  // Dica: ?populate=deep é um plugin que popula tudo de forma aninhada. 
  // Se não tiver, use ?populate[0]=projetos_destaque&populate[1]=...
  return await fetchApi('/home?populate[0]=postagem&populate[1]=postagem.imagem_destaque&populate[2]=postagem.autor&populate[3]=postagem.autor.avatar&populate[4]=projetos&populate[5]=projetos.capa_projeto'); 
}

// PROJETOS
export async function getProjects() {
  return await fetchApi('/projetos?populate=*');
}

export async function getProjectById(id) {
  return await fetchApi(`/projetos/${id}?populate=*`);
}

export async function getFeaturedProjects() {
  return await fetchApi('/projetos?&populate=*');
}

// POSTAGENS
export async function getPosts(options = { page: 1, pageSize: 10 }) {
  const page = options.page || 1;
  const pageSize = options.pageSize || 5; // Usando 5 como padrão

  return await fetchApi(`/postagems?fields[0]=titulo&fields[1]=resumo&&fields[2]=data_publicacao&fields[3]=tempo_leitura&fields[4]=documentId&populate=autor&populate=categoria&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
}

export async function getPostById(postId) {
  return await fetchApi(`/postagems/${postId}?populate=*`);
}

export async function getPostBySlug(slug) { // Exemplo de busca por slug
  return await fetchApi(`/postagems?filters[slug][$eq]=${slug}&populate=*`);
}

// INTEGRANTES (o novo que você mencionou)
export async function getMembers() {
  return await fetchApi('/integrantes?populate=foto');
}

// GALERIAS
export async function getGalleries(options = { page: 1, pageSize: 9 }) { // Ex: 9 por página, bom para grids 3x3
  
  // 1. Pega as opções de paginação com valores padrão
  const page = options.page || 1;
  const pageSize = options.pageSize || 9;

  // 2. Monta a URL manualmente, como você pediu, com os campos corretos para a galeria
  const endpoint = `/galerias?populate[0]=galeria&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`; // Bônus: ordenando pelas galerias mais novas
  
  // 3. Chama a API. O 'true' no final pega a resposta completa com 'meta' para paginação
  return await fetchApi(endpoint, {}, true);
}

export async function getGalleryById(id) {
  return await fetchApi(`/galerias/${id}?populate=imagens`);
}