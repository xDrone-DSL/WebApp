<template>
  <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
    <v-card>
      <v-card-title>You've logged out by the teacher</v-card-title>
      <v-card-text class="headline">
        The teacher says it's time to finish the session!
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { socket } from "@/apiCalls";
import router from "@/router.js";

export default {
  name: "LoggedOutDialog",
  data() {
    return {
      dialog: false
    };
  },
  mounted() {
    socket.on("FORCED_LOGOUT", () => {
      this.dialog = true;
      localStorage.removeItem("uid");
      router.push("/login");
    });
  }
};
</script>
