# Collapsible Sidebar Nav Groups — Plan

## Overview

The sidebar currently shows 13 flat nav items. The goal is to group related sections under collapsible headers, reducing the visible count to ~5 top-level items. Groups will expand/collapse on click. This is a **pure front-end change** — no new routing or data files are needed.

The grouping approach from the prior analysis:

| Group label | Sections inside | Default state |
|---|---|---|
| *(ungrouped)* | Introduction | Always visible |
| Get Started | Documentation, Learning Resources | Collapsed |
| Explore Bob | Use-Cases, Asset Studio, Premium Packages | Expanded |
| Extend Bob | Skills, MCP, Subagents, Modes | Collapsed |
| Community & Support | Case Studies, Bob Community, Contact Us | Collapsed |

---

## Sub-Task 1 — Add group metadata to `_data/sections.yml`

**Intent:** Declare which group each section belongs to directly in the data file. This is the single source of truth and avoids hard-coding group membership in JS or HTML.

**Expected Outcomes:**
- Every section entry in `sections.yml` has a `group` field (or is absent for ungrouped/standalone items like Introduction).
- A parallel `nav_groups` list in `sections.yml` declares group id, label, and default `expanded` state.

**Todo List:**
1. Add a `nav_groups` top-level key to `_data/sections.yml` listing each group with `id`, `title`, and `expanded` (bool).
2. Add a `group` field to each section entry matching one of those group ids. Introduction gets no `group` field.

**Relevant Context:**
- [`_data/sections.yml`](_data/sections.yml) — the only file to touch in this sub-task.

**Status:** [ ] pending

---

## Sub-Task 2 — Rewrite the Liquid nav loop in `index.html`

**Intent:** Replace the flat `{% for section %}` loop with a loop that renders group headers (with chevron toggle icons) before their child section buttons. This keeps the build-time approach; JavaScript only controls open/closed state.

**Expected Outcomes:**
- Standalone sections (Introduction) render as plain `.sidebar-button` as before.
- Each group renders as a `<button class="nav-group-header" data-group="…">` followed by a `<div class="nav-group-children">` containing its `.sidebar-button` items.
- Expanded groups have `class="nav-group-children open"` in HTML (so default-expanded groups are visible without JS).

**Todo List:**
1. Add a new Liquid loop in `index.html` (lines 44–50) that:
   a. Iterates `site.data.sections.nav_groups` to build a group-id → expanded map.
   b. Iterates `site.data.sections.sections`.
   c. For the first section in a group, outputs the group header button before the section.
   d. For sections without a group, outputs the section button directly.
   e. Closes the `nav-group-children` div after the last section in each group.
2. Group header button must include a `<span class="nav-group-chevron">` icon for the caret.

**Relevant Context:**
- [`index.html`](index.html:43-51) — current flat loop.
- [`_data/sections.yml`](_data/sections.yml) — after Sub-Task 1 adds `nav_groups` and `group` fields.

**Status:** [ ] pending

---

## Sub-Task 3 — Add CSS for group headers and children container

**Intent:** Style the group header buttons and the collapsible children container. Reuse existing Carbon token variables already in use.

**Expected Outcomes:**
- `.nav-group-header` looks visually distinct from `.sidebar-button` (slightly bolder, no left accent bar).
- `.nav-group-chevron` rotates 90° when the group is open.
- `.nav-group-children` uses `max-height` transition for smooth open/close animation (CSS-only height animation).
- When collapsed, `.nav-group-children` is hidden (`max-height: 0; overflow: hidden`).
- When open, `.nav-group-children.open` expands to a large `max-height` to reveal all children.

**Todo List:**
1. Append new CSS rules to [`assets/css/styles.css`](assets/css/styles.css) after the existing `.sidebar-button.sub-item` block (around line 916):
   - `.nav-group-header` base styles.
   - `.nav-group-header:hover` state.
   - `.nav-group-chevron` transform base + `.open .nav-group-chevron` rotated state.
   - `.nav-group-children` collapsed state.
   - `.nav-group-children.open` expanded state.

**Relevant Context:**
- [`assets/css/styles.css`](assets/css/styles.css:260-291) — existing `.sidebar-button` and `.sidebar-button.active` patterns to match visually.
- [`assets/css/styles.css`](assets/css/styles.css:912-916) — `.sidebar-button.sub-item` indent (children buttons will use this class).

**Status:** [ ] pending

---

## Sub-Task 4 — Add JS toggle logic and update `activateSection`

**Intent:** Wire click handlers on group headers and ensure that navigating to a section inside a collapsed group auto-expands that group.

**Expected Outcomes:**
- Clicking a group header toggles the `.open` class on its sibling `.nav-group-children`.
- When `activateSection(sectionId)` is called (via routing or click), the parent group (if any) is automatically expanded so the active button is visible.
- The existing `sidebarButtons` query and click handler still work unchanged for the section buttons inside groups.
- No changes to `ROUTE_MAP`, `SECTION_TO_ROUTE`, `ALL_PAGINATED_SECTIONS`, or `SEARCH_SECTIONS` — routing is unaffected.

**Todo List:**
1. After the `sidebarButtons` declaration (line 410 in `main.js`), add:
   - `const navGroupHeaders = document.querySelectorAll('.nav-group-header');`
2. Add a click event listener loop for `navGroupHeaders` that toggles `.open` on the next sibling element (`.nav-group-children`), and also toggles an `.open` class on the header itself (for chevron rotation).
3. In `activateSection()` (line 439), after the line that adds `.active` to `matchingBtn` (line 446), add logic to find the matching button's parent `.nav-group-children` (if any) and add `.open` to it and its preceding sibling (the header).

**Relevant Context:**
- [`assets/js/main.js`](assets/js/main.js:410) — `sidebarButtons` declaration.
- [`assets/js/main.js`](assets/js/main.js:439-492) — `activateSection()` function.
- [`assets/js/main.js`](assets/js/main.js:520-526) — existing sidebar click handlers (no change needed).

**Status:** [ ] pending

---

## Constraints / Non-Goals

- No changes to `ROUTE_MAP`, `SECTION_TO_ROUTE`, `ALL_PAGINATED_SECTIONS`, or `SEARCH_SECTIONS` — group headers are not routable sections.
- No localStorage persistence of open/closed state — default state comes from `sections.yml` `expanded` field, re-applied on each page load.
- No changes to any `_includes/` files — section content rendering is untouched.
- Jekyll build and GitHub Pages deployment are unaffected.
