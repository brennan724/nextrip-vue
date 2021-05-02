<template>
  <div id="byStop">
    <form class="md-layout" @submit.prevent="validateStop">
      <v-text-field
        id="stop-input"
        v-model="stopNum"
        label="Stop #"
      ></v-text-field>
      <v-btn depressed type="submit" color="primary">Submit</v-btn>
      <!-- <md-field class="input-field md-layout-item">
        <label for="stop-input">Stop #</label>
        <md-input id="stop-input" v-model="stopNum"></md-input>
      </md-field> -->
      <!-- <md-button type="submit" class="md-primary md-raised md-layout-item"
        >Submit</md-button
      > -->
    </form>
    <div class="error" v-if="error !== undefined">
      {{ error }}
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// const url = `https://svc.metrotransit.org/nextripv2`;
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
        // console.log(this.stopNum);
        this.getRouteStopInfo();
      }
    },
    async getRouteStopInfo() {
      try {
        // console.log(fetchFromStopNum(this.stopNum));
        this.displayInfo = await fetchFromStopNum(this.stopNum);
        this.error = undefined;
        this.$emit("stopInfo", this.displayInfo);
      } catch (e) {
        console.log(e);
        this.error = "Invalid Stop Number";
      }
      // axios
      //   .get(`${url}/${this.stopNum}`)
      //   .then((response) => {
      //     this.error = undefined;
      //     console.log(response.data);
      //     this.displayInfo = response.data;
      //     this.$emit("stopInfo", this.displayInfo);
      //   })
      //   .catch(() => {
      //     this.error = "Invalid Stop Number";
      //   });
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