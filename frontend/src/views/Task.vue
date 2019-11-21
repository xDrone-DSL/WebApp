<template>
  <v-app>
    <NavigationDrawer
      :items="courses"
      v-model="drawer"
      :reshow-task="reshowTask"
    />
    <v-app-bar app flat absolute color="deep-purple" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ level }}</v-toolbar-title>
      <v-divider class="ml-5 mr-10" inset vertical></v-divider>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon dark @click="router.push('/explore')">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <TeamDetailMenu />
    </v-app-bar>

    <v-content v-if="showTask">
      <TaskDescriptionSheet class="my-2" :advId="advId" :taskId="taskId" />
      <BlocklyEditor :adv="currAdv" :task="currTask" />
    </v-content>
    <v-content v-else class="justify-center">
      <v-img
        width="50%"
        class="mx-auto my-5"
        :src="require('../assets/next.gif')"
      ></v-img>
      <h1 class="display-2">{{ congratsText }}</h1>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import BlocklyEditor from "@/components/BlocklyEditor";
import TeamDetailMenu from "@/components/TeamDetailMenu";
import TaskDescriptionSheet from "@/components/student/TaskDescriptionSheet";
import { getAllAdventures } from "@/apiCalls";
import router from "@/router.js";
import { socket } from "@/apiCalls";

export default {
  components: {
    NavigationDrawer,
    BlocklyEditor,
    TeamDetailMenu,
    TaskDescriptionSheet
  },
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
    courses: [],
    router: router,
    showTask: true,
    congratsText: "Congrats! Moving you to the next task"
  }),
  computed: {
    currAdv() {
      if (this.courses) {
        return this.courses.find(adv => adv.key === this.advId);
      } else {
        return {};
      }
    },
    currTask() {
      const currAdv = this.currAdv;
      if (currAdv) {
        return currAdv["tasks"].find(task => task.key === this.taskId);
      } else {
        return {};
      }
    },
    level() {
      const currAdv = this.currAdv;
      const currTask = this.currTask;
      if (currAdv && currTask) {
        return `${currAdv["level"]} - ${currTask["level"]}`;
      } else {
        return "";
      }
    },
    title() {
      if (this.courses.length > 0) {
        return this.courses
          .find(adv => adv.key === this.advId)
          ["tasks"].find(task => task.key === this.taskId)["title"];
      }
      return "";
    }
  },
  methods: {
    reshowTask() {
      this.congratsText = "Taking you to the task...";
      this.showTask = false;
      setTimeout(() => {
        this.showTask = true;
        this.congratsText = "Congrats! Moving you to the next task";
      }, 2000);
    }
  },
  mounted() {
    getAllAdventures()
      .then(advs => (this.courses = advs))
      .catch(err => alert(err));

    socket.on("NEXT_TASK", () => {
      const nextTaskIndex =
        this.currAdv["tasks"].findIndex(task => task.key === this.taskId) + 1;
      if (this.currAdv["tasks"].length > nextTaskIndex) {
        this.showTask = false;
        setTimeout(() => {
          this.showTask = true;
          this.$router.push(
            "/explore/" +
              this.currAdv.key +
              "/" +
              this.currAdv["tasks"][nextTaskIndex].key
          );
        }, 2000);
      } else {
        const nextAdvIndex =
          this.courses.findIndex(adv => adv.key === this.advId) + 1;
        if (this.courses.length > nextAdvIndex) {
          this.showTask = false;
          setTimeout(() => {
            this.showTask = true;
            this.$router.push(
              "/explore/" +
                this.courses[nextAdvIndex].key +
                "/" +
                this.courses[nextAdvIndex]["tasks"][0].key
            );
          }, 2000);
        } else {
          // TODO: CONGRATS PAGE
          this.showTask = false;
          setTimeout(() => {
            this.showTask = true;
            this.$router.push("/explore");
          }, 2000);
        }
      }
    });
  }
};
</script>
