
import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import YoutubeComponent from '../view/YoutubeComponent.vue';
// import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';

const pattern = /https:\/\/(?:www.youtube.com\/watch\?v=|youtu.be\/)([^&]+)/;

const CustomYoutube = Node.create({
	name: "youtube",
	// content: "block*",
	group: "block",
	// topNode: true,
	draggable: true,
	atom: true,
	defaultOptions: {
		HTMLAttributes: {
			'data-type': 'youtube',
			'data-autoplay': "0",
			'frameborder': "0",
			'allowfullscreen': "allowfullscreen",
			'style' : 'width:720px; height:405px;'
		},
	},

	parseHTML() {
		return [
			{ tag: 'iframe[data-type="youtube"]' }
		]
	},
	renderHTML({ HTMLAttributes }) {
		// console.log("RENDER", HTMLAttributes);
		return ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
	},

	addAttributes() {
		return {
			src: {
				default: null,
				parseHTML: element => {
					const src = element.getAttribute('data-src');
					return {
						src: src,
					}
				},
				renderHTML: attributes => {
					// console.log("RENDER", attributes);
					const match = attributes.src.match(pattern);
					let src = ''
					if (match && match[1]) {
						src = 'https://www.youtube.com/embed/' + match[1];
						src += '?autoplay='+ attributes.autoplay;
						
					}

					return {
						'data-src': attributes.src,
						src: src,
					}
				}
			},
			autoplay : {
				default : "0",
				parseHTML : element => {
					const autoplay = element.getAttribute('data-autoplay');
					return {
						autoplay : autoplay
					}
				},
				renderHTML : attributes => {
					return {
						'data-autoplay' : attributes.autoplay,
						// 'autoplay' : attributes.autoplay,
					}
				}
			}
		}
	},

	addCommands() {
		return {
			setYoutube: attributes => ({ commands, tr, dispatch }) => {
				// return commands.setNode('youtube', attributes);
				// return commands.insertContent(`<div src="${attributes.src}" data-type="youtube"></div>`, attributes);

				// return commands.insertContent({ type: this.name, attrs: attributes })
				const {selection} = tr;
				const node = this.type.create(attributes);
				if(dispatch) {
					tr.replaceRangeWith(selection.from, selection.to, node)
				}
			}
		}
	},

	addNodeView() {
		return VueNodeViewRenderer(YoutubeComponent);
	}
});

export default CustomYoutube;