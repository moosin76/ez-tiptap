import TiptapCodeBlock from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from "@tiptap/vue-2";

import CodeBlockComponent from '../view/CodeBlockComponent.vue';
import lowlight from "lowlight";
// import lowlight from "lowlight/lib/core";

// import lang_javascript from "highlight.js/lib/languages/javascript";
// import lang_c from "highlight.js/lib/languages/c";
// import lang_java from "highlight.js/lib/languages/java";
// import lang_xml from "highlight.js/lib/languages/xml";
// import lang_css from "highlight.js/lib/languages/css";

// lowlight.registerLanguage("c", lang_c);
// lowlight.registerLanguage("css", lang_css);
// lowlight.registerLanguage("javascript", lang_javascript);
// lowlight.registerLanguage("java", lang_java);
// lowlight.registerLanguage("html", lang_xml);

const CustomCodeBlock = TiptapCodeBlock.extend({
	draggable : true,
	addAttributes() {
		return {
			...this.parent?.(),
			filename : {
				default: "",
				parseHTML : element => {
					const filename = element.firstElementChild?.getAttribute('data-filename');
					return {
						filename : filename,
					}
				},
				renderHTML : attributes => {
					// console.log("RENDER", attributes.filename);
					return {
						'data-filename' : attributes.filename
					}
				}
			}
		}
	},

	addNodeView() {
		return VueNodeViewRenderer(CodeBlockComponent);
	},

	addKeyboardShortcuts() {
		return {
			Tab : () =>{
				if(this.editor.isActive('codeBlock')) {
					return this.editor.commands.insertContent([
						{
							type :"text",
							text: "\t"
						}
					])
				}
			},
		}
	},
	
}).configure({lowlight});

export default CustomCodeBlock;
