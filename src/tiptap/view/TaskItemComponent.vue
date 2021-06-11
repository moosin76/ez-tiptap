<template>
  <node-view-wrapper class="tasklist">
    <v-checkbox
      v-model="checked"
      dense
      hide-details
      class="tasklist-check ma-0 pa-0"
			:readonly="!editor.isEditable"
    ></v-checkbox>
    <node-view-content></node-view-content>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";
export default {
  name: "TaskItemComponent",
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  data() {
    return {};
  },
  computed: {
    checked: {
      get() {
        return this.node.attrs.checked;
      },
      set(checked) {
        this.updateAttributes({ checked });
      },
    },
  },
};
</script>

<style>
</style>