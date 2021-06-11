<template>
  <div>
    <v-dialog v-model="dialog" :max-width="500">
      <template v-slot:activator="{on:t}">
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
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
          </template>
          Youtube
        </v-tooltip>
      </template>
      <v-card>
        <v-toolbar color="primary" dark>
          Youtube
          <v-spacer></v-spacer>
          <v-btn icon  @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4 pb-0">
          <v-text-field
            v-model="src"
            label="YouTube URL"
            prepend-icon="mdi-youtube"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
					<v-checkbox v-model="autoplay" label="Auto Play" value="1"/>
          <v-spacer></v-spacer>
					<!-- <v-btn color="error" v-if="isActive" @click="remove">Remove</v-btn> -->
          <v-btn color="primary" @click="save">APPLY</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PopupButton from "./PopupButton.vue";
export default {
  name: "YoutubeButtons",
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
			src : "",
			autoplay : 0,
    };
  },
  methods: {
    openDialog() {
			// console.log(this.editor.chain().focus().extendMarkRange().run())
			// this.editor.chain().focus().extendMarkRange().run();
			// this.editor.chain().focus().setLinkState(this.linkState);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
		save() {
			const {src} = this;
			const autoplay = this.autoplay || '0';
      this.editor.chain().focus().setYoutube({ src, autoplay}).run();
      this.closeDialog()
		},
		remove() {
			this.editor.chain().focus().unsetLink().run();
			this.closeDialog()
		},
		linkState(attr) {
			this.href = attr.href;
			this.blank = attr.blank;
		}
  },
};
</script>

<style>
</style>