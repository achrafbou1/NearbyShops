<template>
  <nav>
    <v-toolbar flat app>
      <!-- Top-left logo -->
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Nearby</span>
        <span :to="{ name: 'Landing' }">Shops</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class="text-uppercase" v-if="!isLogged" :to="{ name: 'Login' }" active-class>Login</v-btn>
        <v-btn flat class="text-uppercase" v-if="!isLogged" :to="{ name: 'Register' }" active-class>Register</v-btn>
        <v-btn flat class="text-uppercase" v-if="isLogged" :to="{ name: 'Shops' }">Nearby Shops</v-btn>
        <v-btn flat class="text-uppercase" v-if="isLogged":to="{ name: 'PreferredShops' }">My Preferred Shops</v-btn>
        <v-btn flat class="text-uppercase" v-if="isLogged" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { EventBus } from "@/Events"

export default {
  name: "Navbar",
  data() {
    return {
      tile: false,
      avatarSize: 40,
      isLogged: this.checkIfIsLogged()
    };
  },
  created () {
    EventBus.$on('logged', () => {
      this.isLogged = this.checkIfIsLogged()
    })
  },
  methods: {
    logout() {
      localStorage.removeItem("jwtToken");
      this.isLogged = this.checkIfIsLogged()
      router.push('/')
    },
    checkIfIsLogged() {
      let token = localStorage.getItem('jwtToken')
      if (token) {
        return true
      } else {
        return false
      }
    }
  }
};
</script>

<style>
</style>