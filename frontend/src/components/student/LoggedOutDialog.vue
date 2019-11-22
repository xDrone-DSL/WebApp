<template>
  <v-dialog v-model="dialog" max-width="800" style="z-index: 999999">
    <v-card>
      <v-card-title>You've logged out by the teacher</v-card-title>
      <v-card-text class="headline">
        The teacher says it's time to finish the session! We will take you back
        to the login page when you close the window.
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="green darken-1"
          text
          @click="
            dialog = false;
            $router.push('/login');
            setLoggedOutDialog();
          "
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoggedOutDialog",
  props: {
    setLoggedOutDialog: { type: Function, required: true }
  },
  data() {
    return {
      dialog: true
    };
  }
};
</script>
