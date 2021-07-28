import { createWebHistory, createWebHashHistory, createRouter } from 'vue-router';
import ChartLibrary from '../views/ChartLibrary.vue';
import Settings from '../views/Settings.vue';
import Support from '../views/Support.vue';

const routes = [
  {
    path: '/',
    name: 'Chart Library',
    component: ChartLibrary,
    // alias: '/wp-admin/admin.php?page=yrl_wp_vue_plotly_charts'
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    // alias: '/wp-admin/admin.php?page=yrl_wp_vue_plotly_charts/settings'
  },
  {
    path: '/support',
    name: 'Support',
    component: Support,
    // alias: '/wp-admin/admin.php?page=yrl_wp_vue_plotly_charts/support'
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;