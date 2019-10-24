<template>
  <v-layout>
    <div id="toolbox" style="display: none">
      <block type="fly"></block>
      <block type="move"></block>
      <block type="rotate"></block>
    </div>
    <div id="blocklyDiv" style=" height: 800px; width: 1200px;"></div>
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
    // Actually run blockly
    const workspace = Blockly.inject("blocklyDiv", {
      toolbox: document.getElementById("toolbox")
    });
    const myUpdateFunction = () => {
      this.code = Blockly.JavaScript.workspaceToCode(workspace);
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
