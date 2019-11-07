<template>
  <v-card height="100%" outlined>
    <v-card-title primary-title class="pa-1 mt-1 justify-center">
      Drones
    </v-card-title>
    <v-container fluid class="pa-2" v-if="drones.length > 0">
      <v-layout wrap>
        <v-flex v-for="drone in drones" :key="drone.mac" pa-1 xs12>
          <v-scroll-y-reverse-transition>
            <Drone :drone="drone"></Drone>
          </v-scroll-y-reverse-transition>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-text v-else>
      No Drones
    </v-card-text>
  </v-card>
</template>

<script>
import Drone from "./Drone";

export default {
  components: { Drone },
  props: ["drones"],
  data() {
    return {};
  }
};
</script>
