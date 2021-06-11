import TableCell from '@tiptap/extension-table-cell'

const CustomTableCell = TableCell.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			backgroundColor : {
				default : null,
				parseHTML: element => {
          return {
            backgroundColor: element.style.backgroundColor,
          }
        },
        renderHTML: attributes => {
					if(attributes.backgroundColor == null || attributes.backgroundColor == "#00000000") {
						return {}
					}
          return {
            // 'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
			}
		}
	}
});

export default CustomTableCell;