<template>
  <v-app>
    <TutorialNavigator :items="tutorialBriefs" v-model="drawer" />
    <v-app-bar app flat absolute color="gray" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>xDrone Tutorial</v-toolbar-title>
      <v-divider class="ml-5 mr-10" inset vertical></v-divider>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon dark @click="router.push('/explore')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <TutorialSim :tutorialId="tutorialId" :key="tutorialId"></TutorialSim>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TutorialNavigator from "@/components/tutorial/TutorialNavigator";
import TutorialSim from "@/components/tutorial/TutorialSim";
import { getAllTutorialBriefs } from "@/apiCalls";
export default {
  name: "Tutorial",
  components: { TutorialNavigator, TutorialSim },
  props: { tutorialId: { type: String, required: true } },
  computed: {
    title() {
      if (this.tutorialBriefs.length > 0) {
        return this.tutorialBriefs.find(t => t.id === this.tutorialId)["title"];
      }
      return "";
    }
  },
  data: () => ({
    drawer: false,
    tutorialBriefs: []
  }),
  mounted() {
    getAllTutorialBriefs()
      .then(tutorialBriefs => (this.tutorialBriefs = tutorialBriefs))
      .catch(err => alert(err));
  }
};
</script>

<style scoped></style>
