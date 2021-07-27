import { createApp } from 'vue'

import AdminApp from './components/AdminApp.vue'
import router from '../router'

createApp(AdminApp).use(router).mount(`#${yrl_wp_vue_plotly_charts_obj.prefix}__admin`)
// createApp(AdminApp).mount(`#${yrl_wp_vue_plotly_charts_obj.prefix}__admin`)