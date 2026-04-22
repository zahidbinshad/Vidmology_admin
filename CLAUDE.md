# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server with HMR
npm run build     # Production build to /dist
npm run lint      # Run ESLint
npm run preview   # Serve the built /dist locally
```

## Architecture

**Vidmology Admin** is a React 19 + Vite single-page application for managing educational video content. It has no backend integration yet — all state is client-side, seeded with demo data.

### Single-file structure

The entire application lives in two files:
- `src/App.jsx` (~1220 lines) — all components, state, and logic
- `src/App.css` (~1570 lines) — all styles

There is no component splitting, routing library, or state management library. View switching is done via a `page` state variable (`'list'` | `'editor'` | `'student-catalog'` | `'student-player'`).

### State shape

Topics are the core data model, stored in a `topics` array in `App.jsx`. Each topic holds:
- Metadata: `title`, `category`, `tags`, `status`, `type` (`'single'` | `'series'`)
- `videos[]` — array of episodes, each with file upload state and quiz questions
- File objects stored as `File` instances with `URL.createObjectURL()` preview URLs

State is managed entirely with `useState` hooks directly in the top-level `App` component. No reducers, no context.

### Views

| Page value | Description |
|---|---|
| `list` | Admin table: search/filter published topics |
| `editor` | Create/edit topic with episode management and quiz builder |
| `student-catalog` | Browse/filter published topics as a student |
| `student-player` | Watch a video with sidebar, tabs (Overview/Quiz), and related videos |

### Styling conventions

All styles use BEM-inspired class names tied to view shells:
- `.admin-shell` — admin list view
- `.editor-shell` — topic editor
- `.sc-shell` — student catalog
- `.sv-shell` — student player

Color palette: blues/greens (`#5b6be9`, `#22b85f`, `#3a4154`). No CSS preprocessor or utility framework — plain CSS with Grid and Flexbox.

### File uploads

Files are handled entirely client-side via the browser `File` API. Preview URLs are created with `URL.createObjectURL()` and cleaned up via `URL.revokeObjectURL()`. No actual upload to a server yet.

### Notable patterns

- **Drag-and-drop** episode reordering is implemented inline (series mode only)
- **Single vs. Series toggle** changes validation rules and which UI sections render
- **"Log Payload" button** (line ~1207) dumps current editor state to console — useful for debugging the eventual API integration
- ESLint allows unused vars starting with capital letters or underscores (`react-hooks/exhaustive-deps` is set to `warn`, not `error`)
