<template>
  <h1>Intercative Wp Vue Plotly Charts</h1>

  <div>
    {{ charts }}
    {{ sheets }}
  </div>

  <div id="nav">
      <router-link to="/">Chart Library</router-link>
      <router-link to="/settings">Settings</router-link>
      <router-link to="/support">Support</router-link>
  </div>
  <router-view />

</template>

<script>
  
import { ref, onMounted } from 'vue'

export default {
  setup () {
    
    let payload = ref([])

    const charts = ref(yrl_wp_vue_plotly_charts_obj.charts)
    const sheets = ref(yrl_wp_vue_plotly_charts_obj.sheets)

    console.log(yrl_wp_vue_plotly_charts_obj)
    // onMounted(async () => {
    //   const response = await fetch( `${yrl_wp_vue_plotly_charts_obj.wpRestUrl}${yrl_wp_vue_plotly_charts_obj.plugin}/v1/charts`, {
    //     method: 'GET',
    //     // body: body,
    //     headers: {'X-WP-Nonce': yrl_wp_vue_plotly_charts_obj.wpRestNonce }
    //   } )
    //   payload.value = await response.json()
    //   console.log(payload.value)
    // })
  
    return { charts, sheets }
  }
}


</script>

<style lang="scss" scoped>

</style>

