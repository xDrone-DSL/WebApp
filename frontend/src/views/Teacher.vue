<template>
  <v-app>
    <v-app-bar app dark color="deep-purple accent-4">
      <v-toolbar-title>Teacher</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs2 pa-1>
            <Queue :teams="teamsSub1"></Queue>
          </v-flex>
          <v-flex xs6 pa-1>
            <Approve
              :team="teams[0]"
              :approve="approve"
              :rejecta="reject1"
              :rejectb="reject1"
            ></Approve>
          </v-flex>
          <v-flex xs4 pa-1>
            <Drones :drones="drones"></Drones>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Queue from "../components/teacher/Queue";
import Approve from "../components/teacher/Approve";
import Drones from "../components/teacher/Drones";
import { socket } from "../apiCalls";

export default {
  components: {
    Queue,
    Approve,
    Drones
  },
  methods: {
    approve() {
      if (this.teams.length > 1) {
        this.teams[0].hide = true;
        this.teams[1].hide = true;
      }
      setTimeout(() => {
        this.socket.emit("APPROVE");
        if (this.teams.length > 0) {
          this.teams[0].hide = false;
        }
      }, 300);
    },
    reject1() {
      if (this.teams.length > 1) {
        this.teams[0].hide = true;
        this.teams[1].hide = true;
      }
      setTimeout(() => {
        this.socket.emit("REJECT1");
        if (this.teams.length > 0) {
          this.teams[0].hide = false;
        }
      }, 300);
    },
    reject2() {
      if (this.teams.length > 1) {
        this.teams[0].hide = true;
        this.teams[1].hide = true;
      }
      setTimeout(() => {
        this.socket.emit("REJECT2");
        if (this.teams.length > 0) {
          this.teams[0].hide = false;
        }
      }, 300);
    }
  },
  computed: {
    teamsSub1() {
      return this.teams.slice(1);
    }
  },
  data() {
    return {
      socket: socket,
      state: {},
      teams: [],
      drones: []
    };
  },
  mounted() {
    this.socket.on("UPDATE", state => {
      this.state = state;
      if (this.state.queue) {
        this.teams = this.state.queue;
      }
      if (this.state.drones) {
        this.drones = this.state.drones;
      }
    });
  }
};
</script>
