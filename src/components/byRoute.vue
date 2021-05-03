<template>
  <div id="byRoute">
    <dropdown
      :dropdownData="routeData"
      :selected="route"
      @clicked="getDirections"
      :category="category[0]"
    />
    <dropdown
      :dropdownData="directionData"
      :selected="direction"
      :category="category[1]"
      @clicked="getStops"
      v-show="route !== ''"
    />
    <dropdown
      :dropdownData="stopData"
      :selected="stop"
      :category="category[2]"
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
import {
  fetchDirections,
  fetchRoutes,
  fetchRouteStopInfo,
  fetchStops,
} from "../services/fetchers";

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
      category: ["route", "direction", "stop"],
    };
  },
  methods: {
    async getRoutes() {
      try {
        const response = await fetchRoutes();
        this.routeData = response.map((route) => {
          return { id: route.route_id, label: route.route_label };
        });
      } catch (e) {
        console.log(e);
        this.error = "Failed to fetch Routes";
      }
    },
    async getDirections(route_id) {
      if (route_id === "") {
        return;
      }
      try {
        const response = await fetchDirections(route_id);
        this.route = route_id;
        this.direction = "";
        this.stop = "";
        this.directionData = response.map((direction) => {
          return {
            id: direction.direction_id,
            label: direction.direction_name,
          };
        });
      } catch (e) {
        console.log(e);
        this.error = "Failed to fetch Directions";
      }
    },
    async getStops(direction_id) {
      if (direction_id === "") {
        return;
      }
      try {
        const response = await fetchStops(this.route, direction_id);
        this.direction = direction_id;
        this.stop = "";
        this.stopData = response.map((stop) => {
          return { id: stop.place_code, label: stop.description };
        });
      } catch (e) {
        console.log(e);
        this.error = "Failed to fetch Stops";
      }
    },
    async getRouteStopInfo(stop_id) {
      if (stop_id === "") {
        return;
      }
      try {
        const response = await fetchRouteStopInfo(
          this.route,
          this.direction,
          stop_id
        );
        this.stop = stop_id;
        this.displayInfo = response;
        this.$emit("routeInfo", this.displayInfo);
      } catch (e) {
        console.log(e);
        this.error = "Failed to fetch route info for given stop";
      }
    },
  },
  mounted() {
    this.getRoutes();
  },
};
</script>

