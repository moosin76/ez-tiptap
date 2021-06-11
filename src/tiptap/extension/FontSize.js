import {
	Extension,
} from '@tiptap/core'

const FontSize = Extension.create({
	name: 'fontsize',
	defaultOptions: {
		types: ['textStyle'],
		defaultFontSize: "100%",
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					fontSize: {
						default: null,
						renderHTML: attributes => {
							if (!attributes.fontSize || this.options.defaultFontSize === attributes.fontSize) {
								return {}
							}
							return {
								style: `font-size: ${attributes.fontSize}`,
							}
						},
						parseHTML: element => ({
							fontSize: element.style.fontSize,
						}),
					},
				},
			},
		]
	},
	addCommands() {
		return {
			setFontSize: fontSize => ({ chain }) => {
				return chain().setMark('textStyle', fontSize ).run()
			},
			// unsetFontSize: () => ({ chain }) => {
			// 	return chain().setMark('textStyle', { fontSize: '100%' }).run()
			// },
		}
	},
});

export default FontSize;