<template>
  <v-card-text>
    <v-container class="mb-n4">
      <v-row class="mt-4">
        <v-col cols="4">
          <v-text-field
            label="Rows"
            v-model="nRows"
            class="mt-n1 pt-0"
            hide-details
            dense
            type="number"
            style="width: 40px"
            min="1"
          />
          <v-slider
            min="-20"
            max="-1"
            v-model="rows"
            hide-details
            dense
            ticks
            vertical
          >
          </v-slider>
        </v-col>
        <v-col class="d-flex flex-column justify-space-between pb-8">
          <div>
            <v-slider min="1" max="20" v-model="cols" hide-details dense ticks>
              <template v-slot:prepend>
                <v-text-field
                  label="Cols"
                  v-model="cols"
                  class="mt-n2 pt-0"
                  hide-details
                  dense
                  type="number"
                  style="width: 40px"
                  min="1"
                />
              </template>
            </v-slider>
          </div>
          <v-checkbox
            v-model="withHeaderRow"
            label="With header row"
            dense
            hide-details
          ></v-checkbox>
          <v-btn color="primary" @click="insert">Apply</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
export default {
  name: "TableForm",
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rows: 3,
      cols: 4,
      withHeaderRow: true,
    };
  },
  computed: {
    nRows: {
      set(value) {
        this.rows = -value;
      },
      get() {
        return -this.rows;
      },
    },
  },
  mounted() {
    this.nRows = 3;
  },
  methods: {
    async insert() {
      const { nRows, cols, withHeaderRow } = this;
      const rows = nRows;
      this.editor
        .chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow })
        .run();
      this.closePopup();
    },
    closePopup() {
      let p = this.$parent;
      while (1) {
        if (p.$vnode.tag.indexOf("PopupButton") >= 0) {
          break;
        }
        p = p.$parent;
      }
      p.closeDialog();
    },
  },
};
</script>

<style>
</style>