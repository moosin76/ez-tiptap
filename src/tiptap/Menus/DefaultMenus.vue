<template>
  <div>
    <edit-button :editor="editor" label="undo(Ctrl+Z)" icon="mdi-undo" action="undo" />
    <edit-button :editor="editor" label="redo(Ctrl+Shift+Z)" icon="mdi-redo" action="redo" />

    <header-button :editor="editor" class="ml-1" />
    <line-height-button :editor="editor" />
    <margin-top-button :editor="editor" />

    <edit-button
      :editor="editor"
      label="Bold(Ctrl+B)"
      icon="mdi-format-bold"
      action="toggleBold"
      active="bold"
      class="ml-1"
    />

    <edit-button
      :editor="editor"
      label="Italic(Ctrl+L)"
      icon="mdi-format-italic"
      action="toggleItalic"
      active="italic"
    />
		<edit-button
      :editor="editor"
      label="Strike(Ctrl+Shift+X)"
      icon="mdi-format-strikethrough"
      action="toggleStrike"
      active="strike"
    />
    <edit-button
      :editor="editor"
      label="Inline Code(Ctrl+E)"
      icon="mdi-code-tags"
      action="toggleCode"
      active="code"
    />

    <edit-button
      :editor="editor"
      label="Text Format Clear"
      icon="mdi-format-clear"
      action="removeEmptyTextStyle"
      active="textStyle"
      class="ml-1"
    />
    

    <edit-button
      :editor="editor"
      label="Under Line"
      icon="mdi-format-underline"
      action="setTextDecoration"
      active="textDecoration"
      :option="{ textDecoration: 'underline' }"
    />
    <font-family-button :editor="editor" />
    <fontsize-button :editor="editor" />

    <text-color-button :editor="editor" />
    <bg-color-button :editor="editor" />
		
		<edit-button
      :editor="editor"
      label="Align Left(Ctrl+Shift-L)"
      icon="mdi-format-align-left"
      action="setTextAlign"
      active="code"
      :option="{ textAlign: 'left' }"
      class="ml-1"
    />
    <edit-button
      :editor="editor"
      label="Align Center(Ctrl+Shift-E)"
      icon="mdi-format-align-center"
      action="setTextAlign"
      active="code"
      :option="{ textAlign: 'center' }"
    />
    <edit-button
      :editor="editor"
      label="Align Right(Ctrl+Shift-R)"
      icon="mdi-format-align-right"
      action="setTextAlign"
      active="code"
      :option="{ textAlign: 'right' }"
    />
    <edit-button
      :editor="editor"
      label="Align Justify(Ctrl+Shift-J)"
      icon="mdi-format-align-justify"
      action="setTextAlign"
      active="code"
      :option="{ textAlign: 'justify' }"
    />

    <edit-button
      :editor="editor"
      label="Horizontal"
      icon="mdi-minus"
      action="setHorizontalRule"
      class="ml-1"
    />

    <link-button :editor="editor" />
    <emoji-button :editor="editor" />

    <edit-button
      :editor="editor"
      label="Blockquote(Ctrl+Shift+B)"
      icon="mdi-format-indent-increase"
      action="toggleBlockquote"
      active="blockquote"
      class="ml-1"
    />
		<edit-button
      :editor="editor"
      label="Order List(Ctrl+Shift+7)"
      icon="mdi-format-list-numbered"
      action="toggleOrderedList"
      active="orderedList"
    />
    <edit-button
      :editor="editor"
      label="Unorder List(Ctrl+Shift+8)"
      icon="mdi-format-list-bulleted"
      action="toggleBulletList"
      active="bulletList"
    />
    <edit-button
      :editor="editor"
      label="Task List(Ctrl+Shift+9)"
      icon="mdi-format-list-checks"
      action="toggleTaskList"
      active="taskList"
    />

    <edit-button
      :editor="editor"
      label="Code Block(Ctrl+Alt+C)"
      icon="mdi-xml"
      action="toggleCodeBlock"
      active="codeBlock"
      class="ml-1"
    />

    <popup-button icon="mdi-table" label="Insert Table" :width="500">
      <table-form :editor="editor" />
    </popup-button>

    <image-button :editor="editor" @uploadImage="uploadImage" />
    <youtube-button :editor="editor" />
  </div>
</template>

<script>
import BgColorButton from "../components/BgColorButton.vue";
import EditButton from "../components/EditButton.vue";
import FontFamilyButton from "../components/FontFamilyButton.vue";
import FontsizeButton from "../components/FontsizeButton.vue";
import HeaderButton from "../components/HeaderButton.vue";
import ImageButton from "../components/ImageButton.vue";
import LineHeightButton from "../components/LineHeightButton.vue";
import LinkButton from "../components/LinkButton.vue";
import MenuButton from "../components/MenuButton.vue";
import PopupButton from "../components/PopupButton.vue";
import TableForm from "../components/TableForm.vue";
import TextColorButton from "../components/TextColorButton.vue";
import YoutubeButton from "../components/YoutubeButton.vue";
import TableMenus from "./TableMenus.vue";
import EmojiButton from "../components/EmojiButton.vue";
import MarginTopButton from "../components/MarginTopButton.vue";

export default {
  name: "DefaultMenus",
  components: {
    EditButton,
    HeaderButton,
    PopupButton,
    TableForm,
    MenuButton,
    LinkButton,
    YoutubeButton,
    BgColorButton,
    TextColorButton,
    FontFamilyButton,
    FontsizeButton,
    ImageButton,
    LineHeightButton,
    TableMenus,
    EmojiButton,
    MarginTopButton,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    uploadImage(opt) {
      this.$emit("uploadImage", opt);
    },
  },
};
</script>