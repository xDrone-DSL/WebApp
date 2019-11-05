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
    <v-btn big @click="flyWrapper">Fly</v-btn>
  </v-layout>
</template>

<script>
import * as Blockly from "blockly-xdronedsl";
import SimDialog from "./SimDialog";
import { fly } from "../apiCalls";

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
      fly(this.code);
    }
  }
};
</script>


<style>
input {
  background-color: white;
}
</style>