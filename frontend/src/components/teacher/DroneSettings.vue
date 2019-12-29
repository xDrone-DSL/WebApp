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

          <v-list-item @click="newDrone = true">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Add new drone</v-list-item-content>
            <v-dialog v-model="newDrone" max-width="400">
              <v-card>
                <v-card-title class="headline">
                  Add New Drone
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="newName"
                            :rules="nameRules"
                            label="Name"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="newMac"
                            :rules="macRules"
                            label="Mac"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="addDrone()">
                      Add
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
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
      drones: [],
      newDrone: false,
      valid: false,
      newMac: "",
      newName: "",
      nameRules: [
        v => !!v || "Name is required",
        name =>
          !this.drones.find(drone => drone.name === name) ||
          "Name already exists"
      ],
      macRules: [
        v => !!v || "MAC address is required",
        mac => {
          const macRegex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
          return macRegex.test(mac) || "MAC address not in valid format";
        },
        mac =>
          !this.drones.find(drone => drone.mac === mac) ||
          "MAC address already exists"
      ]
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
    },
    addDrone() {
      if (this.$refs.form.validate()) {
        socket.emit("SET_DRONE", {
          mac: this.newMac,
          name: this.newName,
          state: true
        });
        this.$refs.form.reset();
        this.newDrone = false;
      }
    }
  }
};
</script>
