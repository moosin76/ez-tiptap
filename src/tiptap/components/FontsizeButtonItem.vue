<template>
  <v-btn
    small
    block
    tile
    @click="handler"
    :class="{ primary: isActive() }"
    class="text-none"
  >
    {{ fontSize }}
    <v-spacer></v-spacer>
  </v-btn>
</template>

<script>
export default {
  name: "FontSizeButtonItem",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    fontSize: {
      type: String,
      required: true,
    },
  },
  methods: {
    handler() {
      this.editor
        .chain()
        .focus()
        .setFontSize({ fontSize: this.fontSize })
        .run();
    },
    isActive() {
      return this.editor.isActive("textStyle", { fontSize: this.fontSize });
      //return this.editor.isActive("fontsize", { size: this.size });
    },
  },
};
</script>

