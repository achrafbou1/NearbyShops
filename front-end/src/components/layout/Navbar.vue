<template>
  <nav>
    <v-toolbar flat app>
      <!-- Top-left logo -->
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Nearby</span>
        <span>Shops</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class="text-uppercase" :to="{ name: 'Login' }" active-class>Login</v-btn>
        <v-btn flat class="text-uppercase" :to="{ name: 'Register' }" active-class>Register</v-btn>
        <v-btn flat class="text-uppercase" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "Navbar",
  data() {
    return {
      tile: false,
      avatarSize: 40
    };
  },
  methods: {
    logout: () => {
      axios.get("/api/v1/logout").then(() => {
        router.push({ name: "Login"});
      });
    },
    created: () => {}
  }
};
</script>

<style>
</style>