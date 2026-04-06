import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// import { createElement } from './vdom/createElement.ts'
// import { render } from './vdom/render.ts'
// const vnode = createElement(
//   "div",
//   {id: "app"},
//   [
//     "Hello",
//     createElement("span", {}, ["World"])
//   ]
// );
// const dom = render(vnode);
// document.body.appendChild(dom);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
