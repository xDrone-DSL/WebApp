<template>
  <div id="app">
    <router-view />
    <LoggedOutDialog />
  </div>
</template>

<script>
import { socket } from "@/apiCalls";
import LoggedOutDialog from "@/components/student/LoggedOutDialog";

export default {
  components: {
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
