<template>
  <div class="login">
    <v-container>
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
            <flash-message></flash-message>
            <v-btn flat class="success mx-0 mt-3" @click="login">Login</v-btn>
            <v-btn flat class="primary ml-1 mt-3" router :to="{name: 'Register'}">Register</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import router from "@/router";
import { EventBus } from "@/Events"

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      show: false
    };
  },
  methods: {
    login() {
      this.flash().destroyAll();
      if (this.$v.username.required && this.$v.password.required) {
        if (this.$v.username.email) {
          if (this.$v.password.minLength) {
            if (this.$refs.form.validate()) {
              let data = {
                username: this.username,
                password: this.password
              };
              axios
                .post("/api/v1/login", data)
                .then(response => {
                  localStorage.setItem('jwtToken', response.data.token)
                  EventBus.$emit('logged', 'User logged')
                  router.push({ name: "Shops" });
                })
                .catch(error => {
                  console.log(error)
                  this.flashError(error.response.data.error.message);
                });
            }
          } else {
            this.flashError(
              "Your password should be at least 8 characters long."
            );
          }
        } else {
          this.flashError("Please make sure you entered a valid email.");
        }
      } else {
        this.flashError("The username or password fields cannot be empty.");
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
.flash__message-content {
  color: #f5f5f5;
}
</style>

