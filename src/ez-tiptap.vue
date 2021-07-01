<template>
  <div v-if="editor">
    <template v-if="editable">
      <edit-top-menu :editor="editor" @uploadImage="uploadImage" />
      <!-- <edit-bubble-menu :editor="editor" />
      <edit-float-menu :editor="editor" /> -->
    </template>
    <editor-content :editor="editor" :class="{ 'ez-edit': editable }" />
  </div>
</template>

<script>
// import "./tiptap/css/tiptap.css";
// import "./tiptap/css/tiptap-dark.css";

import EditTopMenu from "./tiptap/EditTopMenu.vue";
// import EditBubbleMenu from "./EditBubbleMenu.vue";
// import EditFloatMenu from "./EditFloatMenu.vue";

import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Table from "@tiptap/extension-table";
// import Table from './extension/CustomTable';
import TableRow from "@tiptap/extension-table-row";
import TableCell from "./tiptap/extension/CustomTableCell";
import TableHeader from "./tiptap/extension/CustomTableHeader";
// import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "./tiptap/extension/CustomTaskItem";
// import TaskItem from '@tiptap/extension-task-item';
import Dropcursor from "@tiptap/extension-dropcursor";
import CustomLink from "./tiptap/extension/CustomLink";
import CustomCodeBlock from "./tiptap/extension/CustomCodeBlock";
import CustomYoutube from "./tiptap/extension/CustomYoutube";
import TextColor from "./tiptap/extension/TextColor";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "./tiptap/extension/FontSize";
import BackgroundColor from "./tiptap/extension/BackgroundColor";
import Image from "./tiptap/extension/CustomImage";
import LineHeight from "./tiptap/extension/LineHeight";
import TextDecoration from "./tiptap/extension/TextDecoration";
import MarginTop from "./tiptap/extension/MarginTop";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import GlobalDragHandle from "./tiptap/extension/GlobalDragHandle";

export default {
  name: "TiptapEditor",
  components: {
    EditorContent,
    EditTopMenu,
    // EditBubbleMenu,
    // EditFloatMenu,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) return;
      this.editor.commands.setContent(this.value, false);
    },
		editable() {
			this.createEditor();
		}
  },
  mounted() {
    this.createEditor();
  },
  methods: {
    createEditor() {
      if (this.editor) this.editor.destroy();

      this.editor = new Editor({
        extensions: [
          StarterKit,
          Document,
          Paragraph.extend({
            addKeyboardShortcuts() {
              return {
                Tab: () => {
                  return this.editor.commands.insertContent([
                    {
                      type: "text",
                      text: "\t",
                    },
                  ]);
                },
              };
            },
          }),
          Heading,
          Text,
          Highlight.configure({ multicolor: true }),
          Typography,
          Table.configure({
            resizable: true,
          }),
          TableRow,
          TableCell,
          TableHeader,
          TextAlign,
          BulletList,
          OrderedList,
          TaskList,
          TaskItem,
          Dropcursor.extend({
            defaultOptions: {
              ...Dropcursor.options,
              color: "red",
              width: 3,
            },
          }),
          CustomLink.extend({
            defaultOptions: {
              ...CustomLink.options,
              openOnClick: !this.editable,
            },
          }),
          CustomCodeBlock.extend({
						draggable : this.editable,
					}),
          CustomYoutube,
          TextColor,
          TextStyle,
          FontFamily,
          FontSize,
          BackgroundColor,
          Image,
          LineHeight,
          TextDecoration,
          MarginTop,
					GlobalDragHandle,
        ],
        content: this.value,
        onUpdate: () => {
          this.$emit("input", this.editor.getHTML());
        },
        editorProps: {
          attributes: {
            spellcheck: "false",
          },
        },
        editable: this.editable,
      });
    },
    uploadImage(opt) {
      this.$emit("uploadImage", opt);
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
