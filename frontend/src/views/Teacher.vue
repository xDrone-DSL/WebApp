<template>
  <v-app>
    <v-app-bar app dark color="deep-purple accent-4">
      <v-toolbar-title>Teacher</v-toolbar-title>
      <v-spacer></v-spacer>
      <SettingMenu />
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs2 pa-1>
            <Queue :teams="otherTeams" :setCurrTeamUID="setCurrTeamUID"></Queue>
          </v-flex>
          <v-flex xs6 pa-1>
            <Approve
              :team="currTeam"
              :approve="approve"
              :rejecta="reject1"
              :rejectb="reject2"
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
import Queue from "@/components/teacher/Queue";
import Approve from "@/components/teacher/Approve";
import Drones from "@/components/teacher/Drones";
import SettingMenu from "@/components/teacher/SettingMenu";
import { socket } from "../apiCalls";

export default {
  components: {
    Queue,
    Approve,
    Drones,
    SettingMenu
  },
  methods: {
    approve() {
      if (this.teams.length > 1) {
        this.currTeam.hide = true;
        this.otherTeams[0].hide = true;
      }
      setTimeout(() => {
        this.socket.emit("APPROVE", { uid: this.currTeamUID });
        if (this.teams.length > 0) {
          this.currTeam.hide = false;
        }
      }, 300);
    },
    reject1() {
      if (this.teams.length > 1) {
        this.currTeam.hide = true;
        this.otherTeams[0].hide = true;
      }
      setTimeout(() => {
        this.socket.emit("REJECT1", { uid: this.currTeamUID });
        if (this.teams.length > 0) {
          this.currTeam.hide = false;
        }
      }, 300);
    },
    reject2() {
      if (this.teams.length > 1) {
        this.currTeam.hide = true;
        this.otherTeams[0].hide = true;
      }
      setTimeout(() => {
        this.socket.emit("REJECT2", { uid: this.currTeamUID });
        if (this.teams.length > 0) {
          this.currTeam.hide = false;
        }
      }, 300);
    },
    setCurrTeamUID(uid) {
      const oldTeam = this.currTeam;
      oldTeam.hide = true;
      this.currTeamUID = uid;
      this.currTeam.hide = true;
      setTimeout(() => {
        if (this.teams.length > 0) {
          oldTeam.hide = false;
          this.currTeam.hide = false;
        }
      }, 300);
    }
  },
  computed: {
    otherTeams() {
      return this.teams.filter(item => item.uid != this.currTeamUID);
    },
    currTeam() {
      return this.teams.find(item => item.uid === this.currTeamUID);
    }
  },
  data() {
    return {
      socket: socket,
      state: {},
      teams: [],
      drones: [],
      currTeamUID: ""
    };
  },
  mounted() {
    this.socket.emit("TEACHER");
    this.socket.on("UPDATE", state => {
      this.state = state;
      if (this.state.queue) {
        this.teams = this.state.queue;
        if (
          this.teams.length > 0 &&
          !this.teams.some(task => task.uid === this.currTeamUID)
        ) {
          this.currTeamUID = this.teams[0].uid;
        }
      }
      if (this.state.drones) {
        this.drones = this.state.drones;
      }
    });
  }
};
</script>
