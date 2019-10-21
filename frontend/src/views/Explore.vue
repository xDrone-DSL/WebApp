<template>
  <div>
    <div v-for="adv in advs" :key="adv.id">
      <router-link :to="`${adv.id}`" append>
        <v-btn class="ma-4">
          {{ adv.title }}
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    advs: [
      {
        id: 1,
        title: "hello world"
      },
      {
        id: 2,
        title: "hello world 2"
      }
    ]
  })
};
</script>
