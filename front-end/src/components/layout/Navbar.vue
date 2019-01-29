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
        <v-btn flat class="text-uppercase">Login</v-btn>
        <v-btn flat class="text-uppercase">Register</v-btn>
        <v-btn flat class="text-uppercase">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      tile: false,
      avatarSize: 40
    };
  },
  methods: {
    logout: () => {
      axios.get('/api/logout').then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style>
</style>