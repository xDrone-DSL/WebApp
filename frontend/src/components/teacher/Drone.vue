<template>
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
            <v-divider></v-divider>
            <div
              v-for="item in drone.queue.filter(i => i != drone.queue[0])"
              :key="item.name"
            >
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
</template>

<script>
export default {
  props: ["drone"],
  data() {
    return {
      show: false
    };
  }
};
</script>
