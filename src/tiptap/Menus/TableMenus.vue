<template>
  <div>
    <!-- 테이블 메뉴 -->
    
    <edit-button
      :editor="editor"
      label="Delete Table"
      icon="mdi-table-large-remove"
      action="deleteTable"
      :isTable="true"
    />

    <edit-button
      :editor="editor"
      label="Add Column Before"
      icon="mdi-table-column-plus-before"
      action="addColumnBefore"
      :isTable="true"
      class="ml-1"
    />

    <edit-button
      :editor="editor"
      label="Add Column After"
      icon="mdi-table-column-plus-after"
      action="addColumnAfter"
      :isTable="true"
    />
    <edit-button
      :editor="editor"
      label="Delete Column"
      icon="mdi-table-column-remove"
      action="deleteColumn"
      :isTable="true"
    />

    <edit-button
      :editor="editor"
      label="Add Row Before"
      icon="mdi-table-row-plus-before"
      action="addRowBefore"
      :isTable="true"
			class="ml-1"
    />

    <edit-button
      :editor="editor"
      label="Add Row After"
      icon="mdi-table-row-plus-after"
      action="addRowAfter"
      :isTable="true"
    />

    <edit-button
      :editor="editor"
      label="Delete Row"
      icon="mdi-table-row-remove"
      action="deleteRow"
      :isTable="true"
    />

    <edit-button
      :editor="editor"
      label="Merge Or Split"
      icon="mdi-table-merge-cells"
      action="mergeOrSplit"
      :isTable="true"
      class="ml-1"
    />

    <edit-button
      :editor="editor"
      label="Toggle Header Cell"
      icon="mdi-table-headers-eye"
      action="toggleHeaderCell"
      :isTable="true"
			class="ml-1"
    />

    <cell-color-button :editor="editor" />
  </div>
</template>

<script>
import CellColorButton from "../components/CellColorButton.vue";
import EditButton from "../components/EditButton.vue";
import PopupButton from "../components/PopupButton.vue";
import TableForm from "../components/TableForm.vue";

export default {
  name: "TableMenus",
  components: { EditButton, PopupButton, TableForm, CellColorButton },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>