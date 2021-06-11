<template>
  <div>
    <v-menu ref="menu" v-model="menu" offset-y max-height="260">
      <template v-slot:activator="{ attrs: menuAttrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="{ ...on }"
              v-bind="{ ...menuAttrs, ...attrs }"
              tile
              fab
              depressed
              x-small
              class="pl-2 pr-0 tiptap-menu-button"
              @click="toggleMenu"
            >
              <v-icon>mdi-format-font</v-icon>
              <v-icon x-small class="ml-n1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          Font Family
        </v-tooltip>
      </template>

      <div>
        <v-btn
          block
          tile
          @click="setDefaultFont"
          class="text-none"
          :class="{ primary: isActive }"
        >
          기본(Roboto)
          <v-spacer></v-spacer>
        </v-btn>
      </div>
      <v-divider />
      <div v-for="font in fonts" :key="font.label" >
        <v-divider v-if="font.div"></v-divider>
        <font-famliy-button-item
          v-else
          :editor="editor"
          :label="font.label"
          :font="font.font"
        />
      </div>
    </v-menu>
  </div>
</template>

<script>
import FontFamliyButtonItem from "./FontFamliyButtonItem.vue";

export default {
  components: { FontFamliyButtonItem },
  name: "FontFamilyButton",
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      defaultFont: { label: "Roboto", font: "Roboto, sans-serif" },
      fonts: [
        { label: "노토 고딕", font: "Noto Sans KR, sans-serif" },
        { label: "도현", font: "Do Hyeon, sans-serif" },
        { label: "주아", font: "Jua, sans-serif" },
        { div: true },
        { label: "노토 명조", font: "Noto Serif KR, serif" },
        { label: "나눔 명조", font: "Nanum Myeongjo, serif" },
        { label: "송 명조", font: "Song Myung, serif" },
        { div: true },
        { label: "나눔 브러쉬 스크립트", font: "Nanum Brush Script, cursive" },
        { label: "나눔 펜 스크립트", font: "Nanum Pen Script, cursive" },
        { div: true },
        { label: "나눔 고딕 코딩", font: "Nanum Gothic Coding, monospace" },
        { label: "Roboto Mono", font: "Roboto Mono, monospace" },
      ],
    };
  },
  computed: {
    isActive() {
      if (
        this.editor.isActive("textStyle", { fontFamily: this.defaultFont.font })
      ) {
        return true;
      }

      for (const font of this.fonts) {
        if (
          font.font &&
          this.editor.isActive("textStyle", { fontFamily: font.font })
        ) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    setDefaultFont() {
      this.editor.chain().focus().setFontFamily(this.defaultFont.font).run();
    },
    async toggleMenu() {
      this.menu = !this.menu;
      if (this.menu) {
        setTimeout(() => {
          const el = this.$refs.menu.$children[1].$el;
          const select = el.querySelector(".primary");
          if (select) {
            el.scrollTop = select.parentNode.offsetTop - 114;
          }
        }, 100);
      }
    },
  },
};
</script>
