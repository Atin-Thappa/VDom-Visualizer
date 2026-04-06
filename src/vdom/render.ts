import type { VNode } from "./types";

export function render(vnode : VNode | string):Node{
    if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

    const element = document.createElement(vnode.type);
    for(const attribute in vnode.props){
        element.setAttribute(attribute, vnode.props[attribute]);
    }
    vnode.children.forEach((child) =>{
        if(typeof child === "string"){
            const textNode = document.createTextNode(child);
            element.appendChild(textNode);
        }else{
            const childElement = render(child);
            element.appendChild(childElement);
        }
    })
    return element;
}