<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content class="mx-4 mb-4" fluid>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      
    }
  }
}
</script>
