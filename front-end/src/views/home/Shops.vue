<template>
  <div>
    <h2>Shops</h2>
    <p>Name: {{ user.name }}</p>
  </div>
</template>  
<script>
import axios from "axios";
import router from '@/router'

export default {
  name: "Shops",
  data() {
    return {
      user: {
        name: "Achraf"
      }
    };
  },
  methods: {
    getUserData: () => {
      axios
        .get("/api/v1/shops")
        .then(response => {

        })
        .catch(error => {
           router.push({ name: 'Login'})
        });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>