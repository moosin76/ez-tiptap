import {Node, mergeAttributes, wrappingInputRule} from '@tiptap/core';
import {VueNodeViewRenderer} from "@tiptap/vue-2";
import TaskItemComponent from '../view/TaskItemComponent.vue';

const inputRegex = /^\s*(\[([ |x])\])\s$/
const TaskItem = Node.create({
    name: 'taskItem',

    addOptions: {
        nested: true,
        HTMLAttributes: {},
    },

    content() {
        return this.options.nested ? 'paragraph block*' : 'paragraph+'
    },
    defining: true,

    addAttributes() {
        return {
            checked: {
                default: false,
                parseHTML: element => ({
                    checked: element.getAttribute('data-checked') === 'true',
                }),
                renderHTML: attributes => ({
                    'data-checked': attributes.checked,
                }),
                keepOnSplit: false,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'li[data-type="taskItem"]',
                priority: 51,
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['li', mergeAttributes(
            this.options.HTMLAttributes,
            HTMLAttributes,
            {'data-type': 'taskItem'},
        ), 0]
    },

    addKeyboardShortcuts() {
        const shortcuts = {
            Enter: () => this.editor.commands.splitListItem('taskItem'),
            'Shift-Tab': () => this.editor.commands.liftListItem('taskItem'),
        }

        if (!this.options.nested) {
            return shortcuts
        }

        return {
            ...shortcuts,
            Tab: () => this.editor.commands.sinkListItem('taskItem'),
        }
    },

    addInputRules() {
        return [
            wrappingInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: match => ({
                    checked: match[match.length - 1] === 'x',
                })
            }),
        ]
    },

    addNodeView() {
        return VueNodeViewRenderer(TaskItemComponent);
    },
})

export default TaskItem;