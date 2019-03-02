<template>
  <div class="shops">
    <v-container grid-list-md>
      <v-btn flat small color="primary" @click="getLocationAndSort">Sort by Distance</v-btn>
      <v-layout row wrap>
        <flash-message></flash-message>
        <v-flex xs4 v-for="shop in shops" :key="shop._id">
          <v-card>
            <v-img :src="shop.picture" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{shop.name}}</div>
                <!-- Round to 2 decimal places -->
                <div v-if="isSorted" class="grey--text">{{Math.round(shop.distance * 100) / 100}} Km</div>
                <span class="grey--text">{{shop.city}}</span>
                <span class="grey--text">{{shop.email}}</span>
                
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="green" @click="like(shop._id)">Like</v-btn>
              <v-btn flat color="red" @click="dislike">Dislike</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="shop.show"></v-card-text>
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
      isSorted: false
    };
  },
  created() {
    /** Converts numeric degrees to radians */
    if (typeof Number.prototype.toRad === "undefined") {
      Number.prototype.toRad = function() {
        return (this * Math.PI) / 180;
      };
    }
    //Set the Authorization header for authentication with the backend
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwtToken");
    this.getShops();
  },
  methods: {
    // Get all shops in the database and push them in a local array for further processing
    getShops() {
      axios
        .get("/api/v1/shops")
        .then(response => {
          this.shops = response.data.shops;
        })
        .catch(error => {
          router.push({ name: "Login" });
        });
    },
    // Like a shop
    like(id) {
      axios
        .post("/api/v1/shops/like", id)
        .then(response => {
          this.flashSuccess("Successfully liked !");
        })
        .catch(error => {
          this.flashError(
            "An error occurred while liking your shop, please try again."
          );
        });
    },
    // Dislike a shop
    dislike(id) {
      axios
        .post("/api/v1/shops/dislike", id)
        .then(response => {
          this.flashError("Successfully disliked!");
        })
        .catch(error => {
          this.flashError(
            "An error occurred while disliking your shop, please try again."
          );
        });
    },
    // Get User location and then sort shops by distance
    getLocationAndSort() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.sortByDistance);
      } else {
        this.flashError("Geolocation is not supported by this browser.");
      }
    },
    sortByDistance(userLocation) {
      let userLatitude = userLocation.coords.latitude;
      let userLongitude = userLocation.coords.longitude;
      this.shops.forEach(shop => {
        let shopLongitude = shop.location.coordinates[0];
        let shopLatitude = shop.location.coordinates[1];
        shop.distance = this.getDistance(
          userLatitude,
          userLongitude,
          shopLatitude,
          shopLongitude
        );
      });
      this.shops.sort((shop1, shop2) =>
        shop1.distance > shop2.distance ? 1 : -1
      );
      this.isSorted = true;
      console.log(this.shops);
    },
    //Function that calculates the distance between two points
    getDistance(userLongitude, userLatitude, shopLongitude, shopLatitude) {
      var R = 6371; // Radius of the earth in km
      var dLat = (shopLatitude - userLatitude).toRad(); // Javascript functions in radians
      var dLon = (shopLongitude - userLongitude).toRad();
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(userLatitude.toRad()) *
          Math.cos(shopLatitude.toRad()) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }
  }
};
</script>