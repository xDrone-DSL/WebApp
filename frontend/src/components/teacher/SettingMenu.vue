<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="100"
      offset-x
      offset-y
      slide-y
    >
      <template v-slot:activator="{ on }">
        <v-btn icon dark v-on="on">
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
      </template>

      <v-card elevation="24">
        <v-list shaped>
          <v-list-item @click="logoutAllStudents">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Logout All Students</v-list-item-content>
          </v-list-item>

          <v-list-item v-if="loginEnabled" @click="disableLogin">
            <v-list-item-icon>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Disable Login</v-list-item-content>
          </v-list-item>

          <v-list-item v-else @click="enableLogin">
            <v-list-item-icon>
              <v-icon>mdi-lock-open</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Enable Login</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { socket } from "@/apiCalls";

export default {
  name: "SettingMenu",
  data: () => ({
    on: true,
    menu: false,
    loginEnabled: true
  }),
  methods: {
    logoutAllStudents() {
      socket.emit("LOGOUT_ALL_STUDENTS");
    },
    disableLogin() {
      socket.emit("DISABLE_LOGIN");
      this.loginEnabled = false;
    },
    enableLogin() {
      socket.emit("ENABLE_LOGIN");
      this.loginEnabled = true;
    }
  },
  mounted() {
    socket.emit("LOGIN_STATUS");
    socket.on("LOGIN_ENABLED", () => {
      this.loginEnabled = true;
    });
    socket.on("LOGIN_DISABLED", () => {
      this.loginEnabled = false;
    });
    console.log(this.loginEnabled);
  }
};
</script>

<style scoped></style>
