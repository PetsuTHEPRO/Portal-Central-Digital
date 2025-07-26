<template>
  <nav class="navbar navbar-expand-lg navbar-background py-0">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          v-if="logoSrc"
          :src="logoSrc"
          alt="Ponte Digital"
          height="90"
        />
        <div v-else class="logo-placeholder">
          <i class="bi bi-image"></i>
        </div>
      </a>
      <div class="collapse navbar-collapse">
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
                            <small>Lorem ipsum dolor sit amet</small>
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
                            <small>A pellentesque sit amet</small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/projetos"
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
                    <h6 class="dropdown-header">Company</h6>
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
            <router-link to="/contato" class="nav-link">Contato</router-link>
          </li>
        </ul>
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
  </nav>
</template>

<script>
import srcLogo from "@/assets/logo.svg";
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
  background-color: var(--color-surface);
}

.navbar {
  border-bottom: 1px solid var(--color-border);
}

.logo-placeholder {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: var(--color-secondary-text);
}

.nav-link {
  color: #fff !important;
  font-weight: 500;
}

.nav-link.active,
.nav-link:hover {
  color: var(--color-primary-text);
}

.search-input {
  font-family: "Bootstrap-icons", var(--font-family-base); // Permite usar o ícone no placeholder
  border-radius: 0.375rem;
  background-color: var(--color-background);
  border-color: var(--color-border);
}

/* ESTILOS ESPECÍFICOS PARA O MEGA MENU */
.dropdown-toggle::after {
  display: none;
}

.mega-menu.dropdown-menu {
  width: 550px;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.link{
  list-style-type: none;
}

.dropdown:hover .mega-menu {
  display: block;
  margin-top: 0;
}

.mega-menu-item {
  border: 0 !important;
  padding: 0.75rem;
  border-radius: 0.375rem;

  h6 {
    font-weight: 600;
    color: var(--color-surface) !important;
  }
  small {
    color: var(--color-secondary-text);
  }

  &:hover {
    background-color: var(--color-surface);
  }
}

.icon-placeholder {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  border-radius: 0.375rem;
  color: var(--color-secondary-text);
  border: 1px solid var(--color-border);
}

.dropdown-header {
  font-weight: 600;
  font-size: 0.9rem;
  padding-top: 0.5rem;
  color: var(--color-secondary-text);
}

.dropdown-item {
  font-weight: 500;
}
</style>
