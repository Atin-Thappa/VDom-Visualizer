import { useRef, useState } from "react";
import type { VNode } from "../vdom/types";

type JsonCardProps = {
  baseVNode: VNode;
  onCommit: (v: VNode) => void;
  onReset: () => void;
  oldTreeAnnotated: VNode | null;
};

type Mode = "edit" | "old-tree";

function OldTreeNode({ node, depth = 0 }: { node: VNode | string; depth?: number }) {
  if (typeof node === "string") {
    return <span className="italic text-slate-400">"{node}"</span>;
  }

  const isRemoved = node.diffStatus === "removed";

  return (
    <div
      className={`my-0.5 rounded px-2 py-1 font-mono text-xs ${
        isRemoved
          ? "border-l-2 border-red-400 bg-red-500/10 text-red-300"
          : "text-slate-300"
      }`}
      style={{ marginLeft: depth * 12 }}
    >
      <div className="flex items-baseline gap-2">
        <span className={isRemoved ? "text-red-300" : "text-blue-300"}>
          &lt;{node.type}&gt;
        </span>

        {Object.keys(node.props).length > 0 && (
          <span
            className={`truncate max-w-[240px] ${isRemoved ? "text-red-400/70" : "text-purple-300"}`}
            title={JSON.stringify(node.props)}
          >
            {Object.entries(node.props)
              .map(([k, v]) => `${k}="${v}"`)
              .join(" ")}
          </span>
        )}

        {isRemoved && (
          <span className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-wider text-red-400">
            deleted
          </span>
        )}
      </div>

      {node.children.length > 0 && (
        <div className="mt-0.5">
          {node.children.map((child, i) => (
            <OldTreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}


export default function JsonCard({
  baseVNode,
  onCommit,
  onReset,
  oldTreeAnnotated,
}: JsonCardProps) {
  const [mode, setMode]     = useState<Mode>("edit");
  const [raw, setRaw]       = useState(() => JSON.stringify(baseVNode, null, 2));
  const [error, setError]   = useState<string | null>(null);
  const [hasEdited, setHasEdited] = useState(false);
  const pendingRef          = useRef<VNode | null>(null);

  function handleChange(value: string) {
    setRaw(value);
    try {
      const parsed = JSON.parse(value) as VNode;
      if (parsed.type && parsed.props && Array.isArray(parsed.children)) {
        pendingRef.current = parsed;
        setError(null);
      } else {
        setError("Needs type, props, and children.");
      }
    } catch {
      setError("Invalid JSON — keep editing…");
    }
  }

  function handleBlur() {
    if (pendingRef.current) {
      onCommit(pendingRef.current);
      setHasEdited(true);
    }
  }

  function handleReset() {
    setRaw(JSON.stringify(baseVNode, null, 2));
    setError(null);
    setMode("edit");
    setHasEdited(false);
    pendingRef.current = null;
    onReset();
  }

  const canViewOldTree = oldTreeAnnotated !== null;

  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col">
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <h2 className="text-xl font-bold text-green-600 mr-auto">
          {mode === "edit" ? "VNode JSON" : "Old Tree"}
        </h2>
        <p className="text-xs text-slate-400">Click inside to edit the JSON directly</p>

        {mode === "edit" && canViewOldTree && (
          <button
            onClick={() => setMode("old-tree")}
            className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
          >
            View Old Tree →
          </button>
        )}

        {mode === "old-tree" && (
          <button
            onClick={() => setMode("edit")}
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            ← Back to Edit
          </button>
        )}

        {hasEdited && (
          <button
            onClick={handleReset}
            className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100"
          >
            Reset
          </button>
        )}

        {mode === "edit" && error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>

      {mode === "edit" ? (
        <textarea
          className={`flex-1 resize-none rounded-lg bg-slate-900 p-4 font-mono text-sm text-emerald-400 outline-none transition-shadow ${
            error
              ? "ring-2 ring-red-500"
              : "focus:ring-2 focus:ring-emerald-500"
          }`}
          value={raw}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          spellCheck={false}
        />
      ) : (
        <div className="flex-1 overflow-auto rounded-lg bg-slate-900 p-3">
          <OldTreeNode node={oldTreeAnnotated!} />
        </div>
      )}
    </div>
  );
}