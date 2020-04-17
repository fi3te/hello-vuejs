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
  }
}

@media (max-width: 600px) {
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
      padding-left: 30%;
    }

    td:before {
      position: absolute;
      left: 15px;
      width: 30%;
      font-weight: bold;
    }

    td:nth-of-type(1):before {
      content: "Name";
    }
    td:nth-of-type(2):before {
      content: "Description";
    }
    td:nth-of-type(3):before {
      content: "Date";
    }
    td:nth-of-type(4):before {
      content: "End date";
    }
  }
}
</style>