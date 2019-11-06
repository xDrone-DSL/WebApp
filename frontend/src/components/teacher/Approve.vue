<template>
  <v-card height="100%" outlined>
    <v-card-title primary-title class="pa-1 mt-1 justify-center">
      Approve
    </v-card-title>
    <v-container v-if="team" fluid class="pa-2">
      <v-scroll-y-transition>
        <v-layout v-if="!team.hide" wrap>
          <v-flex pa-1 xs12>
            <v-card>
              <v-card-title primary-title>
                Info
              </v-card-title>
              <v-card-subtitle class="text-left">
                <div>Team Name: {{ team.name }}</div>
                <div>Task Name: {{ team.task.name }}</div>
                <div>Task Summary: {{ team.task.summary }}</div>
              </v-card-subtitle>
            </v-card>
          </v-flex>
          <v-flex pa-1 xs8>
            <v-card>
              <v-card-title primary-title>
                Code
              </v-card-title>
              <v-card-text class="text-left">
                <code>{{ team.code }}</code>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex pa-1 xs4>
            <v-card>
              <v-card-title class="justify-center pb-1">
                Tools
              </v-card-title>
              <SimDialog :code="team.code" />
              <v-btn
                class="my-2"
                width="90%"
                color="success"
                dark
                large
                @click="approve"
              >
                Approve
              </v-btn>
              <v-btn
                class="my-2"
                width="90%"
                color="warning"
                dark
                large
                @click="rejecta"
              >
                Almost<br />there!
              </v-btn>
              <v-btn
                class="my-2 mb-4"
                width="90%"
                color="error"
                dark
                large
                @click="rejectb"
              >
                Needs more<br />work
              </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-scroll-y-transition>
    </v-container>
    <v-card-text v-else>
      Nothing to approve yet
    </v-card-text>
  </v-card>
</template>

<script>
import SimDialog from "@/components/SimDialog";

export default {
  components: { SimDialog },
  props: ["team", "approve", "rejecta", "rejectb"]
};
</script>

<style>
code {
  background-color: white !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
