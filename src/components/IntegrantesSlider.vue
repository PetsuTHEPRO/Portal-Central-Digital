<template>
  <div v-if="loading" class="text-center">
    <p>Carregando integrantes...</p>
  </div>
  <div v-else-if="filteredMembers.length > 0" class="swiper-container">
    <div class="swiper" ref="swiper">
      <div class="swiper-wrapper">
        <div
          v-for="member in filteredMembers"
          :key="member.id"
          class="swiper-slide"
        >
          <div class="integrante-card">
            <img
              v-if="member.fotoUrl"
              :src="member.fotoUrl"
              :alt="member.nome"
              class="integrante-foto"
            />
            <div v-else class="integrante-placeholder">
              <i class="bi bi-person"></i>
            </div>
            <div class="integrante-info">
              <div class="integrante-nome">{{ member.nome }}</div>
              <div class="integrante-cargo">{{ member.cargo }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-next d-none"></div>
      <div class="swiper-button-prev d-none"></div>
    </div>
  </div>
  <div v-else class="text-center">
    <p>Nenhum integrante selecionado.</p>
  </div>
</template>

<script>
import axios from "axios";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default {
  name: "IntegrantesSlider",
  props: {
    memberIds: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      allMembers: [],
      loading: true,
      swiperInstance: null,
    };
  },
  computed: {
    filteredMembers() {
      if (!this.allMembers.length || !this.memberIds.length) {
        return [];
      }
      console.log(
        this.allMembers.filter((member) => this.memberIds.includes(member.id))
      );
      return this.allMembers.filter((member) =>
        this.memberIds.includes(member.id)
      );
    },
  }, // 👇 O BLOCO 'WATCH' FOI REMOVIDO DAQUI 👇
  methods: {
    // Este método agora é "público" e será chamado pelo componente pai
    initSwiper() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
        this.swiperInstance = null;
      }

      this.$nextTick(() => {
        if (this.filteredMembers.length > 0) {
          this.swiperInstance = new Swiper(this.$refs.swiper, {
            modules: [Navigation],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            breakpoints: {
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            },
          });
        }
      });
    },
  },
  created() {
    const url = "https://opulent-journey.localsite.io/wp-json/wp/v2/membro";
    const config = { auth: { username: "terrace", password: "earsplitting" } };

    axios
      .get(url, config)
      .then((response) => {
        this.allMembers = response.data.map((membro) => ({
          id: membro.id,
          nome: membro.acf.nome,
          cargo: membro.acf.cargo_membro,
          fotoUrl: membro.acf.imagem_integrante
            ? membro.acf.imagem_integrante.url
            : false,
        }));
      })
      .catch((error) =>
        console.error("Erro ao buscar todos os membros:", error)
      )
      .finally(() => (this.loading = false));
  },
};
</script>

<style scoped lang="scss">
.swiper-slide {
  flex-shrink: 1; /* <-- CORREÇÃO PRINCIPAL */
}

.swiper-container {
  /* Define uma largura para o carrossel ocupar */
  width: 100%;
  /* Essencial: esconde os slides que estão fora da área visível */
  overflow: hidden;
  padding: 1rem 0; /* Adiciona um espaço para as setas não ficarem coladas */
}

.integrante-card {
  text-align: center;
}
.integrante-foto,
.integrante-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-secondary-text);
}
.integrante-info {
  margin-top: 1rem;
}
.integrante-nome {
  font-weight: 600;
}
.integrante-cargo {
  font-size: 0.9rem;
  color: var(--color-secondary-text);
}
.swiper-button-next,
.swiper-button-prev {
  color: var(--color-primary-text);
  transform: scale(0.7);
}
</style>
