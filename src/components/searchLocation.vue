<template>
    <form @submit.prevent="searchCity">
      <input id="city" type="text" v-model="searchQuery" placeholder="Insert the city" />
      <button id="search" type="submit">Search</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      async searchCity() {
        if (this.searchQuery.trim() === '') {
          // Se la query di ricerca è vuota, cerca la posizione dell'utente tramite geolocalizzazione
          this.findUserLocation();
        } else {
          // Altrimenti, cerca i dati meteorologici utilizzando il nome della città inserito
          this.getWeatherData(this.searchQuery);
        }
      },
      async findUserLocation() {
        try {
          const position = await this.getUserPosition();
          // Recupera la città utilizzando le coordinate geografiche
          const cityName = await this.getCityName(position.coords.latitude, position.coords.longitude);
          // Ottieni i dati meteorologici per la città trovata
          this.getWeatherData(cityName);
        } catch (error) {
          console.log('Impossibile trovare la posizione dell\'utente:', error);
        }
      },
      async getUserPosition() {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      },
      async getCityName(latitude, longitude) {
        const apiKey = 'f021c8b9a001a12c0c22d1d53049d674';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data.name;
        } catch (error) {
          throw new Error('Impossibile ottenere il nome della città');
        }
      },
      async getWeatherData(cityName) {
        const apiKey = 'f021c8b9a001a12c0c22d1d53049d674';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;
        
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Impossibile trovare i dati meteorologici per la città inserita');
          }
          const data = await response.json();
          // Passa i dati meteorologici alla componente meteo-component.vue
          this.$emit('weather-data-found', data);
          this.searchQuery = ''; // Resetta il campo di ricerca dopo aver emesso l'evento
        } catch (error) {
          console.log('Errore durante il recupero dei dati meteorologici:', error);
        }
      }
    }
  };
  </script>

  <style>
  form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-family: 'Work Sans', sans-serif;
  }
  #city{
    border-radius: 25px;
    padding: 10px;
    font-family: 'Work Sans', sans-serif;
    border: 1px solid 
  }
  #search {
    border-radius: 25px;
    padding: 10px;
    margin-left: 10px;
    font-family: 'Work Sans', sans-serif;
  }
  </style>
  ```
  