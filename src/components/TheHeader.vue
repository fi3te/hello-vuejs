<template>
  <nav class="nav">
    <span class="brand">{{ $t("the-header.cake-list") }}</span>
    <div class="tabs">
      <router-link to="/" active-class="active" exact>{{ $t("the-header.home") }}</router-link>
      <router-link to="/add-entry" active-class="active">{{ $t("the-header.add-entry") }}</router-link>
      <router-link to="/list" active-class="active">{{ $t("the-header.list") }}</router-link>
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

@media (max-width: 599px) {
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