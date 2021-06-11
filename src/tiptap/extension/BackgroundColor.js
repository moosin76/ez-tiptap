import {
	Extension,
} from '@tiptap/core'

const BackgroundColor = Extension.create({
	name: 'backgroundcolor',
	defaultOptions: {
		types: ['textStyle'],
		defaultColor : "#00000000"
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					backgroundColor: {
						default: null,
						renderHTML: attributes => {
							if (!attributes.backgroundColor || this.options.defaultColor === attributes.backgroundColor) {
								return {}
							}
							return {
								style: `background-color: ${attributes.backgroundColor}`,
							}
						},
						parseHTML: element => ({
							backgroundColor: element.style.backgroundColor,
						}),
					},
				},
			},
		]
	},
	addCommands() {
		return {
			setBackgroundColor: backgroundColor => ({ chain }) => {
				console.log(backgroundColor);
				return chain().setMark('textStyle', backgroundColor ).run();
			},
			unsetBackgroundColor: () => ({ chain }) => {
				return chain().setMark('textStyle', { backgroundColor: 'transparent' }).run();
			},
		}
	},
});

export default BackgroundColor;
