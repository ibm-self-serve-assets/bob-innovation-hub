# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Stack

Jekyll static site (no Gemfile — deployed via GitHub Pages). No npm, no build scripts. All content managed via [Pages CMS](https://pagescms.org/) (`.pages.yml`).

## Commands

```bash
bundle exec jekyll serve    # local dev → http://localhost:4000
bundle exec jekyll build    # static build
```

No linter, no test suite.

## Architecture

Single-page app rendered by Jekyll. Navigation is purely JavaScript hash-routing — no page reloads. Key files:

- [`_data/sections.yml`](_data/sections.yml) — defines all sidebar sections and their type (`collection`, `collection-tabbed`, `custom`)
- [`index.html`](index.html) — shell; includes one `_includes/[id]-section.html` per section
- [`assets/js/main.js`](assets/js/main.js) — all routing, search, pagination, domain-filter, share-button logic

## Adding a New Section — Required 5-file touch

1. `_config.yml` — add collection (`output: false`)
2. `_data/sections.yml` — add entry with `type:` and `id:`
3. `_includes/[id]-section.html` — create card grid HTML
4. `index.html` — add `{% include [id]-section.html %}`
5. `assets/js/main.js` — add section id to `currentPage`, `ALL_PAGINATED_SECTIONS`, `SEARCH_SECTIONS`, `ROUTE_MAP`, and `SECTION_TO_ROUTE`

> See [`QUICK_START.md`](QUICK_START.md) for the full walkthrough.

## Content Front Matter Conventions

### Labs (`_labs/`)
```yaml
title: string          # required
team: "Service Engineering" | "Other"   # controls sort order
domain: "Data" | "Automation" | "Security" | "Modernization"
duration: "45 mins"
link: url
featured: 1-50         # lower = shown first; omit for normal ordering
```

### Use-Cases (`_use-cases/`)
```yaml
type: "Technical" | "Business"   # controls which sub-tab it appears in
domain: string
link, demo, mode, slide_deck     # all optional; slide_deck is a path under docs/slide_decks/
```

### Modes (`_modes/`)
```yaml
type: "Premium" | "Custom"       # controls sub-tab
industry: [Cross, AI, Finance, …]  # array
link, demo, lab                  # optional
```

## Card Sorting (non-obvious)

Within each section, cards are sorted: `featured` items first (ascending `featured` value), then `team: Service Engineering`, then everything else. This is done **in Liquid at build time** via chained `assign` + `concat`, not JavaScript.

## Domain Filter Pills

Domain pills in `_includes/*-section.html` are generated at build time from the collection's `domain` values. JavaScript matches `card.dataset.domain` (lowercased) against the pill's `data-domain`. Adding a new domain value in a content file automatically adds the pill — no HTML change needed.

## Hash Routing

URLs use `#/section` and `#/section/subsection?q=search`. Both `ROUTE_MAP` (hash→section) and `SECTION_TO_ROUTE` (section→hash) in `main.js` must be kept in sync when adding sections.

## Slide Decks

PDFs stored in `docs/slide_decks/`. The `slide_deck` front matter field is a site-relative path (e.g. `/docs/slide_decks/foo.pdf`). The include hardcodes the GitHub blob URL prefix: `https://github.com/ibm-self-serve-assets/bob-innovation-hub/blob/main{{ usecase.slide_deck }}`.
