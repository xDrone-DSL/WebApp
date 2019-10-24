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
      <v-subheader>Group number</v-subheader>
      <v-list-item-content>
        <v-list-item-title>{{ groupNumber }}</v-list-item-title>
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
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.tasks"
          :key="subItem.title"
          style="margin-left: -50px"
          link
          @click="redirect(item.key, subItem.key)"
        >
          <v-list-item-content>
            <v-list-item-subtitle
              v-text="subItem.title"
              class="text-left"
            ></v-list-item-subtitle>
            <v-list-item-title v-text="subItem.subtitle"></v-list-item-title>
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
    groupNumber: { type: Number, default: 1 },
    items: { type: Array, required: true }
  },
  methods: {
    redirect(advId, taskId) {
      router.push(`/explore/${advId}/${taskId}`);
    }
  }
};
</script>
