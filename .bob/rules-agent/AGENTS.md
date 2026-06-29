# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Critical Coding Rules

- **No Gemfile / package.json** — do not create them. Dependencies are managed by GitHub Pages' built-in Jekyll.
- **`_config.yml` collections must have `output: false`** — the site is a single-page app; individual collection pages are not used.
- **Card HTML data attributes must be lowercased** — all `data-title`, `data-domain`, `data-team`, `data-industry` values in Liquid must use `| downcase`. JS search relies on this.
- **Every new section needs 5 coordinated edits** — `_config.yml`, `_data/sections.yml`, `_includes/[id]-section.html`, `index.html`, and 5 places in `assets/js/main.js` (`currentPage`, `ALL_PAGINATED_SECTIONS`, `SEARCH_SECTIONS`, `ROUTE_MAP`, `SECTION_TO_ROUTE`). Missing any one breaks routing or pagination silently.
- **Tabbed sections** use `type: collection-tabbed` in `sections.yml` and require `sub_sections:` with `filter_key`/`filter_value`. Their JS keys are the sub-section IDs (e.g. `technical-use-cases`), not the parent section ID.
- **Sorting is done in Liquid, not JS** — use the `_lb_feat / _lb_se / _lb_other` concat pattern seen in `_includes/labs-section.html`. Do not sort in JS.
- **Pagination container IDs** follow the pattern `[section-id]-pagination` and `[section-id]-container` — the JS selects them by this convention; deviating breaks pagination.
- **`slide_deck` paths** in use-case front matter are site-root-relative (`/docs/slide_decks/foo.pdf`); the include template prepends the full GitHub blob URL automatically.
