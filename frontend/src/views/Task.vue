<template>
  <v-app id="coding-view">
    <NavigationDrawer :items="courses" v-model="drawer" />
    <v-app-bar app absolute color="deep-purple" dark collapse-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ level }}</v-toolbar-title>
      <v-divider class="ml-5 mr-10" inset vertical></v-divider>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <BlocklyEditor />
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "../components/NavigationDrawer";
import BlocklyEditor from "../components/BlocklyEditor";
import { getAllAdventures } from "../apiCalls";

export default {
  components: { NavigationDrawer, BlocklyEditor },
  props: {
    advId: { type: String, required: true },
    taskId: { type: String, required: true }
  },
  data: () => ({
    currSession: {
      adventure: 0,
      task: 0
    },
    drawer: false,
    courses: []
  }),
  methods: {
    input(event) {
      console.log(event);
    }
  },
  computed: {
    level() {
      return `${this.advId} - ${this.taskId}`;
    },
    title() {
      if (this.courses.length > 0) {
        return this.courses
          .find(adv => adv.key === this.advId)
          ["tasks"].find(task => task.key === this.taskId)["subtitle"];
      }
      return [];
    }
  },
  mounted() {
    getAllAdventures()
      .then(advs => (this.courses = advs))
      .catch(err => alert(err));
  }
};
</script>
