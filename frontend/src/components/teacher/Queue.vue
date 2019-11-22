<template>
  <v-card height="100%" outlined>
    <v-card-title primary-title class="pa-1 mt-1 justify-center">
      Approval Queue
    </v-card-title>
    <v-container fluid class="pa-2" v-if="teams.length > 0">
      <v-flex v-for="team in teams" :key="team.name" my-2>
        <v-scroll-y-reverse-transition>
          <v-card
            v-if="!team.hide"
            class="mx-auto"
            @click="setCurrTeamUID(team.uid)"
          >
            <v-card-title>
              {{ team.name }}
            </v-card-title>
            <v-card-subtitle class="text-left">
              <div>{{ team.level.adv.level }}</div>
              <div>{{ team.level.task.level }}</div>
            </v-card-subtitle>
          </v-card>
        </v-scroll-y-reverse-transition>
      </v-flex>
    </v-container>
    <v-card-text v-else>
      Nothing in the queue
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["teams", "setCurrTeamUID"]
};
</script>
