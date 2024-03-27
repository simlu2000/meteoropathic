<template>
  <navigationBar></navigationBar>
  <meteo-component :city="cityName"></meteo-component>
  <searchLocation></searchLocation>
  <otherDataComponent :city="cityName"></otherDataComponent>
</template>

<script>
import navigationBar from "./components/navigationBar.vue";
import meteoComponent from "./components/meteo-component.vue";
export default {
  name: "App",
  components: {
    navigationBar,
    meteoComponent,
  },
  data() {
    return {
      cityName: null,
    };
  },
  methods: {
    updateCity(city) {
      this.cityName = city;
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-family: 'Work Sans', sans-serif;
}
</style>
