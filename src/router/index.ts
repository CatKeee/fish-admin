import { createRouter, createWebHistory } from "vue-router";
import { beforeGuard, afterGuard } from "./guard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login-index",
      component: () => import("../views/login/index.vue"),
      meta: {
        title: "登录",
      },
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/error/404.vue"),
      meta: {
        title: "找不到该页面",
      },

    }
  ],
});

router.beforeEach(beforeGuard);
router.afterEach(afterGuard);

export default router;
