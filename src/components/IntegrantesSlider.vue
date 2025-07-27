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
  flex-shrink: 1;
}

.swiper-container {
  width: 100%;
  overflow: hidden;
  padding: 1rem 0;
}

.integrante-card {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(172, 0, 255, 0.3);
  }
}

.integrante-foto,
.integrante-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(172, 0, 255, 0.1), rgba(6, 68, 216, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .integrante-card:hover & {
    border-color: rgba(172, 0, 255, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
}

.integrante-info {
  margin-top: 1rem;
}

.integrante-nome {
  font-weight: 600;
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.integrante-cargo {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.swiper-button-next,
.swiper-button-prev {
  color: #fff;
  transform: scale(0.7);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(172, 0, 255, 0.2);
    border-color: rgba(172, 0, 255, 0.3);
    transform: scale(0.8);
  }

  &::after {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
