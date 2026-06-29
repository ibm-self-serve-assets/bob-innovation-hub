# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Documentation Context

- **`QUICK_START.md`** is the primary developer guide — covers the full 7-step process for adding a new section with concrete code examples.
- **`.pages.yml`** is the Pages CMS schema — defines all editable fields per collection. This is the authoritative list of supported front matter fields for each content type.
- **`_data/sections.yml`** controls both the sidebar nav order and the rendering type (`collection`, `collection-tabbed`, `custom`) — not `_config.yml`.
- **"Custom" section type** means the HTML is entirely in `_includes/[include_file]` (not auto-generated); `collection` and `collection-tabbed` types still require a manually written include file — the `type` field only affects `sections.yml` documentation, not code generation.
- **There is no test suite or CI** — validate changes by running `bundle exec jekyll serve` locally.
- **`_data/bobathon.yml`** holds only the landing page headline/description; it is not used for section config.
- **Domain filter pills are build-time generated** from `domain` values in collection files — no manual HTML edits needed to add a new domain.
