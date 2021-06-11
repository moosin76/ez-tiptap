<template>
  <color-picker
    :editor="editor"
    label="Table Cell Color"
    icon="mdi-format-color-fill"
		@select="select"
  />
</template>

<script>
import ColorPicker from "./ColorPicker.vue";
export default {
	name : "CellColorButton",
  components: { ColorPicker },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
	methods :{
		select(color) {
			this.editor.chain().focus().setCellAttribute('backgroundColor', color).run();
		}
	}
};
</script>

<style>
</style>