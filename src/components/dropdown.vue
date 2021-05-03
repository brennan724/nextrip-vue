<template>
  <div id="dropdown">
    <v-select
      name="dropdown"
      v-model="dropdownValue"
      :items="populateDropdown"
      item-text="label"
      item-value="id"
      :label="label"
    >
    </v-select>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["dropdownData", "category", "selected"],
  data() {
    return {
      label: `Select ${this.category}`,
    };
  },
  computed: {
    populateDropdown() {
      console.log(this.dropdownData);
      return this.dropdownData;
    },
    dropdownValue: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit("clicked", val);
      },
    },
  },
};
</script>

<style>
#dropdown {
  width: 20%;
  margin: auto;
}
</style>