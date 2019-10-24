<template>
  <div>
    <div v-for="adv in advs" :key="adv.id">
      <router-link :to="`${adv.key}`" append>
        <v-btn class="ma-4">
          {{ adv.title }}
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getAllAdventures } from "../apiCalls";

export default {
  mounted() {
    getAllAdventures()
      .then(advs => (this.advs = advs))
      .catch(err => alert(err));
  },
  data: () => ({
    advs: []
  })
};
</script>
