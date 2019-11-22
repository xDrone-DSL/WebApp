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
        <v-list>
          <v-list-item>
            <v-btn
              class="my-3"
              color="deep-purple"
              small
              dark
              @click="logoutAllStudents"
            >
              Logout All Students
            </v-btn>
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
    menu: false
  }),
  methods: {
    logoutAllStudents() {
      socket.emit("LOGOUT_ALL_STUDENTS");
    }
  }
};
</script>

<style scoped></style>
