import {
	Extension,
} from '@tiptap/core'

const TextDecoration = Extension.create({
	name: 'textDecoration',
	defaultOptions: {
		types: ['textStyle'],
		decorations: ['underline', 'overline', 'line-through', 'none'],
		defaultTextDecoration: "none"
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					textDecoration: {
						default: null,
						parseHTML: element => {
							// console.log(element.style.textDecoration);
							return {
								textDecoration: element.style.textDecoration,
							}
						},
						renderHTML: attributes => {
							if (!attributes.textDecoration || this.options.defaultTextDecoration === attributes.textDecoration) {
								return {}
							}
							return {
								style: `text-decoration: ${attributes.textDecoration}`,
							}
						},

					},
				},
			},
		]
	},
	addCommands() {
		return {
			setTextDecoration: ({textDecoration}) => ({ chain }) => {
				if (!this.options.decorations.includes(textDecoration)) {
					return false;
				}
				return chain().setMark('textStyle', {textDecoration}).run();
			},
			toggleTextDecoration: ({ textDecoration }) => ({ chain }) => {
				console.log(textDecoration);
				return chain().toggleMark('textStyle', { textDecoration: textDecoration }).run();
			},
			unsetTextDecoration: () => ({ chain }) => {
				return chain().setMark('textStyle', { textDecoration: 'none' }).run();
			},
		}
	},
});

export default TextDecoration;
