<template>
  <div id="app">
    <h1>Welcome to the NexTrip API Knock-off</h1>
    <div class="searchType">
      <div
        class="routeButton"
        :class="this.searchPattern === 'route' ? 'selected' : undefined"
        @click="changeSearch('route')"
      >
        By Route
      </div>
      <div
        class="stopButton"
        :class="this.searchPattern === 'stop' ? 'selected' : undefined"
        @click="changeSearch('stop')"
      >
        By Stop #
      </div>
    </div>
    <by-route
      class="routeSelection"
      @routeInfo="setDisplayInfo"
      v-if="this.searchPattern === 'route'"
    />
    <by-stop
      class="stopSelection"
      @stopInfo="setDisplayInfo"
      v-if="this.searchPattern === 'stop'"
    />
    <display
      class="display"
      :displayInfo="this.displayInfo"
      v-if="displayInfo !== undefined"
    />
  </div>
</template>

<script>
import byRoute from "./components/byRoute.vue";
import byStop from "./components/byStop.vue";
import display from "./components/display.vue";

export default {
  components: { byRoute, byStop, display },
  name: "App",
  data() {
    return {
      displayInfo: undefined,
      searchPattern: "route",
    };
  },
  methods: {
    setDisplayInfo(val) {
      this.displayInfo = val;
      console.log(this.displayInfo);
    },
    changeSearch(val) {
      this.searchPattern = val;
      this.displayInfo = undefined;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.md-layout-item {
  width: 10em;
}

.searchType {
}
.routeButton {
  display: inline-block;
  border: 1px solid black;
  width: 7em;
  cursor: pointer;
}
.stopButton {
  display: inline-block;
  border: 1px solid black;
  width: 7em;
  cursor: pointer;
}

.selected {
  background-color: blue;
  color: white;
}

.display {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 80%;
  margin: auto;
}
</style>
