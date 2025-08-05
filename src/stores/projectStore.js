import { defineStore } from "pinia";
import {
  getProjects,
  getProjectById,
  getHomePageData,
} from "@/services/strapi";


/**
 * Converte o formato Rich Text (blocos) do Strapi em uma string HTML.
 * @param {Array} contentBlocks - O array de blocos do campo Rich Text.
 * @returns {string} Uma string contendo o conteúdo formatado em HTML.
 */
function renderRichTextToHtml(contentBlocks) {
  if (!contentBlocks) return '';

  return contentBlocks.map(block => {
    // Função interna para processar os 'children' (textos, negritos, etc.)
    const processChildren = (children) => {
      return children.map(child => {
        let text = child.text;
        if (child.bold) {
          text = `<strong>${text}</strong>`;
        }
        if (child.italic) {
          text = `<em>${text}</em>`;
        }
        // Adicione outros formatos como 'underline' ou 'strikethrough' se precisar
        return text;
      }).join('');
    };

    // Converte cada tipo de bloco para sua tag HTML correspondente
    switch (block.type) {
      case 'heading':
        const level = block.level || 1; // Padrão h1 se o nível não for especificado
        return `<h${level}>${processChildren(block.children)}</h${level}>`;
      
      case 'paragraph':
        return `<p>${processChildren(block.children)}</p>`;
      
      case 'list':
        const listItems = block.children.map(listItem => 
          `<li>${processChildren(listItem.children)}</li>`
        ).join('');
        return block.format === 'ordered' ? `<ol>${listItems}</ol>` : `<ul>${listItems}</ul>`;
      
      // Adicione outros tipos de bloco como 'quote', 'image', etc. aqui
      default:
        return ''; // Ignora blocos não reconhecidos
    }
  }).join('');
}

// --- FUNÇÕES DE MAPEAMENTO ---

// Mapeador para os itens da lista de projetos
function mapProjectListItem(project) {
  const attr = project;
  console.log(project, "UE???");
  const imageUrl = attr.capa_projeto?.url
    ? `${attr.capa_projeto?.url}`
    : null;

  return {
    id: project.id,
    idDocumento: attr.documentId,
    title: attr.titulo,
    resumo: attr.descricao_curta,
    description: renderRichTextToHtml(attr.descricao),
    integrantes: attr.integrantes,
    status: attr.estado,
    featuredImageUrl: imageUrl,
  };
}

// Mapeador para um projeto individual completo
function mapSingleProjectData(project) {
  const attr = project.attributes;
  const imageUrl = attr.imagem_destaque?.imagem?.data?.attributes?.url
    ? `${attr.imagem_destaque.imagem.data.attributes.url}`
    : null;

  const galleryUrls =
    attr.galeria?.imagens?.data?.map((img) => `${img.attributes.url}`) ?? [];

  return {
    id: project.id,
    title: attr.titulo,
    description: attr.descricao, // Supondo que você tem um campo 'descricao'
    summary: attr.resumo,
    status: attr.status,
    featuredImageUrl: imageUrl,
    members: attr.integrantes?.data?.map((m) => m.attributes) ?? [],
    gallery: galleryUrls,
  };
}

// --- A STORE ---

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projectsList: [],
    pagination: null,
    currentProject: null,
    featuredProjects: [], // Para a Home
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllProjects(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getProjects({ page });
        this.projectsList = response.data.map(mapProjectListItem);
        console.log("AQUI: ", this.projectsList)
        this.pagination = response.meta.pagination;
      } catch (err) {
        this.error = "Não foi possível carregar os projetos.";
      } finally {
        this.loading = false;
      }
    },

    async fetchProjectById(id) {
      this.loading = true;
      this.error = null;
      this.currentProject = null;
      try {
        const projectData = await getProjectById(id);
        this.currentProject = mapSingleProjectData(projectData);
      } catch (err) {
        this.error = "Não foi possível carregar este projeto.";
      } finally {
        this.loading = false;
      }
    },

    async fetchFeaturedProjects() {
      // A sua nota sobre não precisar de loading/error para a home está perfeita.
      // Mantivemos essa simplicidade.
      try {
        // 1. Chama a função de serviço CORRETA, que já busca os 3 projetos
        const response = await getHomePageData();
        // A lista (vetor) de projetos está DENTRO de 'response.data.projetos'
        const listaDeProjetos = response.data.projetos;

        if (!listaDeProjetos || listaDeProjetos.length === 0) {
          throw new Error("A lista de projetos em destaque não foi encontrada.");
        }
        
        // A CORREÇÃO: Usamos a variável correta que contém a lista
        this.featuredProjects = listaDeProjetos.map(mapProjectListItem);

        console.log(
          "Projetos em destaque mapeados com sucesso:",
          this.featuredProjects
        );
      } catch (err) {
        console.error("Erro ao buscar projetos em destaque:", err);
        // this.error = "Não foi possível carregar os projetos." // Opcional
      }
    },
  },
});
