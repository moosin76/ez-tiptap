import { Extension } from '@tiptap/core'
import { NodeSelection, Plugin } from 'prosemirror-state'
import { serializeForClipboard } from 'prosemirror-view/src/clipboard'

function removeNode(node) {
	if(node)
  	node.parentNode.removeChild(node)
}

function absoluteRect(node) {
  const data = node.getBoundingClientRect()

  return {
    top: data.top,
    left: data.left,
    width: data.width,
  }
}

let moveEl = null;

export default Extension.create({
  addProseMirrorPlugins() {
    function blockPosAtCoords(coords, view) {
      const pos = view.posAtCoords(coords)
      let node = view.domAtPos(pos.pos)

      node = node.node

      while (node && node.parentNode) {
        if (node.parentNode?.classList?.contains('ProseMirror')) { // todo
          break
        }

        node = node.parentNode
      }

      if (node && node.nodeType === 1) {
        const desc = view.docView.nearestDesc(node, true)
				moveEl = desc.dom;
        if (!(!desc || desc === view.docView)) {
          return desc.posBefore
        }
      }
      return null
    }

    function dragStart(e, view) {
      view.composing = true

      if (!e.dataTransfer) {
        return
      }

      const coords = { left: e.clientX + 50, top: e.clientY }
      const pos = blockPosAtCoords(coords, view)
			
      if (pos != null) {
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)))

        const slice = view.state.selection.content()

        // console.log({
        //   from: view.nodeDOM(view.state.selection.from),
        //   to: view.nodeDOM(view.state.selection.to),
        // })
        const { dom, text } = serializeForClipboard(view, slice)

        e.dataTransfer.clearData()
        e.dataTransfer.setData('text/html', dom.innerHTML)
        e.dataTransfer.setData('text/plain', text)

        let el = document.querySelector('.ProseMirror-selectednode')
				if(el) {
					e.dataTransfer?.setDragImage(el, 0, 0)	
				} else {
					e.dataTransfer?.setDragImage(moveEl.firstChild, 0, 0)	
				}
        view.dragging = { slice, move: true }
      }
    }

    let dropElement
		let dropTimer
    const WIDTH = 28

    return [
      new Plugin({
        view(editorView) {
          const element = document.createElement('div')
          element.draggable = 'true'
          element.classList.add('global-drag-handle')
          element.addEventListener('dragstart', e => dragStart(e, editorView))
          dropElement = element
          document.body.appendChild(dropElement)

          return {
            // update(view, prevState) {
            // },
            destroy() {
              removeNode(dropElement)
              dropElement = null
            },
          }
        },
        props: {
          handleDrop(view, event, slice, moved) {
            if (moved) {
              // setTimeout(() => {
              //   console.log('remove selection')
              //   view.dispatch(view.state.tr.deleteSelection())
              // }, 50)
            }
						moveEl = null;
          },
          // handlePaste() {
          //   alert(2)
          // },
          handleDOMEvents: {
            // drop(view, event) {
            //   setTimeout(() => {
            //     const node = document.querySelector('.ProseMirror-hideselection')
            //     if (node) {
            //       node.classList.remove('ProseMirror-hideselection')
            //     }
            //   }, 50)
            // },
            mousemove(view, event) {
							if(!document.querySelector('.ez-edit')){
								return;
							} 

							if(dropTimer) {
								clearTimeout(dropTimer)
							}
							dropTimer = setTimeout(()=>{
								if(dropElement)
									dropElement.style.display = 'none'
							}, 3000)

              const coords = {
                left: event.clientX + WIDTH + 50,
                top: event.clientY,
              }
              const pos = view.posAtCoords(coords)
							// console.log(pos);
              if (pos) {
                let node = view.domAtPos(pos?.pos)

                if (node) {
                  node = node.node
                  while (node && node.parentNode) {
                    if (node.parentNode?.classList?.contains('ProseMirror')) { // todo
                      break
                    }
                    node = node.parentNode
                  }

                  if (node instanceof Element) {
                    const cstyle = window.getComputedStyle(node)
                    const lineHeight = parseInt(cstyle.lineHeight, 10)
                    // const top = parseInt(cstyle.marginTop, 10) + parseInt(cstyle.paddingTop, 10)
                    const top = 0
                    const rect = absoluteRect(node)
                    const win = node.ownerDocument.defaultView

                    rect.top += win.pageYOffset + ((lineHeight - 24) / 2) + top
                    rect.left += win.pageXOffset
                    rect.width = `${WIDTH}px`

                    dropElement.style.left = `${-WIDTH + rect.left}px`
                    dropElement.style.top = `${rect.top}px`
										dropElement.style.display="block";
                  }
                }
              }
            },
          },
        },
      }),
    ]
  },
})

// import { Extension } from '@tiptap/core'
// import { NodeSelection, Plugin } from 'prosemirror-state'
// import { serializeForClipboard } from 'prosemirror-view/src/clipboard'

