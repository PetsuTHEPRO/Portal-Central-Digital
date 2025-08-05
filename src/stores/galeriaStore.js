import { defineStore } from 'pinia';
// Importamos a função de API que acabamos de criar
import { getGalleries } from '@/services/strapi';

// Função para "traduzir" os dados brutos de um arquivo da API
// para um formato limpo e fácil de usar no frontend.
function mapImageData(file) {
  if (!file) return null;
  
  return {
    id: file.galeria.id,
    name: file.galeria.name,
    alt: file.galeria.alternativeText? file.galeria.alternativeText : file.titulo,
    caption: file.caption? file.caption : null,
    url: `${file.url}`, // URL da imagem em tamanho original
    width: file.galeria.width,
    height: file.galeria.height,
  };
}


// --- A STORE ---

export const useGalleryStore = defineStore('gallery', {
  // 1. O 'state' é onde os dados da galeria ficam guardados
  state: () => ({
    images: [],
    pagination: null,
    loading: false,
    error: null,
  }),

  // 2. 'actions' são os métodos que buscam e alteram o estado
  actions: {
    async fetchImages(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        // 1. Busca a lista de ÁLBUNS de galeria
        const response = await getGalleries({ page });

        // 2. A CORREÇÃO: Usamos 'flatMap' para transformar uma lista de álbuns
        //    em uma única lista de todas as imagens contidas neles.
        const allImages = response.data.flatMap(gallery => {
          console.log("Imagens do álbum:", gallery.galeria);
          // Pega o título do álbum
          const albumTitle = gallery.titulo;

          // Se não houver imagens neste álbum, retorna uma lista vazia
          if (!gallery.galeria || !gallery) {
            return [];
          }

          // Para cada imagem dentro do álbum, criamos um objeto limpo
          return gallery.galeria.map(image => ({
            id: image.id,
            name: image.name,
            alt: image.alternativeText || albumTitle, // Usa o título do álbum como 'alt' se não houver
            caption: image.caption,
            url: `${image.url}`,
            thumbnailUrl: `${image.formats.thumbnail.url}`,
            width: image.width,
            height: image.height,
            albumTitle: albumTitle // Guardamos o título do álbum para referência
          }));
        });
        
        this.images = allImages;
        
        console.log("Imagens mapeadas com sucesso:", this.images);
        
        // Guarda as informações de paginação dos ÁLBUNS
        this.pagination = response.meta.pagination;

      } catch (err) {
        this.error = "Não foi possível carregar as imagens da galeria.";
        console.error("Erro na action fetchImages:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});