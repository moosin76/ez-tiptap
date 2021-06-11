<template>
  <node-view-wrapper class="drag-item" draggable="false">
    <div
      class="drag-handler"
      draggable="true"
      data-drag-handle
      contenteditable="false"
    ></div>
    <div class="code-block elevation-4">
      <div class="code-block-info d-flex">
        
          <v-text-field
            v-model="filename"
            dense
            hide-details
            solo
            :clearable="editor.options.editable"
            :label="editor.options.editable ? 'Code description' : ''"
            :readonly="!editor.options.editable"
          ></v-text-field>
        
        <div style="max-width:240px">
          <v-autocomplete
            v-if="editor.options.editable"
            v-model="lang"
            :items="languages"
            prefix="language :"
            dense
            hide-details
            solo
          ></v-autocomplete>
          <v-text-field
            v-else
            :value="lang.toUpperCase()"
            dense
            hide-details
            solo
            prefix="language :"
            label="Not Selected"
            class="lang-right"
            :disabled="true"
          >
          </v-text-field>
        </div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              fab
              small
              tile
              elevation="0"
              @click="contentCopy"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>코드 복사</span>
        </v-tooltip>
        <v-tooltip top v-if="editor.options.editable">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              fab
              small
              tile
              elevation="0"
              @click="clearCodeblock"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>삭제</span>
        </v-tooltip>
      </div>
      <pre><node-view-content as="code" /></pre>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";

export default {
  name: "CodeBlockComponent",
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  data() {
    return {
      lang: '',
      languages: this.extension.options.lowlight.listLanguages(),
    };
  },
  watch: {
    lang() {
      this.selectedLanguage = this.lang;
    },
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language;
      },
      set(language) {
        this.updateAttributes({ language });
      },
    },
    filename: {
      get() {
        return this.node.attrs.filename;
      },
      set(filename) {
        this.updateAttributes({ filename });
      },
    },
  },
  mounted() {
    const { language } = this.node.attrs;
    if (language) {
      this.lang = language.split(" ")[0];
    }
  },
  methods: {
    contentCopy() {
      const el = document.createElement("textarea");
      el.value = this.node.firstChild.text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$toast.info("클립보드로 복사하였습니다.");
    },
    clearCodeblock() {
      this.editor.chain().focus().toggleCodeBlock().run();
    },
  },
};
</script>

<style>
</style>