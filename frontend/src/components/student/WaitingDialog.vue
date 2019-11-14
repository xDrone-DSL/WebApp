<template>
  <div>
    <v-btn
      class="my-2 light-blue white--text"
      width="90%"
      x-large
      @click="flyWrapper"
      :disabled="disabled"
    >
      Request Flight
    </v-btn>
    <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
      <v-card>
        <v-card-title>Your code is submitted!</v-card-title>
        <v-card-text class="headline">
          We will tell you when the teacher gives you feedback 😊 <br />While
          you are waiting, you can play around with <br />the simulator if you
          want!
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
      socket: socket,
      dialog: false,
      disabled: true
    };
  },
  props: {
    code: { type: String, required: true },
    level: { type: Object, required: true }
  },
  methods: {
    flyWrapper() {
      this.dialog = true;
      this.disabled = true;
      socket.emit("REQUEST_FLIGHT", {
        name: localStorage.uid,
        uid: localStorage.uid,
        level: this.level,
        code: this.code
      });
    }
  },
  mounted() {
    this.socket.emit("REQUEST_FLIGHT_PERMISSION", { uid: localStorage.uid });
    this.socket.on("REQUEST_FLIGHT_STATUS", data => {
      this.disabled = data.status;
    });
  }
};
</script>
