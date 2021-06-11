import { VueNodeViewRenderer } from "@tiptap/vue-2";
import DragComponent from "../components/DragComponent.vue";

export default function(Node) {
	return Node.extend({
		draggable: true,
		addNodeView() {
			return VueNodeViewRenderer(DragComponent)
		}
	})
}