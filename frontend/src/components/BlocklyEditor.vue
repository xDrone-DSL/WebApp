<template>
  <v-layout>
    <div id="toolbox" style="display: none">
      <block type="fly"></block>
      <block type="move"></block>
      <block type="rotate"></block>
    </div>
    <div id="blocklyDiv" style=" height: 800px; width: 1200px;"></div>
    <textarea id="textarea" style="height: 800px; width: 300px;"></textarea>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    // Actually run blockly
    var workspace = Blockly.inject("blocklyDiv", {
      toolbox: document.getElementById("toolbox")
    });
    function myUpdateFunction() {
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      document.getElementById("textarea").value = code;
    }
    workspace.addChangeListener(myUpdateFunction);
  }
};
</script>
