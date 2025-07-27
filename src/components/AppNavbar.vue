<template>
  <nav class="navbar navbar-expand-lg navbar-background py-0">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          v-if="logoSrc"
          :src="logoSrc"
          alt="Ponte Digital"
          height="80"
        />
        <div v-else class="logo-placeholder">
          <i class="bi bi-image"></i>
        </div>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Página Inicial</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/projetos" class="nav-link">Projetos</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Links
            </a>
            <div
              class="dropdown-menu mega-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <div class="container">
                <div class="row">
                  <div class="col-md-7">
                    <div class="list-group list-group-flush">
                      <router-link
                        to="/pontelink"
                        class="list-group-item list-group-item-action mega-menu-item"
                      >
                        <div class="d-flex w-100 align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="icon-placeholder">
                              <i class="bi bi-link-45deg"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="mb-0">
                              PonteLink <i class="bi bi-arrow-right"></i>
                            </h6>
                            <small>Gestão de oficinas do projeto</small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/datahub"
                        class="list-group-item list-group-item-action mega-menu-item"
                      >
                        <div class="d-flex w-100 align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="icon-placeholder">
                              <i class="bi bi-hdd-stack"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="mb-0">
                              DataHub <i class="bi bi-arrow-right"></i>
                            </h6>
                            <small>Organize seus arquivos com um click!</small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/galeria"
                        class="list-group-item list-group-item-action mega-menu-item"
                      >
                        <div class="d-flex w-100 align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="icon-placeholder">
                              <i class="bi bi-briefcase"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="mb-0">
                              <router-link class="link" to="/galeria"
                                >Ver Galeria</router-link
                              ><i class="bi bi-arrow-right"></i>
                            </h6>
                            <small>Navegue pelos momentos.</small>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                  <div class="col-md-5 border-start">
                    <h6 class="dropdown-header">Ponte Digital</h6>
                    <router-link class="dropdown-item" to="/sobre-nos"
                      >Sobre Nós</router-link
                    >
                    <router-link class="dropdown-item" to="/posts"
                      >Posts</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <a href="#footer" class="nav-link">Contato</a>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <form class="d-flex">
            <input
              class="form-control me-2 search-input"
              type="search"
              placeholder="&#xF52A; Buscar Projetos"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import srcLogo from "@/assets/logoPd.svg";
export default {
  name: "AppNavbar",
  data() {
    return {
      logoSrc: srcLogo,
    };
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss";

.navbar-background {
  background: rgb(21, 23, 42);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0;
}

.navbar-brand {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 80px;
}

.navbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;

  .navbar-toggler {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    padding: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(172, 0, 255, 0.1);
      border-color: rgba(6, 68, 216, 0.3);
    }
    
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.7)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }
}

.logo-placeholder {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
  }
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  padding: 1.5rem 1.25rem !important;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg,
      rgba(183, 0, 255, 0.8),
      rgba(6, 64, 202, 0.8)
    );
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
}

.nav-link.active,
.nav-link:hover {
  color: rgba(255, 255, 255, 1) !important;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  
  &::after {
    width: 100%;
  }
}

.search-input {
  font-family: "Bootstrap-icons", var(--font-family-base);
  border-radius: 1rem;
  background: rgba(15, 16, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  color: #fff;
  padding: 0.75rem 1.25rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    background: rgba(25, 27, 45, 0.9);
    border-color: rgba(120, 100, 255, 0.5);
    box-shadow: 0 0 20px rgba(120, 100, 255, 0.2);
    color: #fff;
  }
}

/* ESTILOS ESPECÍFICOS PARA O MEGA MENU */
.dropdown-toggle::after {
  display: none;
}

.mega-menu.dropdown-menu {
  width: 550px;
  padding: 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 30, 0.95),
    rgba(30, 30, 45, 0.95)
  );
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(120, 100, 255, 0.1);
}

.link {
  list-style-type: none;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  }
}

.dropdown:hover .mega-menu {
  display: block;
  margin-top: 0;
  animation: fadeIn 0.3s ease;
}

.mega-menu-item {
  border: 0 !important;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background: rgba(30, 32, 55, 0.5);
  margin-bottom: 0.5rem;
  text-decoration: none;

  h6 {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9) !important;
    margin-bottom: 0.25rem;
  }
  
  small {
    color: rgba(255, 255, 255, 0.6);
  }

  &:hover, &:focus, &:active {
    background: rgba(120, 100, 255, 0.15) !important;
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(120, 100, 255, 0.1);
    color: #fff !important;
  }
  
  &.list-group-item-action:hover {
    background: rgba(120, 100, 255, 0.15) !important;
    color: #fff !important;
  }
}

.icon-placeholder {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(50, 50, 70, 0.5);
  border-radius: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  
  i {
    font-size: 1.2rem;
    background: linear-gradient(135deg, #fff, #a0a0ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.dropdown-header {
  font-weight: 600;
  font-size: 1.2rem;
  padding-top: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.dropdown-item {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  
  &:hover, &:focus, &:active {
    background: rgba(120, 100, 255, 0.15) !important;
    color: #fff !important;
    transform: translateX(5px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
