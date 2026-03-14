# Architecture

This site is now built with VitePress and keeps all user-facing content in Markdown.

## Structure

```
docs/
├── index.md
├── about.md
├── projects.md
├── blog.md
├── research.md
└── .vitepress/
    ├── config.ts
    └── theme/
        ├── index.ts
        └── custom.css
```

## Design Goals

- Minimal content templates (1-2 bullets per section).
- Clean, readable typography and neutral color palette.
- Sidebar links for navigation and external placeholders.

## Content Flow

- Page content lives in `docs/*.md`.
- Navigation and sidebar are defined in `docs/.vitepress/config.ts`.
- Styling overrides live in `docs/.vitepress/theme/custom.css`.
