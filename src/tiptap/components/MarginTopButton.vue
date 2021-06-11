<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      offset-y
      min-width="100"
      max-height="200"
      class="mymenu"
    >
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
              <v-icon>mdi-format-wrap-top-bottom</v-icon>
              <v-icon x-small class="ml-n1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          Margin Top
        </v-tooltip>
      </template>

      <div v-for="size in sizes" :key="size">
        <margin-top-button-item :editor="editor" :size="`${size}`" />
      </div>
    </v-menu>
  </div>
</template>

<script>
import MarginTopButtonItem from "./MarginTopButtonItem.vue";

export default {
  components: { MarginTopButtonItem },
  name: "MarginTopButton",
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
    const start = -4;
    const end = 4;
    for (let i = start; i <= end; i += 0.25) {
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
