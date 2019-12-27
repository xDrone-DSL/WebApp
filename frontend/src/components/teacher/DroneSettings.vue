<template>
  <v-list-item @click="show = true">
    <v-list-item-icon>
      <v-icon>mdi-settings</v-icon>
    </v-list-item-icon>
    <v-list-item-content>Drone Settings</v-list-item-content>

    <v-dialog v-model="show" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Drone Settings
        </v-card-title>

        <v-list>
          <v-list-item v-for="drone in drones" :key="drone.mac">
            <v-list-item-content>{{ drone.name }}</v-list-item-content>
            <v-spacer></v-spacer>

            <v-switch
              value
              :input-value="drone.enabled"
              inset
              @change="updateDrone(drone.mac, drone.enabled)"
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="show = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { socket } from "@/apiCalls";

export default {
  data() {
    return {
      show: false,
      drones: []
    };
  },
  mounted() {
    socket.emit("GET_DRONES");
    socket.on("DRONES", drones => {
      this.drones = drones;
    });
  },
  methods: {
    updateDrone(mac, state) {
      socket.emit("SET_DRONE", {
        mac: mac,
        state: !state
      });
    }
  }
};
</script>
