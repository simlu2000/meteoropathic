<template>
  <div id="meteoData" :class="weatherClass">
    <div v-if="loading">
      <h3>Caricamento...</h3>
    </div>
    <div v-else-if="error">
      <h2>
        Si è verificato un errore durante il recupero dei dati meteorologici.
      </h2>
    </div>
    <div id="meteo-info" v-else>
      <div id="titles">
        <h1 class="title">Today in {{ weatherData.name }}:</h1>
        <h2 class="title">{{ weatherData.weather[0].description }}</h2>
        <h3 class="title">{{ Math.ceil(weatherData.main.temp) }} °C</h3>
      </div>
      <div id="other">
        <div class="data_box">
          <h1>Humidity:</h1>
          <p class="info">{{ weatherData.main.humidity }} %</p>
        </div>
        <div class="data_box">
          <h1 class="extra">Pressure:</h1>
          <p class="info">{{ weatherData.main.pressure }} hPa</p>
        </div>
        <div class="data_box">
          <h1>Wind:</h1>
          <p class="info">{{ weatherData.wind.speed }} m/s</p>
        </div>
        <div class="data_box">
          <h1>Visibility:</h1>
          <p class="info">{{ weatherData.visibility / 1000 }} km</p>
        </div>
        <div class="data_box">
          <h1>Sunrise:</h1>
          <p class="info">
            {{ new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() }}
          </p>
        </div>
        <div class="data_box">
          <h1>Sunset:</h1>
          <p class="info">
            {{ new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() }}
          </p>
        </div>
        
      </div>
    </div>

    <form @submit.prevent="searchCity">
      <input
        id="city"
        type="text"
        v-model="searchQuery"
        placeholder="Inserisci la città"
      />
      <button id="search" type="submit">Cerca</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const API_KEY = "f021c8b9a001a12c0c22d1d53049d674";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export default {
  data() {
    return {
      weatherData: null,
      loading: true,
      error: null,
      searchQuery: "", // Aggiungo la variabile per memorizzare la città inserita dall'utente
    };
  },
  computed: {
    weatherClass() {
      if (!this.weatherData) return "";
      const weatherCondition = this.weatherData.weather[0].main.toLowerCase();
      return {
        sunny: weatherCondition === "clear",
        cloudy: weatherCondition === "clouds",
        rainy: weatherCondition === "rain",
        snowy: weatherCondition === "snow",
        thunderstorm: weatherCondition === "thunderstorm",
        mist: weatherCondition === "mist",
        fog: weatherCondition === "fog",
        haze: weatherCondition === "haze",
        smoke: weatherCondition === "smoke",
        dust: weatherCondition === "dust",
        sand: weatherCondition === "sand",
        ash: weatherCondition === "ash",
        squall: weatherCondition === "squall",
      };
    },
    moodClass() {
      if (!this.weatherData) return ""; // Se non ci sono dati meteorologici, restituisci una stringa vuota
      const weatherCondition = this.weatherData.weather[0].main.toLowerCase();
      const temperature = this.weatherData.main.temp;

      if (weatherCondition === "clear" && temperature > 20) {
        return "happy"; // Se è sereno e la temperatura è superiore a 20°C, restituisci la classe "happy"
      } else if (weatherCondition === "clouds" && temperature > 20) {
        return "midhappy"; // Se è nuvoloso e la temperatura è superiore a 20°C, restituisci la classe "midhappy"
      } else {
        return "sad"; // Per tutte le altre condizioni, restituisci la classe "sad"
      }
    },
  },
  async created() {
    try {
      await this.getCurrentPosition();
      await this.fetchWeatherData();
    } catch (error) {
      console.error(
        "Errore durante il recupero dei dati meteorologici:",
        error
      );
      this.error = error.message;
      this.loading = false;
    }
  },
  methods: {
    async searchCity() {
      try {
        this.loading = true;
        await this.fetchWeatherData();
      } catch (error) {
        console.error(
          "Errore durante il recupero dei dati meteorologici:",
          error
        );
        this.error = error.message;
        this.loading = false;
      }
    },
    async fetchWeatherData() {
      const params = {
        appid: API_KEY,
        units: "metric",
      };

      if (this.searchQuery) {
        params.q = this.searchQuery;
      } else {
        const position = await this.getCurrentPosition();
        params.lat = position.coords.latitude;
        params.lon = position.coords.longitude;
      }

      const response = await axios.get(API_URL, { params });

      this.weatherData = response.data;
      this.loading = false;

      // Ricalcola i dati aggiuntivi
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
  },
};
</script>

<style scoped>
#meteoData {
  display: flex;
  flex-direction: column;
  color: black;
  height: 900px;
  width: 100%;
  margin-top: 50px;
}
#titles {
  margin-top: 15%;
}
#other {
  margin-top: 150px;
  display: flex;
  flex-wrap: wrap; /* Consente ai div di andare a capo quando non c'è spazio sufficiente */
  justify-content: space-between; /* Distribuisce uniformemente i div orizzontalmente */
  align-items: center; /* Allinea i div verticalmente al centro */
}

.title {
  text-align: left;
  margin-left: 5%;
  margin-top: 15px;
  color: white;
  font-size: 3.2em;
}
/*meteo status*/
.sunny {
  background: linear-gradient(to bottom right, #ffce00, #ff8a00);
  /*background:url('../img/sunny.png');
  background-repeat: space;  */
}
.cloudy {
  background: linear-gradient(to bottom right, #c1c1c1, #8a8a8a);
}
.rainy {
  background: linear-gradient(to bottom right, #4d4d4d, #1a1a1a);
}
.snowy {
  background: linear-gradient(to bottom right, #ffffff, #d9d9d9);
}
.thunderstorm {
  background: linear-gradient(to bottom right, yellow, #000000);
}
.mist {
  background: linear-gradient(to bottom right, #c1c1c1, #8a8a8a);
}
.fog {
  background: linear-gradient(to bottom right, #c1c1c1, #8a8a8a);
}
.haze {
  background: linear-gradient(to bottom right, #c1c1c1, #8a8a8a);
}
.smoke {
  background: linear-gradient(to bottom right, #c1c1c1, black);
}
.dust {
  background: linear-gradient(to bottom right, #c1c1c1, #8a8a8a);
}
.sand {
  background: linear-gradient(to bottom right, brown);
}

#other {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Distribuisce uniformemente i div orizzontalmente */
  align-items: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Modifica questa regola CSS */
.data_box {
  flex: 0 0 calc(30% - 20px); /* Larghezza fissa del 30% del contenitore con margine */
  margin-bottom: 20px;
  background-color: #f1f6f8;
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Work Sans", sans-serif;
}

.data_box:last-child {
  margin-right: 0; /* Rimuovi lo spazio tra l'ultima carta e il margine destro */
}

.info {
  font-size: 1.5em;
  margin-right: 5%;
}

form {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
  font-family: "Work Sans", sans-serif;
}
#city {
  border-radius: 25px;
  padding: 10px;
  font-family: "Work Sans", sans-serif;
  border: 1px solid;
  flex: 0 0 calc(20% - 10px); /* Larghezza fissa del 30% del contenitore con margine */
}
#search {
  border-radius: 25px;
  padding: 10px;
  margin-left: 10px;
  font-family: "Work Sans", sans-serif;
}
</style>
```