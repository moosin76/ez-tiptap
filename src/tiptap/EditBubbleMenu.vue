<template>
  <bubble-menu
    class="bubble menu elevation-3"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <edit-button
      :editor="editor"
      label="Bold"
      icon="mdi-format-bold"
      action="toggleBold"
      active="bold"
    />
    <edit-button
      :editor="editor"
      label="Italic"
      icon="mdi-format-italic"
      action="toggleItalic"
      active="italic"
    />
    <edit-button
      :editor="editor"
      label="Strike"
      icon="mdi-format-strikethrough"
      action="toggleStrike"
      active="strike"
    />

    <edit-button
      :editor="editor"
      label="Code"
      icon="mdi-code-tags"
      action="toggleCode"
      active="code"
    />
		<link-button :editor="editor"/>
  </bubble-menu>
</template>

<script>
import { BubbleMenu } from "@tiptap/vue-2";
import EditButton from "./components/EditButton.vue";
import LinkButton from './components/LinkButton.vue';

export default {
  name: "EditBubbleMenu",
  components: { BubbleMenu, EditButton, LinkButton },
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