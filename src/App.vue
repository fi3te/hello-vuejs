<template>
  <div id="app">
    <the-header></the-header>
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import TheHeader from "./components/TheHeader.vue";
import { routes } from "./router/index";

import Vue from "vue";

export default Vue.extend({
  components: {
    TheHeader
  },
  data: () => {
    return {
      transitionName: 'slide-right',
      routeNames: routes.map(route => route.name)
    }
  },
  watch: {
  '$route' (to, from) {
    this.transitionName = this.routeNames.indexOf(from.name) < this.routeNames.indexOf(to.name) ? 'slide-right' : 'slide-left'
  }
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

  $translation: 100px;
  $slideInDuration: 200ms;
  $slideOutDuration: 100ms;

  .slide-right-enter-active {
    animation: slide-right-in $slideInDuration ease forwards;
  }

  .slide-right-leave-active {
    animation: slide-left-out $slideOutDuration ease forwards;
  }

  .slide-left-enter-active {
    animation: slide-left-in $slideInDuration ease forwards;
  }

  .slide-left-leave-active {
    animation: slide-right-out $slideOutDuration ease forwards;
  }

  @keyframes slide-right-in {
    from {
      transform: translateX($translation);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-$translation);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX($translation);
      opacity: 0;
    }
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(-$translation);
      opacity: 0;
    }
  }
}
</style>
