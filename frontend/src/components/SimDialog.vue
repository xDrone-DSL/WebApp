<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click="getAnimation">
      Simulate
    </v-btn>

    <v-dialog v-model="dialog" max-width="800">
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

export default {
  components: { Simulator },
  methods: {
    getAnimation: function() {
      this.animation = [
        {
          action: "up",
          value: 1
        },
        {
          action: "forward",
          value: 2.5
        },
        // {
        //   action: "wait",
        //   value: 2
        // },
        // {
        //   action: "left",
        //   value: 5
        // },
        // {
        //   action: "rotateL",
        //   value: Math.PI / 2
        // },
        // {
        //   action: "backwards",
        //   value: 5
        // },
        // {
        //   action: "rotateR",
        //   value: Math.PI
        // },
        // {
        //   action: "right",
        //   value: 5
        // },
        {
          action: "down",
          value: 1
        }
      ];
      this.dialog = true;
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
