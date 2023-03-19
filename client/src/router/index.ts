import { createRouter, createWebHistory } from "vue-router";
import indexPage from "@/pages/IndexPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: indexPage,
    },
    {
      path: "/todo/:id",
      name: "todo",
      component: () => import("../pages/TodoPage.vue"),
    },
  ],
});

export default router;
