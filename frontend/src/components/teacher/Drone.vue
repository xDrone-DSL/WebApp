<template>
  <v-card v-if="drone.enabled" class="mx-auto" flat>
    <v-flex v-if="drone.queue.length > 0">
      <FlyTask
        v-for="item in drone.queue"
        :key="item.name"
        :item="item"
        :drone="drone"
        :flying="flying"
        :toggleFlying="toggleFlying"
      />
    </v-flex>
    <v-flex v-else> Nothing in fly queue of {{ drone.name }} </v-flex>
  </v-card>
</template>

<script>
import FlyTask from "./FlyTask";

export default {
  components: { FlyTask },
  props: ["drone"],
  data() {
    return {
      show: false,
      flying: false
    };
  },
  methods: {
    toggleFlying() {
      this.flying = !this.flying;
    }
  }
};
</script>
