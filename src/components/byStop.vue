<template>
  <div id="byStop">
    <form class="md-layout" @submit.prevent="validateStop">
      <v-text-field
        id="stop-input"
        v-model="stopNum"
        label="Stop #"
      ></v-text-field>
      <v-btn depressed type="submit" color="primary">Submit</v-btn>
    </form>
    <div class="error" v-if="error !== undefined">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { fetchFromStopNum } from "../services/fetchers";

export default {
  name: "ByRoute",
  data() {
    return {
      stopNum: undefined,
      error: undefined,
    };
  },
  methods: {
    async validateStop() {
      if (isNaN(this.stopNum)) {
        this.error = "Stop must be a number";
      } else {
        this.getRouteStopInfo();
      }
    },
    // this not take into account network outages
    async getRouteStopInfo() {
      try {
        this.displayInfo = await fetchFromStopNum(this.stopNum);
        this.error = undefined;
        this.$emit("stopInfo", this.displayInfo);
      } catch (e) {
        console.log(e);
        this.error = "Invalid Stop Number";
      }
    },
  },
};
</script>

<style>
.md-layout {
  width: 20%;
  margin: auto;
}

.error {
  color: white;
  font-size: 30px;
  background-color: red;
  height: 3em;
  width: 50%;
  margin: auto;
  padding-top: 1em;
}
</style>