<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="100"
      offset-y
      slide-y
    >
      <template v-slot:activator="{ on }">
        <v-btn icon dark v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-card elevation="24">
        <v-list>
          <v-list-item>
            <v-list-item-avatar :color="color" class="mr-3">
              <span class="white--text headline">{{ teamName[0] }}</span>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ teamName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-btn class="my-3" :color="logoutColor" large dark @click="logout">
          Logout
        </v-btn>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { socket } from "@/apiCalls";
import router from "@/router.js";
export default {
  name: "TeamDetailMenu",
  props: {
    logoutColor: { type: String, default: "deep-purple" }
  },
  data: () => ({
    on: true,
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),
  computed: {
    teamName() {
      return localStorage.getItem("uid");
    },
    color() {
      const defaultColors = [
        "lime",
        "cyan",
        "red",
        "light-blue",
        "yellow",
        "pink",
        "purple",
        "amber",
        "deep-purple",
        "light-green",
        "orange"
      ];
      const teamName = this.teamName;
      const color = defaultColors[teamName.length % defaultColors.length];
      return color;
    }
  },
  methods: {
    logout() {
      const teamName = localStorage.getItem("uid");
      socket.emit("USER_LOGOUT", { uid: teamName });
      localStorage.removeItem("uid");
      router.push("/login");
    }
  }
};
</script>
