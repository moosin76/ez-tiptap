<template>
  <div>
    <v-menu v-model="menu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on" v-bind="attrs">
              <v-btn
                tile
                fab
                depressed
                x-small
                class="px-0 tiptap-menu-button"
                style="z-index: 1"
                @click="applyColor"
              >
                <v-icon>{{ icon }}</v-icon>
                <div
                  class="color-block"
                  :style="{ 'background': colorBlockBG }"
                ></div>
              </v-btn>
              <v-btn
                fab
                tile
                depressed
                x-small
                class="px-0 ml-n2 tiptap-menu-button"
                @click="openMenu"
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </div>
          </template>
          <span>{{ label }}</span>
        </v-tooltip>
      </template>
      <div class="menu-bg elevation-2">
        <v-color-picker
          v-model="color"
          hide-canvas
          hide-inputs
          hide-sliders
          hide-mode-switch
          show-swatches
          swatches-max-height="200"
          @input="selectColor"
					class="custom-color-picker"
        ></v-color-picker>
        <v-color-picker
          v-model="color"
          hide-canvas
          hide-mode-switch
        ></v-color-picker>
        <v-btn color="primary" block @click="selectColor">Apply</v-btn>
      </div>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "MenuButton",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    initColor: {
      type: String,
      default: "#FF9900FF",
    },
  },
  data() {
    return {
      menu: false,
      color: this.initColor,
      opend: false,
    };
  },
	computed : {
		colorBlockBG() {
			if (this.color === '#00000000') {
				return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC)';
			} else {
				return this.color
			}
		}
	},
  methods: {
    openMenu() {
      this.menu = true;
      this.$nextTick(() => {
        this.opend = true;
      });
    },
    closeMenu() {
      this.menu = false;
      this.opend = false;
    },
    selectColor() {
      if (this.opend) {
        this.applyColor();
        this.closeMenu();
      }
    },
    applyColor() {
			// console.log(this.color);
      this.$emit("select", this.color);
    },
  },
};
</script>