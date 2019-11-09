<template>
  <div>
    <v-text-field
      label="Team Name"
      outlined
      v-model="teamName"
      :rules="[rules]"
    />
    <v-btn @click="login">Login</v-btn>
  </div>
</template>

<script>
import router from "../router";
import { socket } from "../apiCalls";

export default {
  data: () => ({
    error: false,
    teamName: ""
  }),
  computed: {
    rules() {
      return this.error || "Not Unique Team Name";
    }
  },
  methods: {
    login() {
      socket.emit("NEW_USER", { teamName: this.teamName });
    }
  },
  mounted() {
    socket.on("LOGIN_APPROVED", data => {
      const uid = data.uid;
      localStorage.uid = uid;
      router.push("explore");
    });
    socket.on("LOGIN_FAILED", () => {
      this.error = true;
    });
  }
};
</script>
