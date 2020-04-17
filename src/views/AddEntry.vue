<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <form class="row" @submit.prevent="saveEntry">
        <div class="col-12">
          <label>Name</label>
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
          <label>Description</label>
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
        <div class="col-12" v-if="otherPeriod">
          <label>Period in month</label>
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
        <div class="col-6 other-period-container">
          <input type="checkbox" v-model="otherPeriod" />
          <label>Change period</label>
        </div>
        <div class="col-6">
          <button type="submit" class="button primary add-entry-button" :disabled="invalid">Save</button>
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
import { ADD_ENTRY } from "../store/index";

extend("name-required", {
  ...required,
  message: "The name is required!"
});

extend("description-required", {
  ...required,
  message: "The description is required!"
});

extend("period-required", {
  ...required,
  message: "The period is required!"
});

extend("period-between", value => {
  if (typeof value == "number" && value >= 1 && value <= 36) {
    return true;
  } else {
    return "The period has to be between 1 and 36 months!";
  }
});

@Component({
  components: {
    ValidationProvider
  }
})
export default class AddEntry extends Vue {
  newEntry: NewEntry = {
    name: "",
    description: "",
    periodInMonths: 3
  };
  otherPeriod = false;

  @Watch("otherPeriod")
  onChangeOtherPeriod(value: boolean): void {
    if (!value) {
      this.newEntry.periodInMonths = 3;
    }
  }

  saveEntry() {
    this.$store.dispatch(ADD_ENTRY, this.newEntry);
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

.other-period-container {
  * {
    vertical-align: middle;
  }
}

.add-entry-button {
  float: right;
}
</style>