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
// import axios from "axios";
// const url = `https://svc.metrotransit.org/nextripv2`;
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
      // axios
      //   .get(`${url}/routes`)
      //   .then((response) => {
      //     this.routeData = response.data.map((route) => {
      //       return { id: route.route_id, label: route.route_label };
      //     });
      //     console.log(this.routeData);
      //   })
      //   .catch(() => {
      //     this.error = "Failed to fetch Routes";
      //   });
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
      // axios
      //   .get(`${url}/directions/${route_id}`)
      //   .then((response) => {
      //     this.route = route_id;
      //     this.direction = "";
      //     this.stop = "";
      //     console.log(this.route);
      //     this.directionData = response.data.map((direction) => {
      //       return {
      //         id: direction.direction_id,
      //         label: direction.direction_name,
      //       };
      //     });
      //     console.log(this.directionData);
      //   })
      //   .catch(() => {
      //     this.error = "Failed to fetch Directions";
      //   });
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
      // axios
      //   .get(`${url}/stops/${this.route}/${direction_id}`)
      //   .then((response) => {
      //     this.direction = direction_id;
      //     this.stop = "";
      //     console.log(this.direction);
      //     this.stopData = response.data.map((stop) => {
      //       return { id: stop.place_code, label: stop.description };
      //     });
      //     console.log(this.stopData);
      //   })
      //   .catch(() => {
      //     this.error = "Failed to fetch Stops";
      //   });
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
      // axios
      //   .get(`${url}/${this.route}/${this.direction}/${stop_id}`)
      //   .then((response) => {
      //     this.stop = stop_id;
      //     console.log(this.stop);
      //     console.log(response.data);
      //     this.displayInfo = response.data;
      //     this.$emit("routeInfo", this.displayInfo);
      //   })
      //   .catch(() => {
      //     this.error = "Failed to fetch route info for given stop";
      //   });
    },
  },
  mounted() {
    this.getRoutes();
  },
};
</script>

