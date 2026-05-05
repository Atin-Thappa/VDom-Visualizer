import { useMemo, useState } from "react";
import type { VNode } from "./vdom/types";
import ChartCard from "./components/ChartCard";
import JsonCard from "./components/JsonCard";
import VDomCard from "./components/VDomCard";
import { markDiff, markOldTree } from "./vdom/markDiff";

const vDomExamples: VNode[] = [
  {
    type: "div",
    props: { class: "p-4 bg-gray-200" },
    children: [
      { type: "p", props: {}, children: ["Hello World"] },
    ],
  },
  {
    type: "div",
    props: { class: "p-4 bg-gray-200 flex" },
    children: [
      { type: "div",  props: { class: "border-2 m-4 p-4 border-blue-200 rounded-lg" },        children: ["Box-1"] },
      { type: "span", props: { class: "flex-1 border-2 m-4 p-4 border-blue-200 rounded-lg" }, children: ["Box-2"] },
      { type: "span", props: { class: "border-2 m-4 p-4 border-blue-200 rounded-lg" },        children: ["Box-3"] },
    ],
  },
  {
    type: "div",
    props: { class: "p-4 bg-gray-200 flex" },
    children: [
      { type: "div",  props: { class: "border-2 m-4 p-4 border-blue-200 rounded-lg" },                        children: ["Box-1"] },
      { type: "span", props: { class: "flex-1 text-center border-2 m-4 p-4 border-blue-200 rounded-lg" },     children: ["Box-2, centered"] },
      { type: "span", props: { class: "border-2 m-4 p-4 border-blue-200 rounded-lg" },                        children: ["Box-3"] },
    ],
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousVNode, setPreviousVNode] = useState<VNode | null>(null);
  const [editedVNode, setEditedVNode] = useState<VNode | null>(null);

  const baseVNode = vDomExamples[currentIndex];

  const currentVNode: VNode = editedVNode ?? baseVNode;

  const diffBase: VNode | null = editedVNode ? baseVNode : previousVNode;

  const forwardDiff = useMemo(
    () => diffBase ? markDiff(diffBase, currentVNode) as VNode : currentVNode,
    [diffBase, currentVNode]
  );

  const oldTreeAnnotated = useMemo(
    () => diffBase ? markOldTree(diffBase, currentVNode) as VNode : null,
    [diffBase, currentVNode]
  );

  function handleExampleSelect(index: number) {
    setPreviousVNode(currentVNode);
    setCurrentIndex(index);
    setEditedVNode(null);
  }

  function handleCommit(v: VNode) {
    setEditedVNode(v);
  }

  function handleReset() {
    setEditedVNode(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleExampleSelect(0)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Example 1
        </button>
        <button
          onClick={() => handleExampleSelect(1)}
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Example 2
        </button>
        <button
          onClick={() => handleExampleSelect(2)}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Example 3
        </button>
      </div>

      <div className="grid h-[calc(100vh-100px)] grid-cols-2 gap-4">
        <div className="overflow-hidden">
          <ChartCard vnode={forwardDiff} />
        </div>

        <div className="overflow-hidden">
          <JsonCard
            key={currentIndex}
            baseVNode={baseVNode}
            onCommit={handleCommit}
            onReset={handleReset}
            oldTreeAnnotated={oldTreeAnnotated}
          />
        </div>

        <div className="col-span-2 overflow-hidden">
          <VDomCard vnode={currentVNode} />
        </div>
      </div>
    </div>
  );
}