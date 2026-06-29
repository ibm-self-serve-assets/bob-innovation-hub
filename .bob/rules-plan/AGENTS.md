# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Architectural Constraints

- **Single HTML file, all sections always rendered** — `index.html` includes every section's HTML at build time. Visibility is toggled via CSS `.active` class in JS, not conditional rendering. Adding a section means its HTML is always in the DOM.
- **Hash routing is the only navigation mechanism** — `ROUTE_MAP` and `SECTION_TO_ROUTE` in `main.js` are manually maintained parallel maps; they must be updated symmetrically or routing breaks.
- **Pagination is per-section-ID** — the `currentPage` object and `ALL_PAGINATED_SECTIONS` array in `main.js` must explicitly enumerate every paginated section. New sections are not auto-discovered.
- **Sub-tab sections (use-cases, modes) have a hidden initial tab state bug**: the first `active` sub-tab in HTML is set manually in the include file. If the HTML `active` class and the `ROUTE_MAP` default sub-section disagree, the initial render shows the wrong tab. Both must point to the same sub-section.
- **`featured` field is the only ordering control** — there is no date-based sort; Jekyll collection ordering is otherwise filesystem alphabetical. The `featured: 1–50` integer is the only way to pin items to the top within their team group.
- **No server-side logic** — GitHub Pages serves pre-built static files. All filtering, sorting, and pagination happens client-side in `main.js` against pre-rendered HTML `data-*` attributes.
- **`docs/slide_decks/`** is the only supported media upload path (enforced by `.pages.yml` media config).
