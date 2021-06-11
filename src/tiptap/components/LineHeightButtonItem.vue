<template>
  <v-btn
    small
    block
    tile
    @click="handler"
    :class="{ primary: isActive() }"
    class="text-none"
  >
    <v-spacer></v-spacer>
    {{ size }}
  </v-btn>
</template>

<script>
export default {
  name: "LineHeightButtonItem",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  methods: {
    handler() {
      this.editor.chain().focus().setLineHeight(this.size).run();
    },
    isActive() {
      return this.editor.isActive({ lineHeight: this.size });
    },
  },
};
</script>

