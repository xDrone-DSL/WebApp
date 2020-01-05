<template>
  <v-list-item @click="show = true">
    <v-list-item-icon>
      <v-icon>mdi-settings</v-icon>
    </v-list-item-icon>
    <v-list-item-content>Task Settings</v-list-item-content>

    <v-dialog persistent v-model="show" max-width="900">
      <v-card>
        <v-card-title class="headline">
          Task Settings
        </v-card-title>

        <v-list>
          <v-list-item v-for="adv in advs" :key="adv.key">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <h3>{{ adv.level }} - {{ adv.title }}</h3>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-slide-group show-arrows>
                    <v-slide-item v-for="task in adv.tasks" :key="task.key">
                      <TaskSettings
                        :task="task"
                        :updateTask="internalTask => (task = internalTask)"
                      ></TaskSettings>
                    </v-slide-item>
                    <v-slide-item>
                      <v-card class="ma-3" height="60">
                        <v-card-actions>
                          <span class="pa-1">
                            <v-icon large>mdi-plus-circle-outline</v-icon>
                          </span>
                        </v-card-actions>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <h3>New Adventure</h3>
              <span class="pa-1">
                <v-icon large>mdi-plus-circle-outline</v-icon>
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" disabled text @click="show = false">
            Save
          </v-btn>
          <v-btn color="primary" text @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { getAllAdventures } from "@/apiCalls";
import TaskSettings from "@/components/teacher/TaskSettings";

export default {
  components: { TaskSettings },
  data() {
    return {
      show: false,
      advs: []
    };
  },
  mounted() {
    getAllAdventures()
      .then(advs => (this.advs = advs))
      .catch(err => alert(err));
  },
  methods: {}
};
</script>
