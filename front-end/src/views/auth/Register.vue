<template>
  <div class="register">
    <v-layout row wrap justify-center class="mt-3">
      <v-flex xs6>
        <h1 class="text-xs-center">Register</h1>
        <!-- Login Form -->
        <v-form ref="form">
          <v-text-field v-model="username" label="E-mail" required></v-text-field>
          <v-text-field
            v-model.trim="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            label="Password"
            @click:append="show = !show"
          ></v-text-field>

          <v-text-field
            v-model="repeatPassword"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            label="Confirm Password"
            @click:append="show = !show"
          ></v-text-field>
          <flash-message></flash-message>
          <v-btn flat class="success mx-0 mt-3" @click="register">Register</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { email, required, sameAs, minLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: null,
      password: null,
      repeatPassword: null,
      show: false
    };
  },
  methods: {
    register() {
      this.flash().destroyAll();
      if (this.$v.username.required && this.$v.password.required) {
        if (this.$v.username.email) {
          if (this.$v.password.minLength) {
            if (this.$v.repeatPassword.sameAsPassword) {
              let data = {
                username: this.username,
                password: this.password
              };

              axios
                .post("/api/v1/register", data)
                .then(response => {
                  alert("You have been successfully registered, please click 'OK' to login")
                  this.$router.push({ name: "Login" });
                })
                .catch(error => {
                  this.flashError(error.response.data.error.message);
                });
            } else {
              this.flashError("Please make sure both passwords are identical.");
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
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  }
};
</script>

<style>
.flash__message-content {
  color: #f5f5f5;
}
</style>

