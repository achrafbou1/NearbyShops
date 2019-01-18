<template>
  <div class="register">
    <v-layout row wrap justify-center class="mt-3">
      <v-flex xs6>
        <h1 class="text-xs-center">Register</h1>
        <!-- Login Form -->
        <v-form ref="form">
          <v-text-field v-model="username" label="E-mail" required></v-text-field>
          <v-text-field v-model.trim="$v.password.$model" :append-icon="show ? 'visibility_off' : 'visibility'" :type="show ? 'text' : 'password'" label="Password" @click:append="show = !show"></v-text-field>
          
          <v-text-field v-model="repeatPassword" :append-icon="show ? 'visibility_off' : 'visibility'" :type="show ? 'text' : 'password'" label="Confirm Password" @click:append="show = !show"></v-text-field>
          <v-alert :value="true" v-if="feedback" :type="feedbackClass">{{this.feedback}}</v-alert>
          <v-btn flat class="success mx-0 mt-3" @click="register">Register</v-btn>
        </v-form>
        
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      username: null,
      password: null,
      repeatPassword: null,
      show: false,
      feedbackClass: 'error',
      feedback: false
    }
  },
  methods: {
    register(){
          if(this.$v.repeatPassword.sameAsPassword){
            if(this.$refs.form.validate()){
                let data = {
                  username: this.username,
                  password: this.password
                }

                axios.post('/api/v1/register', data) 
                .then((response) => {
                    this.feedbackClass = 'success'
                    this.feedback = 'You have been successfully registered'
                    console.log(response.data)
                })
                .catch((error) => {
                  this.feedbackClass = 'error'
                  this.feedback = error.response.data.error
                  console.log(error.response)
                })
            }
          } else {
            this.feedbackClass = 'error'
            this.feedback = 'Please make sure both passwords are identical.'
          }
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  }
}
</script>

<style>

</style>

