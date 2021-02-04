<template>
  <v-layout>
    <v-flex xs6 pa-1>
      <v-card>
        <v-card-text class="headline">
          {{ tutorial.title }}
        </v-card-text>
        <v-card-text multi-line class="body-1 text-block">
          {{ tutorial.description }}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6 pa-1>
      <v-layout>
        <div id="blocklyDiv" style="height: 75vh; width: 500px;"></div>
        <v-card
          outlined
          tile
          style="height: 75vh; width: 300px; text-align: left;"
        >
          <v-textarea
            id="textarea"
            disabled
            readonly
            class="code-textarea"
            style="height: 100%; width: 100%;"
          />
        </v-card>
      </v-layout>
      <v-row height="5vh">
        <v-col
          ><SimDialog :code="tutorial.code || ''" :environments="[]"
        /></v-col>
        <v-col
          ><v-btn
            class="my-2"
            width="90%"
            color="primary white--text"
            x-large
            @click="openPlayground"
          >
            Try yourself!
          </v-btn>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import SimDialog from "../SimDialog";
import * as Blockly from "blockly-xdronedsl";
import { getTutorial } from "@/apiCalls";

export default {
  name: "TutorialSim",
  components: { SimDialog },
  props: {
    tutorialId: { type: String, required: true }
  },
  data() {
    return {
      tutorial: {}
    };
  },
  methods: {
    openPlayground() {
      //TODO: create a blank playground without any task??
      // let route = this.$router.resolve("/playground");
      let route = this.$router.resolve("/explore/adventure1/task1");
      window.open(route.href, "_blank");
    }
  },
  async mounted() {
    const workspace = Blockly.inject("blocklyDiv", {
      readOnly: true
    });
    // const saveBlock = () => {
    //   var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    //   var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    //   // do whatever you want to this xml
    //   console.log(xmlText);
    // };
    const loadBlock = xml => {
      // xml is the same block xml you stored
      if (typeof xml != "string" || xml.length < 5) {
        return false;
      }
      try {
        var dom = Blockly.Xml.textToDom(xml);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(workspace, dom);
        return true;
      } catch (e) {
        return false;
      }
    };

    await getTutorial(this.tutorialId)
      .then(tutorial => {
        this.tutorial = tutorial;
      })
      .catch(err => alert(err));
    loadBlock(this.tutorial.xml);

    document.getElementById("textarea").value = this.tutorial.code;
  }
};
</script>

<style>
.code-textarea textarea {
  color: black !important;
  font-family: "Courier New", monospace;
}
</style>

<style scoped>
.text-block {
  white-space: pre !important;
}
</style>
