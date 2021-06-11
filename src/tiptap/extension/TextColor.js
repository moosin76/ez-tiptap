import {
	Extension,
} from '@tiptap/core'

const TextColor = Extension.create({
	name: 'textcolor',
	defaultOptions: {
		types: ['textStyle'],
		defaultColor : "#00000000"
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					color: {
						default: null,
						renderHTML: attributes => {
							if (!attributes.color || this.options.defaultColor === attributes.color) {
								return {}
							}
							return {
								style: `color: ${attributes.color}`,
							}
						},
						parseHTML: element => ({
							color: element.style.color,
						}),
					},
				},
			},
		]
	},
	addCommands() {
		return {
			setTextColor: color => ({ chain }) => {
				return chain().setMark('textStyle', color ).run();
			},
			unsetTextColor: () => ({ chain }) => {
				return chain().setMark('textStyle', { color: 'inherit' }).run();
			},
		}
	},
});

export default TextColor;
