<template>
  <div class="login">
    <v-layout row wrap justify-center class="mt-3">
      <v-flex xs6>
        <h1 class="text-xs-center">Welcome to the Nearby Shops Application !</h1>
        <!-- Login Form -->
        <v-form ref="form">
          <v-text-field v-model="username" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            label="Password"
            @click:append="show = !show"
          ></v-text-field>
          <v-alert :value="true" v-if="feedback" :type="feedbackClass">{{this.feedback}}</v-alert>
          <v-btn flat class="success mx-0 mt-3" @click="login">Login</v-btn>
          <v-btn flat class="primary ml-1 mt-3" router :to="{name: 'Register'}">Register</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      show: false,
      feedbackClass: "error",
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        let data = {
          username: this.username,
          password: this.password
        };
        axios
          .post("/api/v1/login", data)
          .then(response => {
            this.$router.push('Shops')
          })
          .catch(error => {
            this.feedback = error.response.data.error;
          });
      }
    }
  },
  validations: {
    username: {
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

