<template>
  <v-card height="100%" outlined>
    <v-card-title primary-title class="pa-1 mt-1 justify-center">
      Approval Queue
    </v-card-title>
    <v-container fluid class="pa-2" v-if="teams.length > 0">
      <v-flex v-for="team in teams" :key="team.uid" my-2>
        <QueueTask :team="team" :setCurrTeamUID="setCurrTeamUID" />
      </v-flex>
    </v-container>
    <v-card-text v-else>
      Nothing in the queue
    </v-card-text>
  </v-card>
</template>

<script>
import QueueTask from "./QueueTask";

export default {
  props: ["teams", "setCurrTeamUID"],
  components: { QueueTask }
};
</script>
