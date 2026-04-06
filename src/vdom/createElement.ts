import type { VNode } from "./types";

export function createElement(
    type : string,
    props: Record< string, any > = {},
    children: Array<VNode | string > = []
):VNode{
    return{
        type : type,
        props : props,
        children: children,
    };
}