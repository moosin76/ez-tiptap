<template>
  <floating-menu
    class="floating menu elevation-3"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
   <header-button :editor="editor" />

    <edit-button
      :editor="editor"
      label="Unorder List"
      icon="mdi-format-list-bulleted"
      action="toggleBulletList"
      active="bulletList"
    />

    <edit-button
      :editor="editor"
      label="Order List"
      icon="mdi-format-list-numbered"
      action="toggleOrderedList"
      active="orderedList"
    />

    <edit-button
      :editor="editor"
      label="Code Block"
      icon="mdi-xml"
      action="toggleCodeBlock"
      active="codeBlock"
    />

    <edit-button
      :editor="editor"
      label="Blockquote"
      icon="mdi-format-indent-increase"
      action="toggleBlockquote"
      active="blockquote"
    />

    <edit-button
      :editor="editor"
      label="Horizontal"
      icon="mdi-minus"
      action="setHorizontalRule"
    />
		
    <popup-button icon="mdi-table" label="Insert Table" :width="500">
      <table-form :editor="editor" />
    </popup-button>
		
  </floating-menu>
</template>

<script>
import { FloatingMenu } from "@tiptap/vue-2";
import EditButton from './components/EditButton.vue';
import HeaderButton from './components/HeaderButton.vue';
import PopupButton from './components/PopupButton.vue';
import TableForm from './components/TableForm.vue';


export default {
  name: "EditFloatMenu",
  components: { FloatingMenu,EditButton, HeaderButton, PopupButton, TableForm, },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>