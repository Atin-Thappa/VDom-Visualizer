import { render } from "./render";
import type { VNode } from "./types";

function updateProps(
  element: HTMLElement,
  oldProps: Record<string, string>,
  newProps: Record<string, string>
) {
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      element.removeAttribute(key)
    }
  })

  Object.entries(newProps).forEach(([key, value]) => {
    if (oldProps[key] !== value) {
      element.setAttribute(key, value)
    }
  })
}

export function diff(
    oldVNode: VNode | string,
    newVNode: VNode | string,
    parent: Node,
    index = 0
) {
    const currentNode = parent.childNodes[index]
    
    if (!oldVNode) {
        parent.appendChild(render(newVNode))
        return
    }
    
    if (!newVNode) {
        parent.removeChild(currentNode)
        return
    }
    
    if (
        typeof oldVNode === "string" ||
        typeof newVNode === "string" ||
        oldVNode.type !== newVNode.type
    ) {
        parent.replaceChild(render(newVNode), currentNode)
        return
    }
    
    const element = currentNode as HTMLElement
    
    updateProps(element, oldVNode.props, newVNode.props)
    
    const maxLength = Math.max(
        oldVNode.children.length,
        newVNode.children.length
    )
    
    for (let i = 0; i < maxLength; i++) {
        diff(
            oldVNode.children[i],
            newVNode.children[i],
            element,
            i
        )
    }
}   