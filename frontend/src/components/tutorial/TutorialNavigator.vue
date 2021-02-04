<template>
  <v-navigation-drawer
    style="z-index: 10000"
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    absolute
    temporary
    app
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        style="margin-left: -50px"
        link
        @click="redirect(item.id)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import router from "@/router";

export default {
  name: "TutorialNavigator",
  props: {
    value: { type: Boolean, default: false },
    items: { type: Array, required: true }
  },
  computed: {
    groupName() {
      return localStorage.getItem("uid");
    }
  },
  methods: {
    redirect(tutId) {
      router.push(`/tutorial/${tutId}`);
    }
  }
};
</script>
