<template>
    <div class="preferred-shops">
    <v-container grid-list-md>
      <v-layout row wrap>
        <flash-message></flash-message>
        <v-flex xs4 v-for="shop in preferredShops" :key="shop._id">
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "@/Events";

export default {
    name: "PreferredShops",
    data () {
        return {
          shops: {},
          preferredShops: {}
        }
    },
    created() {
      EventBus.$on('shops', ({shops}) => {
        for(shop in this.shops) {
          console.log(this.shops);
          if(shop.isLiked){
            preferredShops.push(shop);
          }
        }
      })
    },
    updated(){
      
    }
}
</script>