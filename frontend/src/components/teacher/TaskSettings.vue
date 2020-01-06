<template>
  <div>
    <v-card class="ma-3" height="60" @click="show = true">
      <v-card-title primary-title>
        {{ internalTask.level }} - {{ internalTask.title }}
      </v-card-title>
    </v-card>
    <v-dialog persistent v-model="show" max-width="1000">
      <v-card>
        <v-card-title class="headline">
          Modify task
        </v-card-title>
        <v-row class="ma-2">
          <v-col>
            <v-text-field
              v-model="internalTask.level"
              label="Level"
            ></v-text-field>
            <v-text-field
              v-model="internalTask.key"
              disabled
              label="Key"
            ></v-text-field>
            <v-text-field
              v-model="internalTask.title"
              label="Title"
            ></v-text-field>
            <v-text-field
              v-model="internalTask.summary"
              label="Summary"
            ></v-text-field>
            <v-textarea
              auto-grow
              v-model="internalTask.description"
              label="Description"
            ></v-textarea>
          </v-col>
          <v-col>
            <v-card height="330px">
              <v-card-text>
                <Simulator
                  v-if="sim"
                  :demo="true"
                  :animation="[]"
                  :environments="internalTask.environments"
                ></Simulator>
              </v-card-text>
            </v-card>
            <v-row wrap>
              <v-col
                class="col-4"
                v-for="(environment, i) in internalTask.environments"
                :key="i"
              >
                <v-card>
                  <v-card-title primary-title>
                    {{ environment.object }}
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="environment.position.x"
                      label="X"
                    ></v-text-field>
                    <v-text-field
                      v-model="environment.position.y"
                      label="Y"
                    ></v-text-field>
                    <v-text-field
                      v-model="environment.rotation"
                      label="Rotation"
                    ></v-text-field>
                    <v-text-field
                      v-model="environment.scale"
                      label="Scale"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="
              updateTask(advKey, task.key, internalTask);
              show = false;
            "
          >
            <div v-if="JSON.stringify(task) != JSON.stringify(internalTask)">
              Save Locally and Close
            </div>
            <div v-else>Close</div>
          </v-btn>
          <v-btn
            v-if="JSON.stringify(task) != JSON.stringify(internalTask)"
            color="primary"
            text
            @click="
              show = false;
              internalTask = JSON.parse(JSON.stringify(task));
            "
          >
            Undo all changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Simulator from "@/components/Simulator";

export default {
  components: { Simulator },
  props: {
    task: { type: Object, required: true },
    advKey: { type: String, required: true },
    updateTask: { type: Function, required: true }
  },
  data() {
    return {
      sim: true,
      show: false,
      internalTask: {}
    };
  },
  watch: {
    internalTask: {
      deep: true,
      handler() {
        this.sim = false;
        setTimeout(() => {
          this.sim = true;
        }, 1000);
      }
    }
  },
  mounted() {
    this.internalTask = JSON.parse(JSON.stringify(this.task));
  }
};
</script>
