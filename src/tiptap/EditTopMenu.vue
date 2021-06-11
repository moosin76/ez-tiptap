<template>
  <div class="sticky-menu">
    <div class="top menu elevation-2">
			<!-- <table-menus v-if="isTableMenu" :editor="editor" @uploadImage="uploadImage"/> -->
      <default-menus :editor="editor"  @uploadImage="uploadImage" />
			<table-menus v-if="isTableMenu" :editor="editor"/>
			<image-menus v-if="isImageMenu" :editor="editor"/>
    </div>
  </div>
</template>

<script>
import DefaultMenus from "./Menus/DefaultMenus.vue";
import ImageMenus from './Menus/ImageMenus.vue';
import TableMenus from './Menus/TableMenus.vue';

export default {
  name: "EditTopMenu",
  components: { DefaultMenus, TableMenus, ImageMenus },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
	computed: {
		isTableMenu() {
			return this.editor.can().addColumnBefore();
		},
		isImageMenu() {
			return this.editor.isActive('image');
		}
	},
	methods : {
		uploadImage(opt) {
			this.$emit('uploadImage', opt);
		},
		test() {
			
			console.log(this.editor);
		}
	}
};
</script>

<style>
</style>