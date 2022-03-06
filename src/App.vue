<template>
  <AppNavigation />
  <!-- <AppHeader /> -->
  <!-- <RouterView /> -->
  <!-- <AppFooter /> -->
</template>

<script lang="ts">
import { useClient } from 'villus'
import { defineComponent } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'
import AppHeader from './components/AppHeader.vue'
import { CONFIG } from './config'

export default defineComponent({
  name: 'App',
  components: {
    // AppHeader,
    AppNavigation,
    // AppFooter,
  },
  setup () {
    // useClient({
    //   url: CONFIG.API_HOST,
    // });
  },
})
</script>
