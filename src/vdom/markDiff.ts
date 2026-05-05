import type { VNode } from "./types";

/** Stamp every node in a subtree with the given status */
function markEntireTree(
  node: VNode | string,
  status: "added" | "removed"
): VNode | string {
  if (typeof node === "string") return node;
  return {
    ...node,
    diffStatus: status,
    children: node.children.map((c) => markEntireTree(c, status)),
  };
}

/**
 * Forward diff: annotates the NEW tree only.
 * - Nodes only in new  → "added"
 * - Nodes only in old  → NOT injected; deletions belong in the old-tree panel
 * - Changed nodes      → "updated"
 * - Same nodes         → "unchanged"
 */
export function markDiff(
  oldVNode: VNode | string | undefined,
  newVNode: VNode | string | undefined
): VNode | string {
  if (newVNode === undefined) return "" as unknown as VNode; // should never reach here now
  if (typeof newVNode === "string") return newVNode;
  if (oldVNode === undefined) return markEntireTree(newVNode, "added");
  if (typeof oldVNode === "string") {
    return { ...newVNode, diffStatus: "updated", children: newVNode.children };
  }

  const typeChanged  = oldVNode.type !== newVNode.type;
  const propsChanged = JSON.stringify(oldVNode.props) !== JSON.stringify(newVNode.props);
  const diffStatus   = typeChanged || propsChanged ? "updated" : "unchanged";

  // Only walk newVNode.children — deleted nodes are NOT the new tree's concern
  const mergedChildren: Array<VNode | string> = newVNode.children.map((newChild, i) => {
    const oldChild = oldVNode.children[i] as VNode | string | undefined;
    if (oldChild === undefined) {
      return markEntireTree(newChild, "added");
    }
    return markDiff(oldChild, newChild) as VNode | string;
  });

  return { ...newVNode, diffStatus, children: mergedChildren };
}

/**
 * Old-tree view: annotates the OLD tree only.
 * - Nodes absent or changed in new → "removed"
 * - Everything else                → "unchanged"
 * - NEVER injects anything from the new tree
 */
export function markOldTree(
  oldVNode: VNode | string,
  newVNode: VNode | string | undefined
): VNode | string {
  if (typeof oldVNode === "string") return oldVNode;
  if (newVNode === undefined) return markEntireTree(oldVNode, "removed");
  if (typeof newVNode === "string") return markEntireTree(oldVNode, "removed");
  if (oldVNode.type !== newVNode.type) return markEntireTree(oldVNode, "removed");

  const propsChanged = JSON.stringify(oldVNode.props) !== JSON.stringify(newVNode.props);
  const diffStatus   = propsChanged ? "removed" : "unchanged";

  const children: Array<VNode | string> = oldVNode.children.map((oldChild, i) => {
    const newChild = newVNode.children[i] as VNode | string | undefined;
    return markOldTree(oldChild, newChild);
  });

  return { ...oldVNode, diffStatus, children };
}