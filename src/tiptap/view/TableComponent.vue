<template>
  <node-view-wrapper class="drag-item" draggable="false">
    <div
      class="drag-handler"
      draggable="true"
      data-drag-handle
      contenteditable="false"
    ></div>
		<div class="tableWrapper">
			<table>
				<node-view-content as="tbody"></node-view-content>
			</table>
		</div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";

export default {
  name: "TableComponent",
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  data() {
    return {
     
    };
  },
  watch: {
    
  },
  computed: {
   
  },
  mounted() {
   
  },
  methods: {
    
  },
};
</script>
