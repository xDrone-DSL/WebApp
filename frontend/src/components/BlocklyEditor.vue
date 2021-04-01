<template>
  <div>
    <v-layout>
      <div id="toolbox" style="display: none">
        <block type="fly"></block>
        <block type="move"></block>
        <block type="rotateRight"></block>
        <block type="rotateLeft"></block>
        <block type="repeat"></block>
      </div>
      <div id="toolbox2" style="display: none">
        <block type="fly" disabled="true"></block>
        <block type="move"></block>
        <block type="rotateRight"></block>
        <block type="rotateLeft"></block>
        <block type="repeat"></block>
      </div>
      <div id="blocklyDiv" style="height: 75vh; width: 1200px;"></div>
      <v-card
        outlined
        tile
        style="height: 75vh; width: 300px; text-align: left;"
      >
        <textarea id="textarea" disabled style="height: 100%; width: 100%;" />
      </v-card>
    </v-layout>
    <v-row height="5vh">
      <v-col><SimDialog :code="code" :environments="task.environments"/></v-col>
      <v-col><WaitingDialog :code="code" :level="level"/></v-col>
    </v-row>
    <FeedbackDialog />
  </div>
</template>

<script>
import * as Blockly from "blockly-xdronedsl";
import SimDialog from "./SimDialog";
import WaitingDialog from "./student/WaitingDialog";
import FeedbackDialog from "./student/FeedbackDialog";

export default {
  components: { FeedbackDialog, WaitingDialog, SimDialog },
  props: {
    adv: { type: Object, required: true },
    task: { type: Object, required: true }
  },
  data() {
    return {
      code: ""
    };
  },
  mounted() {
    const toolbox = document.getElementById("toolbox");
    const toolbox2 = document.getElementById("toolbox2");
    // Actually run blockly
    const workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      scrollbars: false,
      trashcan: true
    });
    const myUpdateFunction = () => {
      this.code = Blockly.JavaScript.workspaceToCode(workspace);
      if (this.code.includes("fly")) {
        workspace.updateToolbox(toolbox2);
      } else {
        workspace.updateToolbox(toolbox);
      }
      document.getElementById("textarea").value = this.code;
    };
    workspace.addChangeListener(myUpdateFunction);
  },
  computed: {
    level() {
      return {
        adv: this.adv,
        task: this.task
      };
    }
  }
};
</script>

<style>
input {
  background-color: white;
}
</style>
