<template>
  <v-btn
    small
    block
    tile
    @click="handler"
    :class="{ primary: isActive() }"
    class="text-none d-flex"
  >
    <div>{{ size }}</div><v-spacer></v-spacer><div class="ml-1">em</div>
  </v-btn>
</template>

<script>
export default {
  name: "MarginToptButtonItem",
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
  computed: {
    marginTop() {
      return this.size + "em";
    },
  },
  methods: {
    handler() {
      this.editor.chain().focus().setMarginTop(this.marginTop).run();
    },
    isActive() {
      return this.editor.isActive({ marginTop: this.marginTop });
    },
  },
};
</script>

