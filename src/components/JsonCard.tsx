import type { VNode } from "../vdom/types";

type ChartCardProps = {
  vnode: VNode;
};

export default function ChartCard({ vnode }: ChartCardProps) {
  return <div className="h-full rounded-xl border border-gray-300 bg-white p-4 shadow flex flex-col">
    <h2 className="mb-3 text-xl font-bold text-green-600">
      VNode JSON
    </h2>

    <pre className="flex-1 overflow-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
      {JSON.stringify(vnode, null, 2)}
    </pre>
  </div>
}