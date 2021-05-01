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
      <md-table class="displayTable">
        <md-table-row>
          <md-table-head
            class="header"
            v-for="field in this.displayFields"
            :key="field"
          >
            {{ field }}
          </md-table-head>
        </md-table-row>
        <md-table-row
          v-for="(departure, idx) in this.displayInfo.departures"
          :key="idx"
        >
          <md-table-cell v-for="parsedField in parseFields" :key="parsedField">
            {{ departure[parsedField] }}
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Display",
  props: ["displayInfo"],
  data() {
    return {
      displayFields: ["Route", "Destination", "Departs"],
      parseFields: ["route_short_name", "description", "departure_text"],
    };
  },
  computed: {},
  watch: {},
  methods: {},
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
.md-table-head-container {
  text-align: center;
}
</style>