<template>
  <v-card height="100%" outlined>
    <v-card-title primary-title class="pa-1 mt-1 justify-center">
      Drones
    </v-card-title>
    <v-container fluid class="pa-2" v-if="drones.length > 0">
      <v-layout wrap>
        <v-flex v-for="drone in drones" :key="drone.mac" pa-1 xs12>
          <v-scroll-y-reverse-transition>
            <v-card class="mx-auto">
              <v-card-title primary-title class="pa-1 mt-1 justify-center">
                {{ drone.name }}
              </v-card-title>
              <v-flex v-if="drone.queue.length > 0" pa-2>
                <v-card class="ma-2">
                  <v-card-title primary-title class="pa-1 mt-1 justify-center">
                    Fly Queue:
                  </v-card-title>
                  <div>{{ drone.queue[0].name }}</div>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="drone.queue.length > 1" @click="show = !show">
                      Show more
                      <v-icon>
                        {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="show" v-if="drone.queue.length > 0">
                      <div v-for="item in drone.queue" :key="item.name">
                        {{ item.name }}
                      </div>
                    </div>
                  </v-expand-transition>
                </v-card>
                <v-btn class="ma-2" color="success">Fly</v-btn>
              </v-flex>
              <v-flex v-else>
                Nothing in fly queue
              </v-flex>
            </v-card>
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
export default {
  props: ["drones"],
  data() {
    return {
      show: false
    };
  }
};
</script>
