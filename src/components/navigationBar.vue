<template>
  <header>
    <div id="navbar" class="header">
      <nav class="menu">
        <ul id="navbarmenu">
          <li><a>METEOROPATHIC</a></li>
          <button @click="openPopupSignIn">Sign In</button>
          
          <!--popup signin-->
          <div v-if="showPopupSignIn" class="popup-overlay">
            <div class="popup-content">
              <signin></signin>
              <span class="close" @click="closePopupSignIn">&times;</span>
            </div>
          </div>
          <!--end popup signin-->
          
          <button @click="openPopupLogIn">Log In</button>
          <!--popup login-->
          <div v-if="showPopupLogIn" class="popup-overlay">
            <div class="popup-content">
              <login></login>
              <span class="close" @click="closePopupLogIn">&times;</span>
            </div>
          </div>
          <!--end popup login-->

        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Signin from "./signin-component.vue";
import Login from "./login-component.vue";

export default {
  components: {
    Signin,
    Login,
  },
  data(){
    return{
      showPopupSignIn: false, //quando apro pagina il popup deve essere chiuso
      showPopupLogIn: false
    };
  },
  methods: {
    openPopupSignIn(){
      this.showPopupSignIn = true;
    },
    closePopupSignIn(){
      this.showPopupSignIn = false;
    },
    openPopupLogIn(){
      this.showPopupLogIn = true;
    },
    closePopupLogIn(){
      this.showPopupLogIn = false;
    },
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #2c3e50;
  font-size: 1.5em;
  font-family: "Work Sans", sans-serif;
  text-align: center;
  align-items: center;
  background-color: #f1f6f8;
}

.header-container {
  display: flex;
}

#logo {
  width: 96px;
  height: 96px;
  top: 0;
  right: 0;
  margin-top: -15px;
  margin-left: -65px;
}

.menu ul {
  list-style: none;
  display: flex;
  justify-content: center; /* Centra i testi orizzontalmente */
  align-items: center; /* Centra i testi verticalmente */
}

.menu ul li {
  margin-right: 24px;
  margin-top: 13px;
}

.menu ul li a {
  font-size: 24px;
  text-align: center; /* Centra il testo all'interno del suo contenitore */
}

.popup-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Assicura che il popup sia sopra a tutti gli altri elementi */
}

.popup-content {
  background-color: white;
  width:25%;
  height:35%;;
  padding: 20px;
  font-size: 1em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  
}
</style>
