<template>
  <div class="shops">
    <v-container grid-list-md>
      <flash-message></flash-message>
      <v-layout row wrap>
        <v-flex xs4 v-if="!isLiked(shop._id) && !isDisliked(shop._id)" v-for="shop in shops" :key="shop._id">
          <v-card>
            <v-img :src="shop.picture" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{shop.name}}</div>
                <!-- Round to 2 decimal places -->
                <div class="grey--text">{{Math.round(shop.distance * 100) / 100}} Km</div>
                <span class="grey--text">{{shop.city}}</span>
                <span class="grey--text">{{shop.email}}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="green" @click="Like(shop._id)">Like</v-btn>
              <v-btn flat color="red" @click="Dislike(shop._id)">Dislike</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>  
<script>
import axios from "axios";
import router from "@/router";
import { EventBus } from "@/Events";

export default {
  name: "Shops",
  data() {
    return {
      shops: {},
      likedShops: [],
      dislikedShops: []
    };
  },
  created() {
    this.getShops();
    this.getLikedShops();
    this.getDislikedShops();
  },
  methods: {
    // Get all shops in the database and push them in a local array for further processing
    getShops() {
      axios
        .get("/api/v1/shops")
        .then(response => {
          // Get the list of shops from backend server and fill the local array of objects that will be specific to hte user, then sort them by distance
          this.shops = response.data.shops;
          this.getLocationAndSort();
        })
        .catch(error => {
          router.push({ name: "Login" });
        });
    },
    getLikedShops() {
      axios
        .get("/api/v1/shops/likedshops")
        .then(response => {
          // Get the list of shops from backend server and fill the local array of objects that will be specific to hte user, then sort them by distance
          this.likedShops = response.data.likedShops;
          EventBus.$emit("likedShops", this.likedShops);
        })
        .catch(error => {
          router.push({ name: "Login" });
        });
    },
    getDislikedShops() {
      this.$cookies.keys().forEach(dislikedShop => {
        let dislikedShop_id = this.$cookies.get(dislikedShop);
        this.dislikedShops.push(dislikedShop_id);
      });
    },
    // Checks if a shop is liked
    isLiked(shop_id) {
      if (this.likedShops.indexOf(shop_id) === -1) {
        return false;
      }
      return true;
    },
    isDisliked(shop_id) {
      if (this.dislikedShops.indexOf(shop_id) === -1) {
        return false;
      }
      return true;
    },
    // Like a shop
    Like(shop_id) {
      this.flash().destroyAll();
      let shop = { shop_id };
      axios
        .post("/api/v1/shops/like", shop)
        .then(response => {
          this.likedShops = this.shops.filter(shop => {
            let response_likedShops = response.data.likedShops;
            return response_likedShops.indexOf(shop._id) !== -1;
          });
          this.flashSuccess("Successfully liked!");
          this.getLikedShops();
        })
        .catch(error => {
          this.flashError(
            "An error occurred while liking your shop, please try again."
          );
        });
    },
    // Dislike a shop
    Dislike(shop_id) {
      this.flash().destroyAll();
      this.$cookies.set(
        "dislikedShop-" + this.getRandomInt(0, 100000),
        shop_id,
        60 * 60 * 2
      );
      this.dislikedShops.push(shop_id);
      this.flashSuccess("You won't see this shop for the next 2 hours!");
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
      EventBus.$emit("shops", this.shops);
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
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
  }
};
</script>