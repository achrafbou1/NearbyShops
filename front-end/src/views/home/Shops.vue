<template>
  <div class="shops">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs4 v-for="shop in shops" :key="shop._id">
          <v-card>
            <v-img :src="shop.picture" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{shop.name}}</div>
                <span class="grey--text">{{shop.city}}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat>Like</v-btn>
              <v-btn flat color="red">Dislike</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="shop.show = !shop.show">
                <v-icon>{{ shop.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text
                v-show="shop.show"
              >I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>  
<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "Shops",
  data() {
    return {
      shops: {},
      show: false
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get("/api/v1/shops")
      .then(response => {
        this.shops = response.data.shops;
        for (let i = 0; i < Object.keys(this.shops).length; i++) {
          this.$set(this.shops[i], "show", false);
        }
      })
      .catch(error => {
        if (error.response.status == 401) {
          this.$router.push({
            name: "Login"
          });
        }
      });
  }
};
</script>