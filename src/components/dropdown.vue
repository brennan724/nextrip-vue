<template>
  <div id="dropdown">
    <md-field class="dropdownButton">
      <label for="dropdown-field">Select {{ category }}</label>
      <md-select id="dropdown-field" v-model="dropdownValue" name="foo">
        <md-option
          v-for="item in populateDropdown"
          :key="item.id"
          :value="item.id"
        >
          {{ item.label }}
        </md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["dropdownData", "category", "selected"],
  data() {
    return {};
  },
  computed: {
    populateDropdown() {
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

<style scoped>
.dropdownButton {
  width: 20%;
  margin: auto;
}
</style>