<template>
  <AppHeader />
  <AppNavigation />
  <RouterView />
  <AppFooter />
</template>

<script lang="ts">
import { useClient } from 'villus'
import { defineComponent } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'
import AppHeader from './components/AppHeader.vue'
import { CONFIG } from './config'
import 'virtual:windi.css'

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
    AppFooter,
    AppHeader,
  },
  setup() {
    // useClient({
    //   url: CONFIG.API_HOST,
    // });
  },
})
</script>

<style lang="scss">
@media screen and (min-width: 75rem) {
  .container {
    max-width: 75rem;
  }
}

*:focus {
  outline: none !important;
  box-shadow: unset !important;;
}

// * {
//   outline-color: red;
//   outline-style: solid;
// }
</style>
