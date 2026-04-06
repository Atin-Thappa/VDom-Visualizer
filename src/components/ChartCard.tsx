import type { VNode } from "../vdom/types"

type ChartCardProps = {
  vnode: VNode
}

type TreeNodeProps = {
  node: VNode | string
}

function TreeNode({ node }: TreeNodeProps) {
  if (typeof node === "string") {
    return <div className="ml-6 mt-2 border-l-2 border-dashed border-gray-300 pl-4">
      <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 font-mono text-sm italic text-gray-700">
        "{node}"
        </div>
      </div>
  }

const borderColor =
  node.diffStatus === "added"
    ? "border-green-400 bg-green-50"
    : node.diffStatus === "updated"
    ? "border-yellow-400 bg-yellow-50"
    : node.diffStatus === "removed"
    ? "border-red-400 bg-red-50"
    : "border-blue-300 bg-blue-50";

const textColor =
  node.diffStatus === "added"
    ? "text-green-700"
    : node.diffStatus === "updated"
    ? "text-yellow-700"
    : node.diffStatus === "removed"
    ? "text-red-700"
    : "text-blue-700";

return <div className="ml-4 mt-4">
  <div className={`relative rounded-xl border-2 px-4 py-3 shadow-sm ${borderColor}`}>
    <div className="flex items-center justify-between">
      <div className={`font-mono text-sm font-bold uppercase tracking-wide ${textColor}`}>
        {node.type}
      </div>

      {node.diffStatus && node.diffStatus !== "unchanged" && (
        <span
          className={`rounded-full px-2 py-1 text-xs font-bold uppercase ${
            node.diffStatus === "added"
              ? "bg-green-200 text-green-800"
              : node.diffStatus === "updated"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {node.diffStatus}
        </span>
      )}
    </div>

    {Object.keys(node.props).length > 0 && (
      <div className="mt-2 rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600">
        {JSON.stringify(node.props)}
      </div>
    )}
  </div>
    {node.children.length > 0 && (
      <div className="ml-6 mt-2 border-l-2 border-dashed border-gray-300 pl-4 space-y-2">
        {node.children.map((child, index) => (
          <TreeNode key={index} node={child} />
        ))}
      </div>
    )}
  </div>
}

export default function ChartCard({ vnode }: ChartCardProps) {
  return <div className="rounded-xl border border-gray-300 bg-gray-50 p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">VNode Tree</h2>

      <TreeNode node={vnode} />
    </div>
}