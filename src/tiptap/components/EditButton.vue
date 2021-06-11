<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          tile
          fab
          depressed
          x-small
          @click="handler"
          :color="isActive"
          :disabled="isTableDisable()"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ label }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "EditButton",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "아이템라벨",
    },
    active: {
      type: String,
      default: "",
    },
    option: {
      type: Object,
      default: null,
    },
    isTable: {
      type: Boolean,
      default: false,
    },
		color : {
			type: String,
			default : null,
		}
  },
	computed : {
		isActive() {
			if(this.color) {
				return this.color;
			}

      const { active, option } = this;
      if (active) {
        if (option) {
          if (option.textAlign || option.textDecoration || option.float ) {
            return this.editor.isActive(option) ? "primary" : null;
          } else {
            return this.editor.isActive(active, option) ? "primary" : null;
          }
        } else {
          return this.editor.isActive(active) ? "primary" : null;
        }
      }
      return null;
		}
	},
  methods: {
    handler() {
      if (this.option) {
        if (this.option.textAlign) {
          this.editor.chain().focus()[this.action](this.option.textAlign).run();
        } else if (this.option.textDecoration) {
          let textDecoration = this.isActive
            ? "none"
            : this.option.textDecoration;
          this.editor.chain().focus()[this.action]({textDecoration}).run();
        } else {
          this.editor.chain().focus()[this.action](this.option).run();
        }
      } else {
        this.editor.chain().focus()[this.action]().run();
      }
    },
    isTableDisable() {
      return this.isTable && !this.editor.can()[this.action]();
    },
  },
};
</script>

