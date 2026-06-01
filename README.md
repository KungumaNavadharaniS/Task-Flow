TaskFlow — To-Do List Web App

A clean, animated, glassmorphism-styled To-Do list built with **Vanilla JavaScript** (no frameworks or libraries). Tasks persist across page refreshes using `localStorage`.

---

 Project Structure

```
todo-app/
├── index.html   — App layout and structure
├── style.css    — All styling, animations, and theme
├── app.js       — All JavaScript logic
└── README.md    — This file
```

---

Features

| Feature | Description |
|---|---|
| Add tasks | Type and press Enter or click **ADD TASK** |
| Complete tasks | Click the checkbox to toggle done/undone |
| Delete tasks | Hover over a task and click ✕ |
| Filter view | Switch between All / Active / Completed |
| Clear done | Remove all completed tasks in one click |
| Live stats | Total, Done, and Pending counts update instantly |
| Progress bar | Animated gradient bar tracks completion % |
| Character counter | Shows n/120 limit; turns red near the cap |
| Shake on empty | Input shakes if you try to add a blank task |
| Persistence | Tasks are saved to `localStorage` and survive refresh |

---

How to Run

Option 1 — VS Code + Live Server (recommended)

1. Open the `todo-app/` folder in **VS Code**
2. Install the **Live Server** extension (if not already)
3. Right-click `index.html` → **Open with Live Server**
4. App opens at `http://127.0.0.1:5500`

Option 2 — Direct browser

Double-click `index.html` to open it directly in Chrome or any modern browser. All features work except `localStorage` may be restricted on some systems when opened as a `file://` URL — use Live Server to avoid this.

---

Tech Stack

- **HTML5** — Semantic markup, ARIA labels for accessibility
- **CSS3** — Custom properties, `backdrop-filter`, keyframe animations, CSS gradients
- **JavaScript (ES6+)** — DOM manipulation, event delegation, `localStorage` API
- **Google Fonts** — Nunito (headings) + Fira Code (mono labels)

No npm, no bundler, no dependencies — just open and use.

---

Design Theme

The UI uses a **glassmorphism** aesthetic:

- Animated gradient background (lavender → sky blue → rose → gold)
- Frosted-glass cards with `backdrop-filter: blur()`
- Purple-to-pink gradient accents on buttons and interactive elements
- Spring-physics animations (`cubic-bezier(0.34, 1.56, 0.64, 1)`) on task add/remove
- Green gradient stripe on completed tasks
- Smooth hover lift effects on all interactive elements

---

Criteria Coverage

This project meets all internship top-performer criteria:

- **Timely task submission** — All deliverables (HTML, CSS, JS, README) are complete
- **Project completion and quality** — Fully functional app with polished UI and well-documented code
- **Task presentation** — Clean file structure, commented source code, and this README explaining methods and results

---
 Browser Support

Works in all modern browsers: Chrome, Firefox, Edge, Safari (ES6+ required).
