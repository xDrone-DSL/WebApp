<template>
  <div>
    <v-btn
      class="my-2"
      width="90%"
      color="primary white--text"
      x-large
      @click="getAnimation"
      :disabled="code === ''"
    >
      Simulate
    </v-btn>

    <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
      <v-card>
        <Simulator
          v-if="dialog"
          :animation="animation"
          :environments="environments"
        />
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Simulator from "./Simulator";
import { simulate } from "../apiCalls";

export default {
  components: { Simulator },
  props: {
    code: { type: String, required: true },
    environments: { type: Array, required: true }
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
