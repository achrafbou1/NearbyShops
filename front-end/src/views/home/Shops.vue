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
                <span class="grey--text">{{shop.email}}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="green" @click="like">Like</v-btn>
              <v-btn flat color="red" @click="dislike">Dislike</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text
                v-show="shop.show"
              ></v-card-text>
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
      shops: {}
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwtToken");
    axios.get("/api/v1/shops")
      .then(response => {
        this.shops = response.data.shops;
      })
      .catch(error => {
          router.push({name: "Login"});
      });
  },
  methods() {
    like() {

    },
    dislike () {
      
    }
  }
};
</script>