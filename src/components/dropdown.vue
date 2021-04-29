<template>
  <div id="dropdown">
    <md-field class="dropdownButton">
      <label for="selected">Select</label>
      <md-select v-model="selected" name="foo">
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
  props: ["dropdownData"],
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    populateDropdown() {
      return this.dropdownData;
    },
  },
  watch: {
    selected() {
      console.log(this.selected);
      // this.selected = item.label;
      // this.$emit("clicked", item.id);
      this.$emit("clicked", this.selected);
    },
  },
  methods: {
    setDropdown(item) {
      this.selected = item.label;
      this.$emit("clicked", item.id);
      this.toggle();
    },
  },
};
</script>

<style scoped>
.dropdownButton {
  width: 20%;
  margin: auto;
}
.dropdownValues {
  border: 2px solid black;
  width: 10em;
  position: float;
}
.dropdownValue:hover {
  background: lightgray;
}
</style>