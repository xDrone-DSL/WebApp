<template>
  <div v-if="tasks.length > 0">
    <div v-for="task in tasks" :key="task.key">
      <router-link :to="`${task.key}`" append>
        <v-btn class="ma-4">{{ task.title }}</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getAllTasksInAdventure } from "../apiCalls";

export default {
  mounted() {
    getAllTasksInAdventure(this.advId)
      .then(adv => {
        this.tasks = adv.tasks;
      })
      .catch(err => alert(err));
  },
  props: {
    advId: { type: String, required: true }
  },
  data: () => ({
    tasks: []
  })
};
</script>
