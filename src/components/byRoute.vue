<template>
  <div id="byRoute">
    <dropdown :dropdownData="routeData" @clicked="getDirections" />
    <dropdown
      :dropdownData="directionData"
      @clicked="getStops"
      v-show="route !== ''"
    />
    <dropdown
      :dropdownData="stopData"
      @clicked="getRouteStopInfo"
      v-show="direction !== ''"
    />
    <div class="error" v-if="error !== undefined">
      {{ error }}
    </div>
  </div>
</template>

<script>
import dropdown from "./dropdown.vue";
import axios from "axios";

const url = `https://svc.metrotransit.org/nextripv2`;
export default {
  components: { dropdown },
  name: "ByRoute",
  data() {
    return {
      routeData: [],
      route: "",
      directionData: [],
      direction: "",
      stopData: [],
      stop: "",
      displayInfo: undefined,
      error: undefined,
      display: ["route"],
    };
  },
  methods: {
    getRoutes() {
      axios
        .get(`${url}/routes`)
        .then((response) => {
          this.routeData = response.data.map((route) => {
            return { id: route.route_id, label: route.route_label };
          });
          console.log(this.routeData);
        })
        .catch(() => {
          this.error = "Failed to fetch Routes";
        });
    },
    getDirections(route_id) {
      axios
        .get(`${url}/directions/${route_id}`)
        .then((response) => {
          this.route = route_id;
          console.log(this.route);
          this.directionData = response.data.map((direction) => {
            return {
              id: direction.direction_id,
              label: direction.direction_name,
            };
          });
          console.log(this.directionData);
        })
        .catch(() => {
          this.error = "Failed to fetch Directions";
        });
    },
    getStops(direction_id) {
      axios
        .get(`${url}/stops/${this.route}/${direction_id}`)
        .then((response) => {
          this.direction = direction_id;
          console.log(this.direction);
          this.stopData = response.data.map((stop) => {
            return { id: stop.place_code, label: stop.description };
          });
          console.log(this.stopData);
        })
        .catch(() => {
          this.error = "Failed to fetch Stops";
        });
    },
    getRouteStopInfo(stop_id) {
      axios
        .get(`${url}/${this.route}/${this.direction}/${stop_id}`)
        .then((response) => {
          this.stop = stop_id;
          console.log(this.stop);
          console.log(response.data);
          this.displayInfo = response.data;
          this.$emit("routeInfo", this.displayInfo);
        })
        .catch(() => {
          this.error = "Failed to fetch route info for given stop";
        });
    },
  },
  mounted() {
    this.getRoutes();
  },
};
</script>

