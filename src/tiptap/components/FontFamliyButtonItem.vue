<template>
  <v-btn
    block
		tile
    @click="handler"
    :class="{
      primary: isActive(),
    }"
    :style="{ fontFamily: font }"
    class="text-none pr-10"
  >
    {{ label }}
    <v-spacer></v-spacer>
  </v-btn>
</template>

<script>
export default {
  name: "FontFamliyButtonItem",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    font: {
      type: String,
      required: true,
    },
  },
  methods: {
    handler() {
      this.editor.chain().focus().setFontFamily(this.font).run();
    },
    isActive() {
      return this.editor.isActive("textStyle", { fontFamily: this.font });
    },
  },
};
</script>

