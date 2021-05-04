<template>
  <div id="display">
    <div class="stopInformation">
      <div class="StopInfo">
        <div class="stopName">
          <h3>{{ this.displayInfo.stops[0].description }}</h3>
        </div>
        <div class="stopId">
          <h3>Stop Id: {{ this.displayInfo.stops[0].stop_id }}</h3>
        </div>
      </div>
      <v-data-table
        class="displayTable"
        :headers="displayFields"
        :items="displayInfo.departures"
        :disable-sort="true"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Display",
  props: ["displayInfo"],
  data() {
    return {
      displayFields: [
        { text: "Route", value: "route_short_name", class: "header" },
        { text: "Destination", value: "description", class: "header" },
        { text: "Departs", value: "departure_text", class: "header" },
      ],
      parseFields: ["route_short_name", "description", "departure_text"],
    };
  },
};
</script>

<style>
.displayTable {
  padding-top: 20px;
}
.stopName {
  display: inline-block;
  padding-right: 25%;
}
.stopId {
  display: inline-block;
  padding-left: 25%;
}
.header {
  background-color: lightblue;
}
</style>