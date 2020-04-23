<template>
  <div class="row">
    <table class="col-12" v-if="!empty">
      <thead>
        <tr>
          <th>{{ $t("list.name") }}</th>
          <th>{{ $t("list.description") }}</th>
          <th>{{ $t("list.date") }}</th>
          <th>{{ $t("list.end-date") }}</th>
          <th>{{ $t("list.actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>
            <div class="header-replacement">{{ $t("list.name") }}</div>
            <div class="content">{{ entry.name }}</div>
          </td>
          <td>
            <div class="header-replacement">{{ $t("list.description") }}</div>
            <pre class="content">{{ entry.description }}</pre>
          </td>
          <td>
            <div class="header-replacement">{{ $t("list.date") }}</div>
            <div class="content">{{ entry.date | date }}</div>
          </td>
          <td>
            <div class="header-replacement">{{ $t("list.end-date") }}</div>
            <div class="content">{{ entry.endDate | date }}</div>
          </td>
          <td>
            <div class="header-replacement">{{ $t("list.actions") }}</div>
            <div class="content">
              <button
                class="button error"
                @click="deleteEntry($event, entry.id)"
              >{{ $t("list.delete") }}</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="col-12" v-else>{{ $t("list.no-entries") }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Entry } from "@/shared/entry";
import { DELETE_ENTRY } from "../store";

@Component
export default class List extends Vue {
  get entries(): Entry[] {
    return this.$store.getters.sortedEntries;
  }

  get empty(): boolean {
    return this.entries.length === 0;
  }

  deleteEntry(event: MouseEvent, id: number): void {
    this.$store.dispatch(DELETE_ENTRY, id);
  }
}
</script>

<style lang="scss" scoped>
pre {
  background-color: unset;
  font-family: unset;
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

tr {
  border-bottom: 1px solid var(--color-lightGrey);

  td {
    min-width: 100px;

    .header-replacement {
      display: none;
    }
  }
}

@media (max-width: 599px) {
  table,
  tbody,
  tr,
  th,
  td {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    border-bottom: 2px solid var(--color-lightGrey);

    td {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      .header-replacement {
        display: block;
        font-weight: bold;
        flex-basis: 30%;
        min-width: 120px;
      }

      .content {
        flex-basis: 70%;
      }
    }
  }
}
</style>