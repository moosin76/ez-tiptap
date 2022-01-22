import {Node, nodeInputRule, mergeAttributes,} from '@tiptap/core'

const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

const Image = Node.create({
    name: 'image',

    defaultOptions: {
        inline: true,
        defaultFloat: "none",
        HTMLAttributes: {},
    },

    inline() {
        return this.options.inline
    },

    group() {
        return this.options.inline ? 'inline' : 'block'
    },

    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            float: {
                default: null,
                parseHTML: element => {
                    const float = element.style.float;
                    return {float: float}
                },
                renderHTML: attributes => {
                    if (!attributes.float || this.options.defaultFloat === attributes.float) {
                        return {};
                    }
                    return {
                        style: `float : ${attributes.float}`,
                    };
                },
            },
            width: {
                default: null,
                parseHTML: element => {
                    const width = element.style.width;
                    // console.log("PAR W", width)
                    return {width}
                },
                renderHTML: attributes => {
                    const width = parseInt(attributes.width);
                    // console.log("REN W", width);
                    if (!width || width === 'auto') {
                        return {};
                    }
                    return {
                        style: `width: ${width}px`,
                    };
                },
            },
            height: {
                default: null,
                parseHTML: element => {
                    const height = element.style.height;
                    // console.log("PAR H", height)
                    return {height}
                },
                renderHTML: attributes => {
                    const height = parseInt(attributes.height);
                    // console.log("REN H", height);
                    if (!height || height === 'auto') {
                        return {};
                    }
                    return {
                        style: `height: ${height}px`,
                    };
                },
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },

    addCommands() {
        return {
            setImage: options => ({commands}) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
            setImageFloat: (float) => ({commands, tr}) => {
                commands.updateAttributes('image', float);
                const {from, to} = tr.curSelection;
                return commands.setTextSelection({from, to});
            },
            setImageWidth: (width) => ({commands, tr}) => {
                // console.log('w', width);
                commands.updateAttributes('image', {width});
                const {from, to} = tr.curSelection;
                return commands.setTextSelection({from, to});
            },
            setImageHeight: (height) => ({commands, tr}) => {
                // console.log('h', height);
                commands.updateAttributes('image', {height});
                const {from, to} = tr.curSelection;
                return commands.setTextSelection({from, to});
            },
        }
    },

    addInputRules() {
        return [
            nodeInputRule({find: inputRegex, type: this.type, getAttributes: match => {
				const [, alt, src, title] = match
				return {src, alt, title}
            }})
        ]
    },
})

export default Image;