<template>
  <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
    <v-card>
      <v-card-title>You've logged out by the teacher</v-card-title>
      <v-card-text class="headline">
        The teacher says it's time to finish the session! We will take you back
        to the login page when you close the window.
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="green darken-1"
          text
          @click="
            dialog = false;
            $router.push('/login');
          "
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { socket } from "@/apiCalls";

export default {
  name: "LoggedOutDialog",
  data() {
    return {
      dialog: false
    };
  },
  mounted() {
    socket.on("FORCED_LOGOUT", () => {
      localStorage.removeItem("uid");
      this.dialog = true;
    });
  }
};
</script>
