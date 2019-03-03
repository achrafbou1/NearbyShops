<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content
      class="mx-4 mb-4"
      fluid
    >
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar'
import axios from "axios";

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      
    }
  },
  created() {
    /** Converts numeric degrees to radians */
    if (typeof Number.prototype.toRad === "undefined") {
      Number.prototype.toRad = function() {
        return (this * Math.PI) / 180;
      };
    }
  }
}
</script>
