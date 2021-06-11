<template>
  <div>
    <v-menu ref="menu" v-model="menu" offset-y max-height="200" min-width="80">
      <template v-slot:activator="{ on: menuOn, attrs: menuAttrs }">
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
              <v-icon>mdi-format-line-spacing</v-icon>
              <v-icon x-small class="ml-n1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          Line Height
        </v-tooltip>
      </template>

      <div v-for="size in sizes" :key="size">
        <line-height-button-item :editor="editor" :size="`${size}%`" />
      </div>
    </v-menu>
  </div>
</template>

<script>
import LineHeightButtonItem from "./LineHeightButtonItem.vue";

export default {
  components: { LineHeightButtonItem },
  name: "LineHeightButton",
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      sizes: [],
    };
  },
  mounted() {
    const sizes = [];
    const start = 25;
    const end = 500;
    for (let i = start; i <= end; i += 25) {
      sizes.push(i);
    }
    this.sizes = sizes;
  },
  methods: {
    // remove() {
    //   this.editor.chain().focus().unsetFontSize().run();
    // },
    toggleMenu() {
      this.menu = !this.menu;
      if (this.menu) {
        setTimeout(() => {
          const el = this.$refs.menu.$children[1].$el;
          const select = el.querySelector(".primary");
          if (select) {
            el.scrollTop = select.parentNode.offsetTop - 86;
          }
        }, 100);
      }
    },
  },
};
</script>
