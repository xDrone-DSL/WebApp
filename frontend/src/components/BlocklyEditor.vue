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
  beforeCreate() {
    // import blockly files
    let blocklyScript = document.createElement("script");
    blocklyScript.setAttribute("src", "/blockly/blockly_compressed.js");
    document.head.appendChild(blocklyScript);

    let blockScript = document.createElement("script");
    blockScript.setAttribute("src", "/blockly/blocks_compressed.js");
    document.head.appendChild(blockScript);

    let javascriptBlocklyScript = document.createElement("script");
    javascriptBlocklyScript.setAttribute(
      "src",
      "/blockly/javascript_compressed.js"
    );
    document.head.appendChild(javascriptBlocklyScript);

    let EnglishLangScript = document.createElement("script");
    EnglishLangScript.setAttribute("src", "/blockly/msg/js/en.js");
    document.head.appendChild(EnglishLangScript);
  },
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
