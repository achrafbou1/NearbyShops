<template>
  <nav>
    <v-toolbar flat app>
      <!-- Top-left logo -->

      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Nearby</span>
        <span>Shops</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      tile: false,
      avatarSize: 40
    }    
  },
  
}
</script>

<style>
  
</style>