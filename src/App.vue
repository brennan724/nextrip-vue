<template>
  <div id="app">
    Welcome to the NexTrip API Knock-off
    <dropdown :dropdownData="routeData" @clicked="setRoute" />
    <dropdown
      :dropdownData="directionData"
      @clicked="setDirection"
      v-show="route !== ''"
    />
    <dropdown
      :dropdownData="stopData"
      @clicked="setStop"
      v-show="direction !== ''"
    />
  </div>
</template>

<script>
import dropdown from "./components/dropdown.vue";
import axios from "axios";

const url = `https://svc.metrotransit.org/nextripv2`;
export default {
  components: { dropdown },
  name: "App",
  data: function () {
    return {
      routeData: [],
      route: "",
      directionData: [],
      direction: "",
      stopData: [],
      stop: "",
      displayInfo: {},
    };
  },
  methods: {
    setRoute(route_id) {
      this.route = route_id;
      console.log(this.route);
      this.getDirections();
    },
    setDirection(direction_id) {
      this.direction = direction_id;
      console.log(this.direction);
      this.getStops();
    },
    setStop(stop_id) {
      this.stop = stop_id;
      console.log(this.stop);
      this.getRouteStopInfo();
    },
    getRoute() {
      axios
        .get(`${url}/routes`)
        .then((response) => {
          this.routeData = response.data.map((route) => {
            return { id: route.route_id, label: route.route_label };
          });
          console.log(this.routeData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDirections() {
      axios.get(`${url}/directions/${this.route}`).then((response) => {
        this.directionData = response.data.map((direction) => {
          return {
            id: direction.direction_id,
            label: direction.direction_name,
          };
        });
        console.log(this.directionData);
      });
    },
    getStops() {
      axios
        .get(`${url}/stops/${this.route}/${this.direction}`)
        .then((response) => {
          this.stopData = response.data.map((stop) => {
            return { id: stop.place_code, label: stop.description };
          });
          console.log(this.stopData);
        });
    },
    getRouteStopInfo() {
      axios
        .get(`${url}/${this.route}/${this.direction}/${this.stop}`)
        .then((response) => {
          console.log(response.data);
          this.displayInfo = response.data;
        });
    },
  },
  mounted() {
    this.getRoute();
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
</style>
