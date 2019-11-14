<template>
  <v-navigation-drawer
    style="z-index: 10000"
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    absolute
    temporary
    app
  >
    <v-list-item>
      <v-subheader>Group Name</v-subheader>
      <v-list-item-content>
        <v-list-item-title>{{ groupName }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.key"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content class="text-left">
            <v-list-item-title v-text="item.level"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.tasks"
          :key="subItem.key"
          style="margin-left: -50px"
          link
          @click="redirect(item.key, subItem.key)"
        >
          <v-list-item-content>
            <v-list-item-subtitle
              v-text="subItem.level"
              class="text-left"
            ></v-list-item-subtitle>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import router from "@/router.js";

export default {
  name: "NavigationDrawer",
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
    redirect(advId, taskId) {
      router.push(`/explore/${advId}/${taskId}`);
    }
  }
};
</script>
