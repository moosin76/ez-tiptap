<template>
  <color-picker
    :editor="editor"
    label="Text Color"
    icon="mdi-format-color-text"
		@select="select"
		initColor="#FF9900FF"
  />
</template>

<script>
import ColorPicker from "./ColorPicker.vue";
export default {
	name : "TextColorButton",
  components: { ColorPicker },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
	methods :{
		select(color) {
			this.editor.chain().focus().setTextColor({color}).run()
		}
	}
};
</script>

<style>
</style>