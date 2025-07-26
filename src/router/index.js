import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import PostView from "../views/PostView.vue";
import BlogView from "../views/BlogView.vue";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // 👇 2. Adicione o novo objeto de rota aqui
    {
      path: "/projetos",
      name: "projetos",
      component: ProjectsView,
    },
    {
      // Rota para um post individual. :id é um parâmetro dinâmico.
      path: "/posts/:id",
      name: "posts-details",
      component: PostView,
      props: true,
    },
    {
      path: "/posts", // 2. Defina o caminho para a página
      name: "posts",
      component: BlogView, // 3. Associe com o componente
    },
    {
      path: "/galeria",
      name: "galeria",
      component: () => import("../views/GalleryView.vue"),
    },
    {
      path: "/sobre-nos",
      name: "sobre-nos",
      component: AboutView,
    },
  ],
  // 👇 ADICIONE ESTA FUNÇÃO 👇
  scrollBehavior(to, from, savedPosition) {
    // Se a rota tiver um hash (ex: #nossas-metricas), role até ele
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth", // Rolagem suave!
      };
    }
    // Se o usuário clicou em "voltar", volta para a posição salva
    if (savedPosition) {
      return savedPosition;
    }
    // Para qualquer outra navegação, vai para o topo da página
    return { top: 0 };
  },
});

export default router;
