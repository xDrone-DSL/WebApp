<template>
  <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
    <v-card>
      <v-card-title>Your feedback is here!</v-card-title>
      <v-card-text class="headline">{{ feedback }}</v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { socket } from "../../apiCalls";

export default {
  name: "FeedbackDialog",
  data() {
    return {
      socket: socket,
      dialog: false,
      feedback: {}
    };
  },
  mounted() {
    this.socket.on("FEEDBACK", feedback => {
      this.dialog = true;
      this.feedback = feedback;
    });
  }
};
</script>
