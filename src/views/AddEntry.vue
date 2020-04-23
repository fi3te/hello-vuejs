<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <form class="row" @submit.prevent="saveEntry">
        <div class="col-12">
          <label>{{ $t("add-entry.name") }}</label>
          <ValidationProvider name="newEntry.name" rules="name-required" v-slot="{ errors }">
            <input
              type="text"
              autocomplete="off"
              v-model.trim="newEntry.name"
              :class="{'bd-error': errors.length}"
              ref="nameInput"
            />
            <p class="text-error">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="col-12">
          <label>{{ $t("add-entry.description") }}</label>
          <ValidationProvider
            name="newEntry.description"
            rules="description-required"
            v-slot="{ errors }"
          >
            <textarea
              type="text"
              autocomplete="off"
              v-model.trim="newEntry.description"
              :class="{'bd-error': errors.length}"
            ></textarea>
            <p class="text-error">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="col-6 checkbox-container">
          <input type="checkbox" v-model="past" />
          <label>{{ $t("add-entry.past") }}</label>
        </div>
        <div class="col-6 checkbox-container">
          <input type="checkbox" v-model="otherPeriod" />
          <label>{{ $t("add-entry.change-period") }}</label>
        </div>
        <div class="col-12" v-if="past">
          <label>{{ $t("add-entry.date") }}</label>
          <datepicker :format="formatDate" v-model="date" calendar-class="entry-date-calendar"></datepicker>
        </div>
        <div class="col-12" v-if="otherPeriod">
          <label>{{ $t("add-entry.period-in-month") }}</label>
          <ValidationProvider
            name="newEntry.periodInMonths"
            rules="period-required|period-between"
            v-slot="{ errors }"
          >
            <input
              type="number"
              min="1"
              max="36"
              v-model.number="newEntry.periodInMonths"
              :class="{'bd-error': errors.length}"
            />
            <p class="text-error">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="col-12">
          <button
            type="submit"
            class="button primary add-entry-button"
            :disabled="invalid"
          >{{ $t("add-entry.save") }}</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import { ValidationProvider } from "vee-validate";
import { Watch } from "vue-property-decorator";

import { NewEntry } from "../shared/entry";
import { ADD_NEW_ENTRY, ADD_OLD_ENTRY } from "../store/index";
import Datepicker from "vuejs-datepicker";
import { formatDate } from "@/shared/date-util";
import { i18n } from "../i18n";

extend("name-required", {
  ...required,
  message: i18n.tc("add-entry.validation-error.name-required")
});

extend("description-required", {
  ...required,
  message: i18n.tc("add-entry.validation-error.description-required")
});

extend("period-required", {
  ...required,
  message: i18n.tc("add-entry.validation-error.period-required")
});

extend("period-between", value => {
  if (typeof value == "number" && value >= 1 && value <= 36) {
    return true;
  } else {
    return i18n.tc("add-entry.validation-error.period-between-1-and-36");
  }
});

@Component({
  components: {
    ValidationProvider,
    Datepicker
  }
})
export default class AddEntry extends Vue {
  newEntry: NewEntry = {
    name: "",
    description: "",
    periodInMonths: 3
  };
  past = false;
  otherPeriod = false;
  date = new Date();

  formatDate(date: Date): string {
    return formatDate(date);
  }

  @Watch("otherPeriod")
  onChangeOtherPeriod(value: boolean): void {
    if (!value) {
      this.newEntry.periodInMonths = 3;
    }
  }

  saveEntry() {
    if (this.past) {
      this.$store.dispatch(ADD_OLD_ENTRY, {
        ...this.newEntry,
        date: this.date
      });
    } else {
      this.$store.dispatch(ADD_NEW_ENTRY, this.newEntry);
    }
    this.newEntry.name = "";
    this.newEntry.description = "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs.form.reset();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs.nameInput.focus();
  }
}
</script>

<style lang="scss" scoped>
.row {
  align-items: center;
}

@media (max-width: 599px) {
  .col-6 {
    flex: 0 0 calc(50% - var(--grid-gutter));
  }
}

label {
  font-weight: bold;
}

textarea {
  resize: vertical;
}

.checkbox-container {
  * {
    vertical-align: middle;
  }
}

.add-entry-button {
  float: right;
}

::v-deep .entry-date-calendar {
  .cell:not(.blank):not(.disabled):not(.day-header):hover {
    border-color: var(--color-primary) !important;
  }

  .cell.selected,
  .cell.selected:hover {
    background: var(--color-primary);
  }
}
</style>