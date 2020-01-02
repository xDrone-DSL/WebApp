<template>
  <v-dialog
    v-model="attention"
    persistent
    max-width="400"
    style="z-index: 999999"
  >
    <v-card>
      <v-card-title>Attention please</v-card-title>
      <v-card-text class="headline">
        The teacher is going to say something important! So stop doing the task
        for a second and pay attention please. You will be able to go back to
        work soon 😉.
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { socket } from "@/apiCalls";

export default {
  name: "AttentionPopup",
  data() {
    return {
      attention: false
    };
  },
  mounted() {
    socket.on("ATTENTION_ON", () => {
      this.attention = true;
    });
    socket.on("ATTENTION_OFF", () => {
      this.attention = false;
    });
  }
};
</script>
