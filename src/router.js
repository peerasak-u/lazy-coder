import * as VueRouter from "vue-router";
import Home from "./components/Home.vue";

const routes = [{ path: "/", component: Home }];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
