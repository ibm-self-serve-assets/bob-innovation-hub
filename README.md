# Bob Innovation Hub - Modular Structure

This project has been modularized to make it easy to add new sections and maintain the codebase.

## 📁 Project Structure

```
bob-innovation-hub/
├── index.html                      # Main entry point (now simplified)
├── _config.yml                     # Jekyll configuration
├── assets/
│   ├── css/
│   │   └── styles.css             # All CSS styles (extracted)
│   └── js/
│       └── main.js                # All JavaScript (extracted)
├── _includes/
│   ├── section-template.html      # Reusable section template
│   └── introduction-section.html  # Custom introduction section
├── _data/
│   ├── sections.yml               # Section configuration
│   ├── bobathon.yml
│   └── introduction.md
├── _labs/                         # Lab markdown files
├── _modes/                        # Mode markdown files
└── README.md                      # This file
```

## 🚀 How to Add a New Section

Adding a new section is now a simple 3-step process:

### Step 1: Create Your Collection (if needed)

If you're adding a new type of content (e.g., "use-cases" or "demos"), create a new folder:

```bash
mkdir _usecases
```

Add your markdown files to this folder with front matter:

```yaml
---
title: "Your Use Case Title"
industry: ["Finance", "Healthcare"]
link: "https://example.com"
---
Your content here...
```

### Step 2: Configure Jekyll Collection

Add the collection to `_config.yml`:

```yaml
collections:
  labs:
    output: true
  modes:
    output: true
  usecases:           # Add your new collection
    output: true
```

### Step 3: Add Section to Configuration

Edit `_data/sections.yml` and add your new section:

```yaml
sections:
  - id: introduction
    title: Introduction
    icon: 📖
    show_search: false
    type: custom
    include_file: introduction-section.html
    
  - id: labs
    title: Hands-on Labs
    icon: 🚀
    show_search: true
    type: collection
    collection: labs
    link_text: View Lab
    empty_message: No active labs found.
    
  - id: modes
    title: Bob Modes
    icon: 🤖
    show_search: true
    type: collection
    collection: modes
    link_text: View on GitHub
    empty_message: No application presets compiled.
    
  # Add your new section here:
  - id: usecases
    title: Use Cases
    icon: 📋
    show_search: true
    type: collection
    collection: usecases
    link_text: View Use Case
    empty_message: No use cases found. Add use cases to populate this section.
```

That's it! Your new section will automatically appear in:
- ✅ The sidebar navigation
- ✅ The main content area
- ✅ Search functionality
- ✅ Pagination

## 🎨 Customization Options

### Section Configuration Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `id` | Yes | Unique identifier for the section | `usecases` |
| `title` | Yes | Display title in navigation | `Use Cases` |
| `icon` | Yes | Emoji icon for navigation | `📋` |
| `show_search` | Yes | Enable/disable search for this section | `true` |
| `type` | Yes | `collection` or `custom` | `collection` |
| `collection` | If type=collection | Jekyll collection name | `usecases` |
| `link_text` | Optional | Text for item links | `View Use Case` |
| `empty_message` | Optional | Message when no items exist | `No items found.` |
| `include_file` | If type=custom | Custom include file name | `custom-section.html` |

### Creating Custom Sections

For sections that don't follow the standard card layout (like the Introduction), create a custom include file:

1. Create a new file in `_includes/` (e.g., `_includes/custom-section.html`)
2. Add your custom HTML structure
3. Reference it in `_data/sections.yml`:

```yaml
- id: custom
  title: Custom Section
  icon: 🎯
  show_search: false
  type: custom
  include_file: custom-section.html
```

## 🔧 Modifying Styles

All styles are now in `assets/css/styles.css`. The file is organized into sections:

- CSS Variables (theme colors)
- Base Styles
- Layout Components
- UI Components
- Responsive Design

To modify colors, update the CSS variables at the top of the file:

```css
:root {
  --accent-primary: #0366d6;  /* Change primary color */
  --bg-primary: #ffffff;      /* Change background */
  /* ... */
}
```

## 📝 Modifying JavaScript

All JavaScript is in `assets/js/main.js`. Key functions:

- `updateThemeButton(theme)` - Theme toggle functionality
- `filterAndPaginate(section)` - Search and pagination
- `updatePagination(section, page, totalPages, totalItems)` - Pagination UI
- `changePage(section, newPage)` - Page navigation

## 🎯 Benefits of This Structure

1. **Easy to Add Sections**: Just edit one YAML file
2. **Maintainable**: Separate concerns (HTML, CSS, JS)
3. **Reusable**: Template works for any collection
4. **Scalable**: Add unlimited sections without touching core code
5. **Clean**: index.html reduced from 926 lines to 73 lines

## 📚 Example: Adding a "Demos" Section

1. Create `_demos/` folder with markdown files
2. Add to `_config.yml`:
   ```yaml
   collections:
     demos:
       output: true
   ```
3. Add to `_data/sections.yml`:
   ```yaml
   - id: demos
     title: Demos
     icon: 🎯
     show_search: true
     type: collection
     collection: demos
     link_text: View Demo
     empty_message: No demos available yet.
   ```

Done! The demos section will automatically appear with full functionality.

## 🐛 Troubleshooting

**Section not appearing?**
- Check that the collection is defined in `_config.yml`
- Verify the section ID matches the collection name
- Rebuild Jekyll: `bundle exec jekyll serve`

**Search not working?**
- Ensure `show_search: true` in sections.yml
- Check that cards have proper `data-*` attributes

**Pagination issues?**
- Verify `ITEMS_PER_PAGE` in `assets/js/main.js`
- Check that section ID is added to `currentPage` object

## 📞 Support

For questions or issues, please refer to the IBM Bob Innovation Hub documentation or contact the development team.

---

**Last Updated**: 2026-05-29
**Version**: 2.0 (Modularized)