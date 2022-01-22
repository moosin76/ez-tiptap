// import Link from '@tiptap/extension-link';
import { Mark, markPasteRule, mergeAttributes, getMarkRange, getMarkAttributes } from "@tiptap/core";
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';

const pasteRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi
const pasteRegexExact = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)$/gi
const CustomLink = Mark.create({
	name: "link",
	priority: 1000,
	inclusive: false,
	defaultOptions: {
		openOnClick: true,
		linkOnPaste: true,
		HTMLAttributes: {
			target: '_blank',
			rel: 'noopener noreferrer nofollow',
		}
	},
	addAttributes() {
		return {
			href: { default: null, },
			target: {
				default: this.options.HTMLAttributes.target,
			}
		}
	},
	parseHTML() {
		return [
			{ tag: 'a[href]' },
		]
	},
	renderHTML(vm) {
		return ['a', mergeAttributes(this.options.HTMLAttributes, vm.HTMLAttributes), 0]
	},
	addCommands() {
		return {
			setLink: attibutes => ({ commands }) => {
				return commands.setMark('link', attibutes)
			},
			toggleLink: attributes => ({ commands }) => {
				return commands.toggleMark('link', attributes)
			},
			unsetLink: attibutes => ({ commands }) => {
				return commands.unsetMark('link')
			},
			setLinkState: (fn) => ({ state }) => {
				const attr = getMarkAttributes(state, 'link');
				attr.blank = attr.target !== '_self';
				fn(attr);
			}
		}
	},
	addPasteRules() {
		return [
			markPasteRule({find: pasteRegex, type: this.type, getAttributes: match => ({href: match[0]})})
		]
	},
	addProseMirrorPlugins() {
		const plugins = [];
		if (this.options.openOnClick) {
			plugins.push(
				new Plugin({
					key: new PluginKey('handleClickLink'),
					props: {
						handleClick: (view, pos, event) => {
							const attrs = this.editor.getAttributes('link');
							const link = event.target.closest('a');
							if (link && attrs.href) {
								window.open(attrs.href, attrs.target);
								return true;
							}
							return false;
						}
					}
				})
			);
		} else {
			plugins.push(
				new Plugin({
					key: new PluginKey('handleClickSelectLink'),
					props: {
						handleClick(view, pos) {
							const { schema, doc, tr } = view.state;
							const range = getMarkRange(
								doc.resolve(pos),
								schema.marks.link
							);
							if (!range) return false;
							// console.log(range.from, range.to);
							const $start = doc.resolve(range.from);
							const $end = doc.resolve(range.to);
							// console.log($start, $end);
							const transaction = tr.setSelection(
								new TextSelection($start, $end)
							);
							view.dispatch(transaction);
							return true;
						},
					},
				})
			);
		}

		if (this.options.linkOnPaste) {
			plugins.push(
				new Plugin({
					key: new PluginKey('handlePasteLink'),
					props: {
						handlePaste: (view, event, slice) => {
							const { state } = view;
							const { selection } = state;
							const { empty } = selection;
							if (empty) {
								return false;
							}
							let textContent = '';

							slice.content.forEach(node => {
								textContent += node.textContent
							})

							if (!textContent || !textContent.match(pasteRegexExact)) {
								return false
							}
							// this.editor.commands.setMark(this.type, { href: textContent })
							this.editor.commands.setMark(this.type, {
								href: textContent,
							})
							return true;
						},
					},
				})
			)
		}
		return plugins;
	},

});

export default CustomLink;