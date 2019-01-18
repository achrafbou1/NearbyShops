<template>
  <div class="login">
    <v-layout row wrap justify-center class="mt-3">
      <v-flex xs6>
        <h1 class="text-xs-center">Welcome to the Nearby Shops Application !</h1>
        <!-- Login Form -->
        <v-form ref="form">
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field v-model="password" :append-icon="show ? 'visibility_off' : 'visibility'" :type="show ? 'text' : 'password'" label="Password" @click:append="show = !show"></v-text-field>
          <v-btn flat class="success mx-0 mt-3" @click="login">Login</v-btn>
          <v-btn flat class="primary ml-1 mt-3" router :to="{name: 'Register'}">Register</v-btn>
        </v-form>
        
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      show: false,
    }
  },
  methods: {
    login(){
      if(this.$refs.form.validate()){
          let data = {
            email: this.email,
            password: this.password
          }
          axios.post('/api/v1/login', data)
          .then((response) => {
            console.log('Logged In ' + response.data.message)
            //this.$router.push('Shops')
          })
          .catch((error) => {
            console.log('Cannot log in ' + error)
          })
        }
      }
  },
  validations: {
    email: {
      required, 
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  }
};
</script>

<style>

</style>

