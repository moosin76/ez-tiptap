<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on: menuOn, attrs: menuAttrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="{...on, ...menuOn}"
              v-bind="{...attrs, ...menuAttrs}"
              tile
              fab
              depressed
              x-small
              class="pl-2 pr-0 tiptap-menu-button"
              :color="isActive ? 'primary' : null"
            >
              <v-icon>{{ curIcon }}</v-icon>
              <v-icon x-small class="ml-n1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          Headding(Ctrl+Alt+0~6)
        </v-tooltip>
      </template>

      <menu-button-item
        :editor="editor"
        label="Paragraph"
        icon="mdi-format-paragraph"
        action="setParagraph"
        active="paragraph"
      />

      <menu-button-item
        v-for="i in 6"
        :editor="editor"
        :label="`Header ${i}`"
        :icon="`mdi-format-header-${i}`"
        action="toggleHeading"
        active="heading"
        :option="{ level: i }"
        :key="i"
      />
    </v-menu>
  </div>
</template>

<script>
import MenuButtonItem from "./MenuButtonItem.vue";

export default {
  components: { MenuButtonItem },
  name: "HeaderButton",
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      icon: "mdi-format-header-pound",
      isActive: false,
    };
  },
  computed: {
    curIcon() {
      for (let i = 1; i <= 6; i++) {
        if (this.editor.isActive("heading", { level: i })) {
          this.isActive = true;
          return `mdi-format-header-${i}`;
        }
      }
      this.isActive = false;
      return `mdi-format-header-pound`;
    },
  },
};
</script>
