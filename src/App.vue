<template>
  <div id="app">
    <the-header></the-header>
    <router-view />
  </div>
</template>

<script lang="ts">
import TheHeader from "./components/TheHeader.vue";

import Vue from "vue";

export default Vue.extend({
  components: {
    TheHeader
  }
});
</script>

<style lang="scss">
:root {
  --color-primary: #42b983;
  --color-darkGrey: #2c3e50;
  --color-error: #f66;
  --font-family-sans: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .row {
    max-width: 800px;
    margin: auto;
    padding: 20px 0;
  }
}
</style>
