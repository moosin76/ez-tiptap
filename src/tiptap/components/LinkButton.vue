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
							:color="isActive"
            >
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </template>
          Link
        </v-tooltip>
      </template>
      <v-card>
        <v-toolbar color="primary" dark>
          Link
          <v-spacer></v-spacer>
          <v-btn icon  @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4 pb-0">
          <v-text-field
            v-model="href"
            label="URL"
            prepend-icon="mdi-link-variant"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-checkbox
            v-model="blank"
            label="blank"
            dense
            hide-details
            class="ml-2"
          />
          <v-spacer></v-spacer>
					<v-btn color="error" v-if="isActive" @click="clearLink">UnLink</v-btn>
          <v-btn color="primary" @click="setLink">APPLY</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PopupButton from "./PopupButton.vue";
export default {
  name: "LinkButtons",
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
			blank : true,
			href : "",
    };
  },
	computed: {
		isActive() {
			return this.editor.isActive('link') ? 'primary' : null;
		}
	},
  methods: {
    openDialog() {
			// console.log(this.editor.chain().focus().extendMarkRange().run())
			// this.editor.chain().focus().extendMarkRange().run();
			this.editor.chain().focus().setLinkState(this.linkState);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
		setLink() {
			const target = this.blank ? "_blank" : "_self";
      this.editor.chain().focus().setLink({ href: this.href, target}).run();
      this.closeDialog()
		},
		clearLink() {
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