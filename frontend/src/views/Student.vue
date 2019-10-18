<template>
  <v-app id="coding-view">
    <NavigationDrawer v-model="drawer" :items="items" />
    <v-app-bar absolute color="deep-purple" dark collapse-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ level }}</v-toolbar-title>
      <v-divider class="ml-5 mr-10" inset vertical></v-divider>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
  </v-app>
</template>

<script>
import NavigationDrawer from "../components/NavigationDrawer";
import BlocklyEditor from "../components/BlocklyEditor";

export default {
  components: { NavigationDrawer, BlocklyEditor },
  data: () => ({
    drawer: false,
    items: [
      {
        key: "adventure1",
        title: "Adventure I",
        items: [
          {
            title: "Task 1",
            key: "task1",
            subtitle: "New to Drone"
          },
          {
            title: "Task 2",
            key: "task2",
            subtitle: "Move Forwards"
          },
          {
            title: "Task 3",
            key: "task3",
            subtitle: "Turn Left!"
          }
        ]
      },
      {
        key: "adventure2",
        title: "Adventure II",
        items: [
          {
            title: "Task 1",
            key: "task1",
            subtitle: "Be Bolder"
          },
          {
            title: "Task 2",
            key: "task2",
            subtitle: "Advanced Movement"
          }
        ]
      },
      {
        key: "adventure3",
        title: "Adventure III",
        items: [
          {
            title: "Task 1",
            key: "task1",
            subtitle: "Let's Python"
          }
        ]
      }
    ]
  }),
  computed: {
    level() {
      return `${this.items[0].title} - ${this.items[0].items[0].title}`;
    },
    title() {
      return this.items[0].items[0].subtitle;
    }
  }
};
</script>
