<template>
  <v-scroll-y-reverse-transition>
    <v-card v-if="!team.hide" class="mx-auto" @click="setCurrTeamUID(team.uid)">
      <v-card-title>
        {{ team.name }}
      </v-card-title>
      <v-card-subtitle class="text-left">
        <div>{{ team.level.adv.level }}</div>
        <div>{{ team.level.task.level }}</div>
        <div>{{ time }}</div>
      </v-card-subtitle>
    </v-card>
  </v-scroll-y-reverse-transition>
</template>

<script>
export default {
  props: ["team", "setCurrTeamUID"],
  data: () => ({
    time: "loading..."
  }),
  mounted() {
    setInterval(() => {
      let now = new Date();
      let then = new Date(this.team.time);
      let diff = now.getTime() - then.getTime();

      let msec = diff;

      let mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      if (mm === 0) {
        let ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        this.time = `${ss} secs ago`;
      } else {
        this.time = `${mm} mins ago`;
      }
    }, 1000);
  }
};
</script>
