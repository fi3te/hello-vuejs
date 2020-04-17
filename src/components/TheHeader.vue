<template>
  <nav class="nav">
    <span class="brand">Cake list</span>
    <div class="tabs">
      <router-link to="/" active-class="active" exact>Home</router-link>
      <router-link to="/add" active-class="active">Add entry</router-link>
      <router-link to="/list" active-class="active">List</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="scss" scoped>
.nav {
  padding: 30px;

  a {
    font-weight: bold;
  }
  .active {
    color: unset;
  }
}

@media (max-width: 600px) {
  .nav {
    padding: 10px;
    flex-direction: column;
    align-items: center;

    .tabs {
      overflow-x: auto;
      max-width: 100%;
      padding-bottom: 5px;
    }
  }
}
</style>