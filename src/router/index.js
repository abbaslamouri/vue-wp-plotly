import { createWebHistory, createRouter } from "vue-router";
import ChartLibrary from "../views/ChartLibrary.vue";
import Settings from "../views/Settings.vue";
import Support from "../views/Support.vue";

const routes = [
  {
    path: "/wp-admin/admin.php?page=yrl_wp_vue_plotly_charts",
    name: "Chart Library",
    component: ChartLibrary,
    redirect: '/'
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/support",
    name: "Support",
    component: Support
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;