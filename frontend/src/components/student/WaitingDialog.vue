<template>
  <div>
    <v-btn
      class="my-2 light-blue white--text"
      width="90%"
      x-large
      @click="flyWrapper"
    >
      Request Flight
    </v-btn>
    <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
      <v-card>
        <v-card-title>You code is submitted!</v-card-title>
        <v-card-text class="headline">
          We will tell you when the teacher gives you feedback 😊
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { socket } from "../../apiCalls";
export default {
  name: "WaitingDialog",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    code: { type: String, required: true },
    task: { type: Object, required: true }
  },
  methods: {
    flyWrapper() {
      this.dialog = true;
      socket.emit("REQUESTFLIGHT", {
        name: "Team 2",
        id: 2,
        task: this.task,
        code: this.code
      });
    }
  }
};
</script>

<style scoped></style>
