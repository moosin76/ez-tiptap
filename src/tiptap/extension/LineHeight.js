import { Extension } from '@tiptap/core';

const LineHeight = Extension.create({
	name: 'lineHeight',
	defaultOptions: {
		types: ['heading', 'paragraph'],
		defaultLineHeight: '150%',
	},
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					lineHeight: {
						default: this.options.defaultLineHeight,
						parseHTML: element => ({
							lineHeight: element.style.lineHeight || this.options.defaultLineHeight,
						}),
						renderHTML: attributes => {
							if (attributes.lineHeight === this.options.defaultLineHeight) {
								return {}
							}
							return { style: `line-height: ${attributes.lineHeight}` }
						},
					},
				},
			},
		]
	},
	addCommands() {
		return {
			setLineHeight: (lineHeight) => ({ commands }) => {
				return this.options.types.every(type =>
					commands.updateAttributes(type, { lineHeight })
				);
			},
			unsetLineHeight: () => ({ commands }) => {
				return this.options.types.every(type =>
					commands.resetAttributes(type, 'lineHeight')
				);
			},
		}
	}
});

export default LineHeight;


