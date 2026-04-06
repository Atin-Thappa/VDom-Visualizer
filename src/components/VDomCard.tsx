import { useEffect, useRef } from "react";
import { render } from "../vdom/render";
import type { VNode } from "../vdom/types";

type VDomCardProps = {
  vnode: VNode;
}


export default function VDomCard({vnode}: VDomCardProps) {
  const VDomRef = useRef< HTMLDivElement | null >(null)

  useEffect(()=>{
    if (VDomRef.current){
      VDomRef.current.innerHTML = "";

      const newVNode = render(vnode);
      VDomRef.current.appendChild(newVNode);
    }
  },[vnode])


  return <div className="h-full rounded-xl border border-gray-300 bg-white p-4 shadow flex flex-col">
    <h2 className="mb-3 text-xl font-bold text-blue-600">
    Rendered Output
    </h2>

    <div
    ref={VDomRef}
    className="flex-1 overflow-auto rounded-lg border-2 border-dashed border-blue-400 bg-gray-50 p-4"
    />
    </div>
}