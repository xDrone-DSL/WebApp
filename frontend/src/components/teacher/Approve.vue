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
                <h4>Team and level information</h4>
              </v-card-title>
              <v-card-subtitle class="text-left">
                <h3>Team Name: {{ team.name }}</h3>
                <div>{{ team.level.adv.level }}</div>
                <div>{{ team.level.task.level }}</div>
                <div>Submitted: {{ time }}</div>
                <div :class="safety.success ? 'green--text' : 'red--text'">
                  Safety: {{ safety.message }}
                </div>
              </v-card-subtitle>
              <v-card-text class="text-left">
                <h4>{{ team.level.task.title }}</h4>
                <div>{{ team.level.task.summary }}</div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex pa-1 xs6>
            <v-card>
              <v-card-title primary-title>
                Code
              </v-card-title>
              <v-card-text class="text-left">
                <code>{{ team.code }}</code>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex pa-1 xs6>
            <v-card>
              <v-card-title class="justify-center pb-1">
                Tools
              </v-card-title>
              <SimDialog
                :code="team.code"
                :environments="team.level.task.environments"
              />
              <v-btn
                class="my-2"
                color="success"
                dark
                x-large
                width="90%"
                @click="approve"
              >
                Approve
              </v-btn>
              <v-btn
                class="my-2"
                color="warning"
                dark
                x-large
                width="90%"
                @click="rejecta"
              >
                Almost there!
              </v-btn>
              <v-btn
                class="my-2 mb-4"
                color="error"
                width="90%"
                dark
                x-large
                @click="rejectb"
              >
                Needs more work
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
import { validate } from "@/apiCalls";

export default {
  components: { SimDialog },
  props: ["team", "approve", "rejecta", "rejectb"],
  data: () => ({
    time: "loading...",
    safety: {
      message: "checking...",
      success: false
    }
  }),
  watch: {
    team() {
      // validate
      this.safety.message = "checking...";
      if (this.team) {
        // Bounds for validation are set here
        validate(this.team.code, { width: 11, depth: 11, height: 20 }).then(
          res => {
            this.safety = res.data;
            if (res.data.success) {
              this.safety.message = "Safe";
            }
          }
        );
      }
    }
  },
  mounted() {
    setInterval(() => {
      if (this.team) {
        // load time
        let now = new Date();
        let then = new Date(this.team.time);
        let diff = now.getTime() - then.getTime();

        let msec = diff;

        let mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        if (mm === 0) {
          let ss = Math.floor(msec / 1000);
          msec -= ss * 1000;
          this.time = `${ss} secs ago`;
        } else {
          this.time = `${mm} mins ago`;
        }
      }
    }, 1000);
  }
};
</script>

<style>
code {
  background-color: white !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
