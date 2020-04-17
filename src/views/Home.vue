<template>
  <div class="row">
    <div class="col card count-card">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/49/Cartoon_Happy_Birthday_Cake.svg"
        width="150"
      />
      <span>{{ count }}</span>
    </div>
    <div class="col card">
      <header>
        <h4>Next cake</h4>
      </header>
      {{ earliestEndDate | date }}
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Home extends Vue {
  get count() {
    return this.$store.getters.count;
  }
  get earliestEndDate() {
    return this.$store.getters.earliestEndDateEntry.endDate;
  }
}
</script>

<style lang="scss" scoped>
.row {
  align-items: stretch;
}

.count-card {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 10px;
  }

  span {
    font-size: 10rem;
  }
}
</style>
