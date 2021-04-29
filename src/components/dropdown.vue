<template>
  <div id="dropdown">
    <md-field class="dropdownButton">
      <md-select v-model="selected">
        <md-option
          v-for="item in populateDropdown"
          :key="item.id"
          :value="item.id"
        >
          {{ item.label }}
        </md-option>
      </md-select>
    </md-field>
    <!-- <md-button class="dropdownButton" @click="toggle">
      {{ selected || "Choose a value" }}
    </md-button>
    <div class="dropdownValues" v-if="active">
      <div
        class="dropdownValue"
        v-for="item in populateDropdown"
        :key="item.id"
        @click="setDropdown(item)"
      >
        {{ item.label }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["dropdownData"],
  data() {
    return {
      active: false,
      selected: "",
    };
  },
  computed: {
    populateDropdown() {
      return this.dropdownData;
    },
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
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
  border: 2px solid black;
  width: 20em;
  position: float;
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