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

    <v-dialog v-model="errorCode" max-width="800" style="z-index: 999999">
      <v-card>
        <v-card-title>
          <v-icon color="warning">mdi-alert</v-icon>
          Your code is invalid!
        </v-card-title>
        <v-card-text class="headline">
          All code must be within the fly clause. Please fix your code before
          simulating.
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="errorCode = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      if (
        // code starts with 'f'
        this.code[0] === "f" &&
        // code ends with '}'
        this.code[this.code.length - 1] === "}" &&
        // code contains only 1 'fly()'
        (this.code.match(/fly()/g) || []).length === 1
      ) {
        simulate(this.code).then(res => {
          this.animation = res.data.commands;
          this.dialog = true;
        });
      } else {
        this.errorCode = true;
      }
    }
  },
  data() {
    return {
      animation: [],
      dialog: false,
      errorCode: false
    };
  }
};
</script>
