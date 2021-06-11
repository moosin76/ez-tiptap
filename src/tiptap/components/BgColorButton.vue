<template>
  <color-picker
    :editor="editor"
    label="Background Color"
    icon="mdi-format-color-highlight"
		@select="select"
		initColor="#BBDEFBFF"
  />
</template>

<script>
import ColorPicker from "./ColorPicker.vue";
export default {
	name : "BgColorButton",
  components: { ColorPicker },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
	methods :{
		select(backgroundColor) {
			this.editor.chain().focus().setBackgroundColor({backgroundColor}).run()
		}
	}
};
</script>

<style>
</style>