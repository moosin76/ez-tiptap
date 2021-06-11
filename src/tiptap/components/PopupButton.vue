<template>
  <div>
    <v-dialog v-model="dialog" :max-width="width" persistent>
      <template v-slot:activator="{ on: dialogOn, attrs: dialogAttrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="{...on}"
              v-bind="{...attrs, ...dialogAttrs}"
              tile
              fab
              depressed
              x-small
              class="px-0 tiptap-menu-button"
							@click="openDialog"
            >
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </template>
					{{ label }}
        </v-tooltip>
      </template>
      <v-card>
        <v-toolbar color="primary" dark>
          {{ label }}
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
       
        <slot @close="closeDialog"></slot>
       
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PopupButton",
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      require: true,
    },
    width: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
		openDialog() {
			this.$emit('open');
			this.dialog = true;
		},
    closeDialog() {
			this.dialog = false;
			this.$emit('close');
    },
  },
};
</script>