<template>
  <div>
    <v-app>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="deep-purple darken-1" dark flat>
              <v-toolbar-title>Create a team and login</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pb-1 pt-6">
              <v-alert v-if="error" dense outlined type="error">
                {{ errorText }}
              </v-alert>
              <v-text-field
                label="Team Name"
                outlined
                clearable
                v-model="teamName"
                :rules="[rules.required, rules.alphanumeric]"
                v-on:keyup.enter="login"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple darken-3" dark @click="login">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import router from "../router";
import { socket } from "../apiCalls";

export default {
  data: () => ({
    error: false,
    teamName: "",
    unavailableName: "",
    rules: {
      required: name => !!name || "Required",
      alphanumeric: name => {
        const pattern = /^[\w|\s]*$/;
        return (
          pattern.test(name) || "Please use letters, numbers and white space"
        );
      }
    }
  }),
  methods: {
    login() {
      if (this.teamName === "") {
        this.error = true;
      } else {
        socket.emit("NEW_USER", { teamName: this.teamName });
      }
    }
  },
  computed: {
    errorText() {
      if (this.teamName === "") {
        return "Team name can't be nothing.";
      }
      return `Sorry, the name ${this.unavailableName} is taken or invalid. Please pick another one.`;
    }
  },
  mounted() {
    socket.on("LOGIN_APPROVED", data => {
      const uid = data.uid;
      localStorage.uid = uid;
      router.push("explore");
    });
    socket.on("LOGIN_FAILED", () => {
      this.error = true;
      this.unavailableName = this.teamName;
    });
  }
};
</script>
