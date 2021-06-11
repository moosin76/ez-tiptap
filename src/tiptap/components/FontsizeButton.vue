<template>
  <div>
    <v-menu ref="menu" v-model="menu" offset-y max-height="200" min-width="80">
      <template v-slot:activator="{ on: menuOn, attrs: menuAttrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="{ ...menuAttrs, ...attrs }"
              tile
              fab
              depressed
              x-small
              class="pl-2 pr-0 tiptap-menu-button"
              @click="toggleMenu"
            >
              <v-icon>mdi-format-size</v-icon>
              <v-icon x-small class="ml-n1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          Font Size
        </v-tooltip>
      </template>

      <div v-for="size in sizes" :key="size">
        <fontsize-button-item :editor="editor" :fontSize="`${size}%`" />
      </div>
    </v-menu>
  </div>
</template>

<script>
import FontsizeButtonItem from "./FontsizeButtonItem.vue";

export default {
  components: { FontsizeButtonItem },
  name: "FontSizeButton",
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
  computed: {
    isActive() {
      for (const fontSize of this.sizes) {
        if (this.editor.isActive("textStyle", { fontSize: `${fontSize}%` })) {
          return false;
        }
      }
      return true;
    },
  },
  mounted() {
    const sizes = [];
    for (let i = 50; i <= 400; i += 25) {
      sizes.push(i);
    }
    this.sizes = sizes;
  },
  methods: {
    async toggleMenu() {
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
