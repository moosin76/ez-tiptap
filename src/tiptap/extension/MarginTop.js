import { Extension } from '@tiptap/core';

const MarginTop = Extension.create({
	name: 'marginTop',
	defaultOptions: {
		types: ['heading', 'paragraph'],
		defaultMarginTop: '0.75em',
	},
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					marginTop: {
						default: this.options.defaultMarginTop,
						parseHTML: element => ({
							marginTop: element.style.marginTop || this.options.defaultMarginTop,
						}),
						renderHTML: attributes => {
							if (!attributes.marginTop || attributes.marginTop === this.options.defaultMarginTop) {
								return {}
							}
							return { style: `margin-top: ${attributes.marginTop}` }
						},
					},
				},
			},
		]
	},
	addCommands() {
		return {
			setMarginTop: (marginTop) => ({ commands }) => {
				return this.options.types.every(type =>
					commands.updateAttributes(type, { marginTop })
				);
			},
			unsetMarginTop: () => ({ commands }) => {
				return this.options.types.every(type =>
					commands.resetAttributes(type, 'marginTop')
				);
			},
		}
	}
});

export default MarginTop;


