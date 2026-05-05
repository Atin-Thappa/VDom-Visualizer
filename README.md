# VDom Visualizer

A small project I built to understand how the Virtual DOM actually works under the hood.

Most frontend developers use React all the time, but a lot of people never really stop to think about what happens between changing state and seeing the UI update on the screen. I wanted to understand that process properly, so I built a simplified Virtual DOM system myself.

---

## Tech Stack

- React
- TypeScript
- Tailwind CSS

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

The `diff()` function compares an old VDOM tree with a new one and only updates the parts that changed, instead of re-rendering everything.

It currently supports:

- Replacing nodes
- Updating props
- Removing props
- Comparing child nodes recursively

It is a basic diffing system and does not support keyed diffing, fragments, or event listeners yet.

### Tree Visualization

The VNode tree is displayed visually so parent-child relationships are easy to follow. Nodes are color-coded based on their diff status:

- **Green** — added
- **Yellow** — updated
- **Unchanged** — no decoration

### Live JSON Editing

The JSON panel is fully editable. You can modify the VNode structure directly and the tree visualization and rendered output update to reflect your changes. Edits are committed on blur, so you can type freely without anything updating mid-keystroke.

### Old Tree View

After any transition between states — whether switching examples or editing the JSON — you can toggle to an Old Tree view. This shows the previous VNode tree with deleted nodes highlighted in red, and nothing from the new tree injected into it.

The two views are intentionally separate:

- **New tree** — shows what exists now, with additions and updates annotated
- **Old tree** — shows what existed before, with only deletions highlighted

---

## What I Learned

This project taught me a lot more than I expected.

The main thing was understanding that the Virtual DOM is really just a tree structure plus comparison logic. Before building this, I knew React used a Virtual DOM but I did not really understand what that meant in practice.

I also got more comfortable with:

- Recursive functions and tree traversal
- DOM manipulation
- TypeScript type modeling
- Component design
- Thinking about how frontend frameworks work internally

Building this made React feel a lot less magical.

---

## Possible Improvements

- Keyed diffing
- Functional component support
- Fragment support
- Event listener handling
- Diff animations
- Performance benchmarking

---

## Running Locally

```bash
npm install
npm run dev
```

Then open the localhost URL shown in the terminal.

---

## Why I Built This

I wanted to go deeper than just using React.

I think projects are a lot more valuable when they help you understand how something actually works internally, and this one definitely did that. It is not meant to be a full React clone, but it covers the core idea behind how a Virtual DOM system works.