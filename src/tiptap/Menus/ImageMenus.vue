<template>
  <div>
    <edit-button
      :editor="editor"
      label="Float None"
      icon="mdi-format-float-none"
      action="setImageFloat"
      :option="{ float: 'none' }"
			:color="noneActive"
    />
    <edit-button
			ref="floatLeft"
      :editor="editor"
      label="Float Left"
      icon="mdi-format-float-left"
      action="setImageFloat"
      :option="{ float: 'left' }"
      active="left"
    />
    <edit-button
			ref="floatRight"
      :editor="editor"
      label="Float Right"
      icon="mdi-format-float-right"
      action="setImageFloat"
      :option="{ float: 'right' }"
      active="right"
    />

    <image-scale-button :editor="editor" class="ml-1" />
    
  </div>
</template>

<script>
import EditButton from "../components/EditButton.vue";
import ImageScaleButton from "../components/ImageScaleButton.vue";

export default {
  name: "ImageMenus",
  components: { EditButton, ImageScaleButton },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
	computed : {
		noneActive () {
			const left = this.editor.isActive({float:'left'}) ;
			const right = this.editor.isActive({float:'right'}) ;
			return left ^ right ? null : 'primary';
		}
	}
};
</script>