<template>
  <v-btn
    small
    block
    @click="handler"
    :class="{
      primary: isActive(),
    }"
  >
    <v-icon left>{{ icon }}</v-icon>
    <v-spacer />
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "MenuButtonItem",
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
  },
  methods: {
    handler() {
      this.editor.chain().focus()[this.action](this.option).run();
    },
    isActive() {
			const {active, option} = this;
			if(active) {
				if(option) {
					return this.editor.isActive(active, option);
				} else {
					return this.editor.isActive(active);
				}
			}
			return false;
		},
  },
};
</script>