// function removeNode(node) {
//   node.parentNode.removeChild(node)
// }

// function absoluteRect(node) {
//   const data = node.getBoundingClientRect()

//   return {
//     top: data.top,
//     left: data.left,
//     width: data.width,
//   }
// }

// export default Extension.create({
//   addProseMirrorPlugins() {
//     function blockPosAtCoords(coords, view) {
//       const pos = view.posAtCoords(coords)
//       let node = view.domAtPos(pos.pos)
//       node = node.node

//       while (node && node.parentNode) {
//         if (node.parentNode?.classList?.contains('ProseMirror')) { // todo
//           break
//         }

//         node = node.parentNode
//       }

//       if (node && node.nodeType === 1) {
//         const desc = view.docView.nearestDesc(node, true)

//         if (!(!desc || desc === view.docView)) {
//           return desc.posBefore
//         }
//       }
//       return null
//     }

//     function dragStart(e, view) {
//       view.composing = true

//       if (!e.dataTransfer) {
//         return
//       }

//       const coords = { left: e.clientX + 50, top: e.clientY }
//       const pos = blockPosAtCoords(coords, view)

//       if (pos != null) {
//         view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)))

//         const slice = view.state.selection.content()

//         // console.log({
//         //   from: view.nodeDOM(view.state.selection.from),
//         //   to: view.nodeDOM(view.state.selection.to),
//         // })
//         const { dom, text } = serializeForClipboard(view, slice)

//         e.dataTransfer.clearData()
//         e.dataTransfer.setData('text/html', dom.innerHTML)
//         e.dataTransfer.setData('text/plain', text)
		
//         let el = document.querySelector('.ProseMirror-selectednode');
// 				// const el = moveEl;
// 				if(el) {
// 					e.dataTransfer?.setDragImage(el, 0, 0)
// 				} 

//         view.dragging = { slice, move: true }
//       }
//     }

//     let dropElement
//     const WIDTH = 28

//     return [
//       new Plugin({
//         view(editorView) {
//           const element = document.createElement('div')

//           element.draggable = 'true'
//           element.classList.add('global-drag-handle')
//           element.addEventListener('dragstart', e => dragStart(e, editorView))
//           dropElement = element
//           document.body.appendChild(dropElement)

//           return {
//             // update(view, prevState) {
//             // },
//             destroy() {
//               removeNode(dropElement)
//               dropElement = null
//             },
//           }
//         },
//         props: {
//           handleDrop(view, event, slice, moved) {
//             if (moved) {
// 							// console.log(moveEl);
// 							// console.log(event.target);
//               // setTimeout(() => {
//               //   console.log('remove selection')
//               //   view.dispatch(view.state.tr.deleteSelection())
//               // }, 50)
//             }
// 						// moveEl = null;
//           },
//           // handlePaste() {
//           //   console.log(moveEl);
//           // },
//           handleDOMEvents: {
//             drop(view, event) {
// 							// console.log("DROP", moveEl);
// 							// moveEl.parentNode.removeChild(moveEl);
//               // setTimeout(() => {
//               //   const node = document.querySelector('.ProseMirror-hideselection')
//               //   if (node) {
//               //     node.classList.remove('ProseMirror-hideselection')
//               //   }
//               // }, 50)
//             },
//             mousemove(view, event) {
//               const coords = {
//                 left: event.clientX + WIDTH + 50,
//                 top: event.clientY,
//               }
//               const pos = view.posAtCoords(coords)

//               if (pos) {
//                 let node = view.domAtPos(pos?.pos)

//                 if (node) {
//                   node = node.node
//                   while (node && node.parentNode) {
//                     if (node.parentNode?.classList?.contains('ProseMirror')) { // todo
//                       break
//                     }
//                     node = node.parentNode
//                   }

//                   if (node instanceof Element) {
// 										// console.dir(node.classList.contains('drag-item'));
										
										
//                     const cstyle = window.getComputedStyle(node)
//                     const lineHeight = parseInt(cstyle.lineHeight, 10)
//                     // const top = parseInt(cstyle.marginTop, 10) + parseInt(cstyle.paddingTop, 10)
//                     const top = 0
//                     const rect = absoluteRect(node)
//                     const win = node.ownerDocument.defaultView


//                     rect.top += win.pageYOffset + ((lineHeight - 24) / 2) + top
//                     rect.left += win.pageXOffset
//                     rect.width = `${WIDTH}px`

//                     dropElement.style.left = `${-WIDTH + rect.left}px`
//                     dropElement.style.top = `${rect.top}px`
										
// 										if(node.classList.contains('drag-item')) {
// 											dropElement.style.display = "none";
// 										} else {
// 											dropElement.style.display = "block";
// 										}
										
//                   }
//                 }
//               }
//             },
//           },
//         },
//       }),
//     ]
//   },
// })