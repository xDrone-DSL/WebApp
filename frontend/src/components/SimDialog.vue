<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click="getAnimation">
      Simulate
    </v-btn>

    <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
      <v-card>
        <Simulator v-if="dialog" :animation="animation" />
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Simulator from "./Simulator";
import { simulate } from "../apiCalls";

export default {
  components: { Simulator },
  props: {
    code: { type: String, required: true }
  },
  methods: {
    getAnimation: function() {
      simulate(this.code).then(res => {
        this.animation = res.data.commands;
        this.dialog = true;
      });
    }
  },
  data() {
    return {
      animation: [],
      dialog: false
    };
  }
};
</script>
