<template>
  <v-layout>
    <div id="toolbox" style="display: none">
      <block type="fly"></block>
      <block type="move"></block>
      <block type="rotateRight"></block>
      <block type="rotateLeft"></block>
    </div>
    <div id="toolbox2" style="display: none">
      <block type="fly" disabled="true"></block>
      <block type="move"></block>
      <block type="rotateRight"></block>
      <block type="rotateLeft"></block>
    </div>
    <div id="blocklyDiv" style="height: 800px; width: 1200px;"></div>
    <textarea id="textarea" style="height: 800px; width: 300px;"></textarea>
    <SimDialog :code="code" />
    <v-btn big @click="flyWrapper">Request Flight</v-btn>
  </v-layout>
</template>

<script>
import * as Blockly from "blockly-xdronedsl";
import SimDialog from "./SimDialog";
import { socket } from "../apiCalls";

export default {
  components: { SimDialog },
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
  methods: {
    flyWrapper() {
      socket.emit("REQUESTFLIGHT", {
        name:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
        id: 2,
        task: {
          name: "Adv1-Task2",
          summary: "This is a short description of task 2 adventure 1"
        },
        code: this.code
      });
    }
  }
};
</script>

<style>
input {
  background-color: white;
}
</style>
