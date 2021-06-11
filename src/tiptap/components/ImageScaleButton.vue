<template>
  <div>
    <v-dialog v-model="dialog" :max-width="300" persistent>
      <template v-slot:activator="{ on: t }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              tile
              fab
              depressed
              x-small
              @click="openDialog"
            >
              <v-icon>mdi-image-size-select-large</v-icon>
            </v-btn>
          </template>
          Image Scale
        </v-tooltip>
      </template>
      <v-card>
        <v-toolbar color="primary" dark>
          Image Scale
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4 pb-0">
          <v-text-field
            v-model="scale.width"
            label="Width"
            prepend-icon="mdi-arrow-left-right"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="scale.height"
            label="Height"
            prepend-icon="mdi-arrow-up-down"
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save">APPLY</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PopupButton from "./PopupButton.vue";
export default {
  name: "ImageScaleButton",
  components: { PopupButton },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      scale: {
        width: "",
        height: "",
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    save() {
      const width = this.scale.width || "auto";
      const height = this.scale.height || "auto";
      this.editor.chain().setImageWidth(width).setImageHeight(height).run();
      this.closeDialog();
    },
  },
};
</script>