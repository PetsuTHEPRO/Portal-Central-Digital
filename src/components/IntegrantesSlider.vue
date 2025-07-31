<template>
  <div v-if="loading" class="text-center" role="status" aria-live="polite">
    <div class="loading-spinner mb-2" aria-hidden="true"></div>
    <p class="text-muted">Carregando integrantes...</p>
    <span class="sr-only">Carregando lista de integrantes do projeto, aguarde...</span>
  </div>
  <div v-else-if="filteredMembers.length > 0" class="swiper-container">
    <div 
      class="swiper" 
      ref="swiper"
      role="region"
      aria-label="Lista de integrantes do projeto"
      aria-describedby="members-instructions"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(member, index) in filteredMembers"
          :key="member.id"
          class="swiper-slide"
          role="group"
          :aria-label="`Integrante ${index + 1} de ${filteredMembers.length}`"
        >
          <div 
            class="integrante-card"
            tabindex="0"
            :aria-labelledby="`member-name-${member.id}`"
            :aria-describedby="`member-role-${member.id}`"
            @keydown.enter="announceMember(member)"
            @keydown.space.prevent="announceMember(member)"
          >
            <img
              v-if="member.fotoUrl"
              :src="member.fotoUrl"
              :alt="`Foto de ${member.nome}`"
              class="integrante-foto"
              role="img"
            />
            <div 
              v-else 
              class="integrante-placeholder"
              role="img"
              :aria-label="`Foto não disponível para ${member.nome}`"
            >
              <i class="bi bi-person" aria-hidden="true"></i>
            </div>
            <div class="integrante-info">
              <div 
                :id="`member-name-${member.id}`"
                class="integrante-nome"
                role="heading"
                aria-level="4"
              >
                {{ member.nome }}
              </div>
              <div 
                :id="`member-role-${member.id}`"
                class="integrante-cargo"
              >
                {{ member.cargo }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        class="swiper-button-next d-none"
        role="button"
        aria-label="Próximo integrante"
        tabindex="0"
        @keydown.enter="$event.target.click()"
        @keydown.space.prevent="$event.target.click()"
      ></div>
      <div 
        class="swiper-button-prev d-none"
        role="button"
        aria-label="Integrante anterior"
        tabindex="0"
        @keydown.enter="$event.target.click()"
        @keydown.space.prevent="$event.target.click()"
      ></div>
    </div>
    <div id="members-instructions" class="sr-only">
      Use as setas do teclado ou Tab para navegar entre os integrantes. Pressione Enter ou Espaço para mais informações sobre um integrante.
    </div>
  </div>
  <div v-else class="text-center">
    <div class="empty-state-small" role="status" aria-live="polite">
      <i class="bi bi-people" aria-hidden="true"></i>
      <p>{{ memberIds.length > 0 ? 'Integrantes não encontrados.' : 'Nenhum integrante selecionado.' }}</p>
    </div>
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
      
      // Debug para verificar os dados
      console.log('All members:', this.allMembers);
      console.log('Member IDs to filter:', this.memberIds);
      
      // Converter ambos para string para comparação
      const filtered = this.allMembers.filter((member) => {
        const memberId = String(member.id);
        const hasMatch = this.memberIds.some(id => String(id) === memberId);
        return hasMatch;
      });
      
      console.log('Filtered members:', filtered);
      return filtered;
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
            // Configurações de acessibilidade
            a11y: {
              enabled: true,
              prevSlideMessage: 'Slide anterior',
              nextSlideMessage: 'Próximo slide',
              firstSlideMessage: 'Este é o primeiro slide',
              lastSlideMessage: 'Este é o último slide',
            },
            keyboard: {
              enabled: true,
              onlyInViewport: true,
            },
          });
        }
      });
    },
    announceMember(member) {
      const announcement = `${member.nome}, ${member.cargo}`;
      this.announceToScreenReader(announcement);
    },
    announceToScreenReader(message) {
      // Criar um elemento temporário para anúncios
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      // Remover após um tempo
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(172, 0, 255, 0.2);
    border-color: rgba(172, 0, 255, 0.3);
    transform: scale(0.8);
    box-shadow: 0 8px 25px rgba(172, 0, 255, 0.2);
  }

  &::after {
    font-size: 16px;
    font-weight: 600;
  }
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid #ac00ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.empty-state-small {
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  
  i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, #ac00ff, #0644d8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Acessibilidade
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

// Focus indicators
.integrante-card:focus {
  outline: 2px solid #ac00ff !important;
  outline-offset: 2px !important;
  transform: translateY(-3px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 0 0 3px rgba(172, 0, 255, 0.3) !important;
}

.swiper-button-next:focus,
.swiper-button-prev:focus {
  outline: 2px solid #ac00ff !important;
  outline-offset: 2px !important;
  background: rgba(172, 0, 255, 0.4) !important;
  transform: scale(0.9);
}

// Melhor contraste de cores
.integrante-nome {
  font-weight: 600;
  color: #fff !important;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.integrante-cargo {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9) !important;
  background: linear-gradient(135deg, #ac00ff, #0644d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
