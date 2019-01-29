<template>
  <div>
    <h2>Shops</h2>
    <p>Name: {{ user.name }}</p>
  </div>
</template>  
<script>
import axios from "axios";
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
          this.$set(this, "user", response.data.user);
        })
        .catch(errors => {
          console.log(errors);
          //this.$router.push("/login")
        });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>