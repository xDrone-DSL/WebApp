<template>
  <v-card
    :loading="loading"
    :color="color"
    :dark="color === 'error'"
    class="mb-2"
    :disabled="flying"
  >
    <v-card-title primary-title class="justify-center pa-2">
      <div>Team: {{ item.name }}</div>
    </v-card-title>
    <v-card-subtitle style="padding-top: 16px; font-size: 17px;">
      Drone: {{ drone.name }}
    </v-card-subtitle>
    <v-btn icon @click="showCode = true" class="code-popup-button">
      <v-icon>
        mdi-code-braces
      </v-icon>
    </v-btn>
    <v-card-text>
      <div style="font-size: 18px;">
        {{ item.level.adv.level }} - {{ item.level.task.level }}
      </div>
    </v-card-text>
    <div v-if="success">
      <v-card-text v-if="color === 'yellow lighten-2'" style="font-size: 20px">
        Requirements failed 😥
      </v-card-text>
      <v-card-text v-else style="font-size: 20px">
        Requirements were met 🎉
      </v-card-text>
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
    <v-dialog v-model="showCode" width="300">
      <v-card>
        <v-card-title primary-title>
          Code
        </v-card-title>
        <v-card-text class="text-left">
          <code>{{ item.code }}</code>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="success" @click="showCode = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      fail: false,
      showCode: false
    };
  },
  methods: {
    flyWrapper() {
      this.loading = true;
      this.color = "";
      this.success = false;
      this.fail = false;
      this.toggleFlying();
      fly(this.item.code, this.drone.mac, this.item.level.task.requirements)
        .then(res => {
          this.color = res["flight_status"] ? "success" : "yellow lighten-2";
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
      socket.emit("TEACHER_CANCEL_FLIGHT_REQUEST", {
        mac: this.drone.mac,
        uid: this.item.uid
      });
    }
  }
};
</script>

<style scoped>
.code-popup-button {
  position: absolute;
  right: 6px;
  top: 6px;
}
code {
  background-color: white !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
