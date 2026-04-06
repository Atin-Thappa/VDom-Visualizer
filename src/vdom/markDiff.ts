import type { VNode } from "./types";

export function markDiff(
  oldVNode: VNode | string,
  newVNode: VNode | string
): VNode | string {
  if (typeof newVNode === "string") {
    return newVNode;
  }

  if (!oldVNode) {
    return {
      ...newVNode,
      diffStatus: "added",
      children: newVNode.children.map((child) =>
        typeof child === "string" ? child : markDiff(undefined as any, child)
      ),
    };
  }

  if (typeof oldVNode === "string") {
    return {
      ...newVNode,
      diffStatus: "updated",
      children: newVNode.children,
    };
  }

  const propsChanged =
    JSON.stringify(oldVNode.props) !== JSON.stringify(newVNode.props);

  const typeChanged = oldVNode.type !== newVNode.type;

  const diffStatus = typeChanged
    ? "updated"
    : propsChanged
    ? "updated"
    : "unchanged";

  return {
    ...newVNode,
    diffStatus,
    children: newVNode.children.map((child, index) => {
      const oldChild = oldVNode.children[index];

      if (typeof child === "string") {
        return child;
      }

      return markDiff(oldChild as VNode, child);
    }),
  };
}