<template>
  <div id="app">
    <router-view />
    <LoggedOutDialog
      v-if="loggedOutDialog"
      :set-logged-out-dialog="setLoggedOutDialog"
    />
  </div>
</template>

<script>
import { socket } from "@/apiCalls";
import LoggedOutDialog from "@/components/student/LoggedOutDialog";

export default {
  data: () => ({
    loggedOutDialog: false
  }),
  components: {
    LoggedOutDialog
  },
  methods: {
    setLoggedOutDialog() {
      this.loggedOutDialog = false;
    }
  },
  mounted() {
    socket.on("INVALID_I_AM", () => {
      localStorage.removeItem("uid");
    });
    socket.on("FORCED_LOGOUT", () => {
      localStorage.removeItem("uid");
      this.loggedOutDialog = true;
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
