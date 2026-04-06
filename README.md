# VDom Visualizer

A small project I built to understand how the Virtual DOM actually works under the hood.

Most frontend developers use React all the time, but a lot of people never really stop to think about what happens between changing state and seeing the UI update on the screen. I wanted to understand that process properly, so I built a simplified Virtual DOM system myself.

The project can:

* Create VNodes using a custom `createElement()` function
* Render those VNodes into actual DOM elements
* Compare two Virtual DOM trees
* Update only the changed parts of the DOM
* Visualize the VNode tree structure
* Show the JSON representation of the tree
* Highlight changed nodes in the tree view

---

## Tech Stack

* React
* TypeScript
* Tailwind CSS

---

## Folder Structure

```bash
src/
├── components/
│   ├── ChartCard.tsx
│   ├── JsonCard.tsx
│   └── VDomCard.tsx
│
├── vdom/
│   ├── createElement.ts
│   ├── render.ts
│   ├── diff.ts
│   ├── markDiff.ts
│   └── types.ts
│
├── App.tsx
└── main.tsx
```

---

## Main Features

### Custom VNode Creation

The project uses a custom `createElement()` function that creates a Virtual DOM node object.

```ts
createElement("div", { class: "container" }, [
  createElement("h1", {}, ["Hello World"]),
  createElement("p", {}, ["This is a VDOM visualizer"])
])
```

### Recursive Rendering

The `render()` function recursively walks through the VNode tree and converts it into actual DOM elements.

### Diffing Logic

This was probably the most important part of the project.

The `diff()` function compares an old VDOM tree with a new VDOM tree and only updates the parts that changed instead of rerendering everything.

Currently it supports:

* Replacing nodes
* Updating props
* Removing props
* Comparing child nodes recursively

It is still a basic diffing system and does not support keyed diffing, fragments, or event listeners yet.

### Visualization

One part I liked a lot was the tree visualization.

Instead of just printing raw JSON, the project also displays the VNode structure visually in a tree format so it is easier to understand parent-child relationships.

There is also color-coded highlighting for updated nodes, which makes it easier to see what changed between two versions of the Virtual DOM.

---

## What I Learned

This project taught me a lot more than I expected.

The main thing was understanding that the Virtual DOM is really just a tree structure plus comparison logic. Before building this, I knew React used a Virtual DOM, but I did not really understand what that actually meant in practice.

I also got more comfortable with:

* Recursive functions
* Tree traversal
* DOM manipulation
* TypeScript type modeling
* Component design
* Thinking about how frontend frameworks work internally

And honestly, building this made React feel a lot less “magical”.

---

## Possible Improvements

There are still a lot of things I would like to add later:

* Keyed diffing
* Functional component support
* Fragment support
* Event listener handling
* Side-by-side comparison of old and new trees
* Better animations for updates
* Remove node highlighting
* Performance benchmarking
* A live deployed demo

---

## Running Locally

```bash
npm install
npm run dev
```

Then open the localhost URL shown in the terminal.

---

## Why I Built This

I built this because I wanted to go deeper than just using React.

I think projects are a lot more valuable when they help you understand how something actually works internally, and this project definitely did that for me.

It is not meant to be a full React clone, but it covers the core idea behind how a Virtual DOM system works.
