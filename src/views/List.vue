<template>
  <div class="row">
    <table class="col-12">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Date</th>
          <th>End date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>{{ entry.name }}</td>
          <td>
            <pre>{{ entry.description }}</pre>
          </td>
          <td>{{ entry.date | date }}</td>
          <td>{{ entry.endDate | date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Entry } from "@/shared/entry";

@Component
export default class List extends Vue {
  entries: Entry[] = [];

  created(): void {
    this.entries = this.$store.getters.sortedEntries;
  }
}
</script>
