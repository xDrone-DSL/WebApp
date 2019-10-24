<template>
  <v-layout>
    <div id="toolbox" style="display: none">
      <block type="fly"></block>
      <block type="move"></block>
      <block type="rotate"></block>
    </div>
    <div id="blocklyDiv" style=" height: 800px; width: 1200px;"></div>
    <textarea id="textarea" style="height: 800px; width: 300px;"></textarea>
    <SimDialog />
  </v-layout>
</template>

<script>
import * as Blockly from "blockly-xdronedsl";
import SimDialog from "./SimDialog";

export default {
  components: { SimDialog },
  mounted() {
    // Actually run blockly
    const workspace = Blockly.inject("blocklyDiv", {
      toolbox: document.getElementById("toolbox")
    });
    function myUpdateFunction() {
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      document.getElementById("textarea").value = code;
    }
    workspace.addChangeListener(myUpdateFunction);
  }
};
</script>
