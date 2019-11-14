<template>
  <v-card :loading="loading" :color="color" class="mb-2">
    <v-card-title primary-title class="justify-center">
      <div>Team: {{ item.name }}</div>
    </v-card-title>
    <v-card-text>
      <div>{{ item.level.adv.title }}</div>
      <div>{{ item.level.task.title }}</div>
      <div>Drone: {{ drone.name }}</div>
    </v-card-text>
    <div v-if="success">
      <v-btn class="ma-2" color="warning" @click="flyWrapper">Fly Again</v-btn>
      <v-btn class="ma-2" color="success" @click="approve">Approve</v-btn>
    </div>
    <div v-else-if="fail">
      <v-btn class="ma-2" color="warning" @click="flyWrapper">Fly Again</v-btn>
    </div>
    <v-btn v-else class="ma-2" color="success" @click="flyWrapper">Fly</v-btn>
  </v-card>
</template>

<script>
import { socket, fly } from "@/apiCalls";

export default {
  props: ["item", "drone"],
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
      fly(this.drone.queue[0].code, this.drone.mac)
        .then(() => {
          this.color = "success";
          this.loading = false;
          this.success = true;
        })
        .catch(() => {
          this.color = "error";
          this.loading = false;
          this.fail = true;
        });
    },
    approve() {
      socket.emit("FLY", {
        mac: this.drone.mac,
        uid: this.drone.queue[0].uid
      });
    }
  }
};
</script>
