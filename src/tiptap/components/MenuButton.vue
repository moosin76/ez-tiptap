<template>
  <div>
    <v-menu v-model="menu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
							v-on="on"
							v-bind="attrs"
              tile
              fab
              depressed
              x-small
              class="px-0 tiptap-menu-button"
              @click="menu = !menu"
              :color="isActive()"
            >
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ label }}</span>
        </v-tooltip>
      </template>
      <div class="menu-bg elevation-2">
        <v-card width="500">
          <v-card-title>
            {{ label }}
            <v-spacer></v-spacer>
            <v-btn icon color="error" @click="closeMenu">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <slot></slot>
        </v-card>
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
    active: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    closeMenu() {
      this.menu = false;
    },
    isActive() {
      if (this.active) {
        return this.editor.isActive(this.active) ? "primary" : null;
      }
      return null;
    },
  },
};
</script>