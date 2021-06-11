import TiptapTable from "@tiptap/extension-table";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import TableComponent from '../view/TableComponent.vue';

const CustomTable  = TiptapTable.extend({
	draggable : true,
	addNodeView() {
		return VueNodeViewRenderer(TableComponent);
	},
});

export default CustomTable;
