# Quick Start Guide: Adding New Sections

## 🎯 3-Step Process to Add a New Section

### Example: Adding a "Use Cases" Section

#### Step 1: Create Collection Folder & Content
```bash
mkdir _usecases
```

Create a file `_usecases/2026-05-29-banking-modernization.md`:
```yaml
---
title: "Banking Modernization Use Case"
industry: ["Finance", "Banking"]
link: "https://example.com/use-case"
---
This use case demonstrates how to modernize legacy banking systems using IBM technologies...
```

#### Step 2: Update `_config.yml`
Add your collection to the collections section:
```yaml
collections:
  labs:
    output: true
  modes:
    output: true
  usecases:        # ← Add this
    output: true
```

#### Step 3: Update `_data/sections.yml`
Add your section configuration:
```yaml
  - id: usecases
    title: Use Cases
    icon: 📋
    show_search: true
    type: collection
    collection: usecases
    link_text: View Use Case
    empty_message: No use cases found. Add use cases to populate this section.
```

#### Step 4: Rebuild Jekyll
```bash
bundle exec jekyll serve
```

**That's it!** Your new section will automatically have:
- ✅ Navigation button in sidebar
- ✅ Search functionality
- ✅ Pagination
- ✅ Responsive cards
- ✅ Theme support

## 📋 Section Configuration Template

Copy and customize this template in `_data/sections.yml`:

```yaml
  - id: your-section-id           # Unique ID (lowercase, no spaces)
    title: Your Section Title     # Display name
    icon: 🎯                      # Emoji icon
    show_search: true             # Enable search (true/false)
    type: collection              # 'collection' or 'custom'
    collection: your_collection   # Collection name from _config.yml
    link_text: View Item          # Link button text
    empty_message: No items found. # Message when empty
```

## 🎨 Customizing Card Display

Your markdown files support these front matter fields:

```yaml
---
title: "Item Title"              # Required
industry: ["Tech", "Finance"]    # Optional - shows as blue badges
domain: ["Cloud", "AI"]          # Optional - shows as blue badges
duration: "2 hours"              # Optional - shows as green badge
link: "https://example.com"      # Optional - adds "View" link
---
Your content here (supports markdown)...
```

## 🔧 Common Customizations

### Change Items Per Page
Edit `assets/js/main.js`:
```javascript
const ITEMS_PER_PAGE = 6;  // Change to 9, 12, etc.
```

### Change Section Order
Reorder sections in `_data/sections.yml` - they appear in the order listed.

### Hide Search for a Section
Set `show_search: false` in the section configuration.

### Custom Section Layout
For non-standard layouts:
1. Create `_includes/your-custom-section.html`
2. Use `type: custom` and `include_file: your-custom-section.html`

## 📊 File Size Comparison

**Before Modularization:**
- `index.html`: 926 lines

**After Modularization:**
- `index.html`: 73 lines (92% reduction!)
- `assets/css/styles.css`: 485 lines
- `assets/js/main.js`: 237 lines
- `_includes/section-template.html`: 54 lines
- `_data/sections.yml`: 37 lines

**Total**: Better organized, easier to maintain!

## 🚀 Next Steps

1. Test your changes locally: `bundle exec jekyll serve`
2. View at: `http://localhost:4000`
3. Commit and push to deploy

## 💡 Pro Tips

- Keep section IDs lowercase and hyphenated
- Use descriptive icons that match your content
- Test search functionality with various terms
- Ensure all markdown files have proper front matter
- Use consistent badge types across similar content

---

Need help? Check the full [README.md](README.md) for detailed documentation.