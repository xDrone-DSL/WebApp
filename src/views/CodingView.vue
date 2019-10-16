<template>
  <v-app id="coding-view">
    <NavigationDrawer v-model="drawer" :items="items" />
    <v-app-bar absolute color="#fcb69f" dark collapse-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import NavigationDrawer from "../components/NavigationDrawer.vue";

export default {
  name: "CodingView",
  components: { NavigationDrawer },
  data: () => ({
    drawer: false,
    items: [
      {
        key: "adventure1",
        title: "Adventure I",
        items: [
          {
            title: "Lesson 1",
            key: "lesson1",
            subtitle: "New to Drone"
          }
        ]
      },
      {
        key: "adventure2",
        title: "Adventure II",
        items: [
          {
            title: "Lesson 1",
            key: "lesson1",
            subtitle: "Be Bolder"
          }
        ]
      },
      {
        key: "adventure3",
        title: "Adventure III",
        items: [
          {
            title: "Lesson 1",
            key: "lesson1",
            subtitle: "Let's Python"
          }
        ]
      }
    ]
  }),
  props: {
    title: { type: String, default: "Lesson 1" }
  }
};
</script>
