<template>
  <div class="text-center">
    <v-bottom-sheet inset v-model="sheet">
      <template v-slot:activator="{ on }">
        <v-btn color="#501AAC" dark v-on="on">
          Open Task Description Sheet
        </v-btn>
      </template>
      <v-sheet style="height: 85vh">
        <v-list class="text-left mx-5">
          <v-list-item style="padding-left: 2px">
            <div class="overline">{{ advTitle }}</div>
          </v-list-item>
          <v-list-item-subtitle class="subtitle-1">
            {{ taskLevel }}
          </v-list-item-subtitle>
          <v-list-item-title class="display-1 mb-1">
            {{ taskTitle }}
          </v-list-item-title>
          <v-list-item-content class="text-left" style="font-size: 23px">
            {{ description }}
          </v-list-item-content>
        </v-list>

        <v-btn class="mt-6" color="error" @click="sheet = !sheet">
          close
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { getAllAdventures } from "@/apiCalls";

export default {
  name: "TaskDescriptionSheet",
  props: {
    advId: { type: String, required: true },
    taskId: { type: String, required: true }
  },
  data: () => ({
    on: true,
    sheet: false,
    courses: []
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
    advTitle() {
      const currAdv = this.currAdv;
      if (currAdv) {
        return `${currAdv["level"]} - ${currAdv["title"]}`;
      } else {
        return "";
      }
    },
    taskLevel() {
      const currTask = this.currTask;
      if (currTask) {
        return currTask["level"];
      } else {
        return "";
      }
    },
    taskTitle() {
      const currTask = this.currTask;
      if (currTask) {
        return currTask["title"];
      } else {
        return "";
      }
    },
    summary() {
      const currTask = this.currTask;
      if (currTask) {
        return currTask["summary"];
      }
      return "";
    },
    description() {
      const currTask = this.currTask;
      if (currTask) {
        return currTask["description"];
      }
      return "";
    }
  },
  mounted() {
    getAllAdventures()
      .then(advs => (this.courses = advs))
      .catch(err => alert(err));
    this.sheet = true;
  }
};
</script>

<style scoped>
.overline {
  font-size: 14px !important;
}
.subtitle-1 {
  font-size: 23px !important;
}
</style>
