<template>
  <v-card
    :loading="loading"
    :color="color"
    :dark="color === 'error'"
    class="mb-2"
    :disabled="flying"
  >
    <v-card-title primary-title class="justify-center">
      <div>Team: {{ item.name }}</div>
    </v-card-title>
    <v-card-text class="ma-n2">
      <div>{{ item.level.adv.level }}</div>
      <div>{{ item.level.task.level }}</div>
      <div>Drone: {{ drone.name }}</div>
    </v-card-text>
    <div v-if="success">
      <v-btn class="mb-2 mx-1" color="warning" @click="flyWrapper">
        Retry<v-icon dark right>mdi-reload</v-icon>
      </v-btn>
      <v-btn class="mb-2 mx-1" color="success" @click="approve">
        Approve<v-icon dark right>mdi-check-all</v-icon>
      </v-btn>
      <v-btn class="mb-2 mx-1" color="error" @click="cancel">
        Cancel<v-icon dark right>mdi-cancel</v-icon>
      </v-btn>
    </div>
    <div v-else-if="fail">
      <v-btn class="mb-2 mx-1" color="warning" @click="flyWrapper">
        Retry<v-icon dark right>mdi-reload</v-icon>
      </v-btn>
      <v-btn class="mb-2 mx-1" color="error" @click="cancel">
        Cancel<v-icon dark right>mdi-cancel</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <v-btn class="mb-2  mx-1" color="success" @click="flyWrapper">
        Fly<v-icon dark right>mdi-helicopter</v-icon>
      </v-btn>
      <v-btn class="mb-2 mx-1" color="error" @click="cancel">
        Cancel<v-icon dark right>mdi-cancel</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { socket, fly } from "@/apiCalls";

export default {
  props: ["item", "drone", "flying", "toggleFlying"],
  data() {
    return {
      loading: false,
      color: "",
      success: false,
      fail: false
    };
  },
  methods: {
    flyWrapper() {
      this.loading = true;
      this.color = "";
      this.success = false;
      this.fail = false;
      this.toggleFlying();
      fly(this.item.code, this.drone.mac)
        .then(() => {
          this.color = "success";
          this.loading = false;
          this.success = true;
          this.toggleFlying();
        })
        .catch(() => {
          this.color = "error";
          this.loading = false;
          this.fail = true;
          this.toggleFlying();
        });
    },
    approve() {
      socket.emit("APPROVE_FINISH_TASK", {
        mac: this.drone.mac,
        uid: this.item.uid
      });
    },
    cancel() {
      socket.emit("CANCEL_FLIGHT_REQUEST", {
        mac: this.drone.mac,
        uid: this.item.uid
      });
    }
  }
};
</script>
