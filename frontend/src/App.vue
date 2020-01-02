<template>
  <div id="app">
    <v-app>
      <router-view />
      <LoggedOutDialog />
      <AttentionPopup />
    </v-app>
  </div>
</template>

<script>
import { socket } from "@/apiCalls";
import LoggedOutDialog from "@/components/student/LoggedOutDialog";
import AttentionPopup from "@/components/student/AttentionPopup";

export default {
  data: () => ({
    loggedOutDialog: false
  }),
  components: {
    AttentionPopup,
    LoggedOutDialog
  },
  mounted() {
    socket.on("INVALID_I_AM", () => {
      localStorage.removeItem("uid");
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-card__text,
.v-card__title {
  word-break: normal;
}
</style>
