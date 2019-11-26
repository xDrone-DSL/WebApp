<template>
  <div>
    <v-btn
      v-if="disabled"
      class="my-2 pink darken-2 white--text"
      width="90%"
      x-large
      @click="cancelRequest"
      :loading="waitingCancel"
    >
      Cancel
    </v-btn>
    <v-btn
      v-else
      class="my-2 light-blue white--text"
      width="90%"
      x-large
      @click="flyWrapper"
      :disabled="code === '' || disabled"
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

    <v-snackbar v-model="snackbar" :timeout="3500">
      Request Cancelled
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { socket } from "../../apiCalls";
export default {
  name: "WaitingDialog",
  data() {
    return {
      dialog: false,
      disabled: false,
      snackbar: false,
      waitingCancel: false
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
    },
    cancelRequest() {
      this.waitingCancel = true;
      socket.emit("STUDENT_CANCEL_FLIGHT_REQUEST", { uid: localStorage.uid });
    }
  },
  mounted() {
    socket.emit("REQUEST_FLIGHT_PERMISSION", { uid: localStorage.uid });
    socket.on("REQUEST_FLIGHT_STATUS", data => {
      this.disabled = data.status;
    });
    socket.on("REQUEST_CANCELLED", () => {
      this.disabled = false;
      this.waitingCancel = false;
      this.snackbar = true;
    });
  }
};
</script>
