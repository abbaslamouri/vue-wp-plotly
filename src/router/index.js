import { createWebHistory, createRouter } from "vue-router";
import ChartLibrary from "../views/ChartLibrary.vue";
import Settings from "../views/Settings.vue";
import Support from "../views/Support.vue";

const routes = [
  {
    path: "/",
    name: "Chart Library",
    component: {default: ChartLibrary}
  },
  {
    path: "/settings",
    name: "Settings",
    component: {default: Settings}
  },
  {
    path: "/support",
    name: "Support",
    component: {default: Support}
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;