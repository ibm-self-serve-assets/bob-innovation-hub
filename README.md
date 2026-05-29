# Bob Innovation Hub - Modular Structure

This project has been modularized to make it easier to maintain and extend with new sections.

## 📁 Project Structure

```
bob-innovation-hub/
├── index.html                      # Main entry point (simplified to 61 lines)
├── _config.yml                     # Jekyll configuration
├── assets/
│   ├── css/
│   │   └── styles.css             # All CSS styles (extracted)
│   └── js/
│       └── main.js                # All JavaScript (extracted)
├── _includes/
│   ├── introduction-section.html  # Introduction section
│   ├── labs-section.html          # Labs section
│   └── modes-section.html         # Modes section
├── _data/
│   ├── sections.yml               # Section configuration
│   ├── bobathon.yml
│   └── introduction.md
├── _labs/                         # Lab markdown files
├── _modes/                        # Mode markdown files
└── README.md                      # This file
```

## 🚀 How to Add a New Section

Adding a new section is now a simple 4-step process:

### Step 1: Create Your Collection

Create a new folder for your content type (e.g., "use-cases"):

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

Edit `_data/sections.yml` to add your section metadata:

```yaml
sections:
  - id: introduction
    title: Introduction
    icon: 📖
    
  - id: labs
    title: Hands-on Labs
    icon: 🚀
    
  - id: modes
    title: Bob Modes
    icon: 🤖
    
  # Add your new section:
  - id: usecases
    title: Use Cases
    icon: 📋
```

### Step 4: Create Section Include File

Create a new file `_includes/usecases-section.html` (copy from labs-section.html or modes-section.html as a template):

```html
<!-- Use Cases Section -->
<div id="usecases-section" class="content-section">
  <h2 class="section-title">📋 Use Cases</h2>
  <div id="usecases-container" class="cards-grid">
    {% for usecase in site.usecases %}
      <div class="asset-card" 
           data-title="{{ usecase.title | downcase }}" 
           data-content="{{ usecase.content | strip_html | downcase }}" 
           data-industry="{{ usecase.industry | join: ' ' | downcase }}">
        <h3>{{ usecase.title }}</h3>
        <div class="badge-container">
          {% if usecase.industry %}
            {% for ind in usecase.industry %}
              <span class="badge badge-blue">🏢 {{ ind }}</span>
            {% endfor %}
          {% endif %}
        </div>
        <div class="card-body">
          {{ usecase.content }}
        </div>
        {% if usecase.link %}
          <div style="margin-top: 1rem;">
            <a href="{{ usecase.link }}" target="_blank" rel="noopener noreferrer" 
               style="color: var(--accent-primary); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">
              🔗 View Use Case
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.7;">
                <path d="M10.5 1.5L1.5 10.5M10.5 1.5H3M10.5 1.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        {% endif %}
      </div>
    {% else %}
      <div class="empty-state">
        <p>No use cases found. Add use cases to populate this section.</p>
      </div>
    {% endfor %}
  </div>
  <div id="usecases-pagination" class="pagination"></div>
</div>
```

### Step 5: Add Include to index.html

Add the include statement in `index.html` before the closing `</main>` tag:

```html
<!-- Use Cases Section -->
{% include usecases-section.html %}
```

### Step 6: Update JavaScript

Add your section to `assets/js/main.js`:

In the `currentPage` object (around line 82):
```javascript
let currentPage = {
  labs: 1,
  modes: 1,
  usecases: 1  // Add this
};
```

In the `DOMContentLoaded` event (around line 221):
```javascript
document.addEventListener('DOMContentLoaded', () => {
  filterAndPaginate('introduction');
  filterAndPaginate('labs');
  filterAndPaginate('modes');
  filterAndPaginate('usecases');  // Add this
});
```

### Step 7: Rebuild Jekyll

```bash
bundle exec jekyll serve
```

**That's it!** Your new section will automatically have:
- ✅ Navigation button in sidebar (from sections.yml)
- ✅ Search functionality
- ✅ Pagination
- ✅ Responsive cards
- ✅ Theme support

## 📋 Section Include Template

Use this template when creating a new section file in `_includes/`:

```html
<!-- [Section Name] Section -->
<div id="[section-id]-section" class="content-section">
  <h2 class="section-title">[icon] [Section Title]</h2>
  <div id="[section-id]-container" class="cards-grid">
    {% for item in site.[collection-name] %}
      <div class="asset-card" 
           data-title="{{ item.title | downcase }}" 
           data-content="{{ item.content | strip_html | downcase }}" 
           data-industry="{{ item.industry | join: ' ' | downcase }}">
        <h3>{{ item.title }}</h3>
        <div class="badge-container">
          {% if item.industry %}
            {% for ind in item.industry %}
              <span class="badge badge-blue">🏢 {{ ind }}</span>
            {% endfor %}
          {% endif %}
          {% if item.duration %}
            <span class="badge badge-green">⏱️ {{ item.duration }}</span>
          {% endif %}
        </div>
        <div class="card-body">
          {{ item.content }}
        </div>
        {% if item.link %}
          <div style="margin-top: 1rem;">
            <a href="{{ item.link }}" target="_blank" rel="noopener noreferrer" 
               style="color: var(--accent-primary); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">
              🔗 [Link Text]
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.7;">
                <path d="M10.5 1.5L1.5 10.5M10.5 1.5H3M10.5 1.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        {% endif %}
      </div>
    {% else %}
      <div class="empty-state">
        <p>[Empty message]</p>
      </div>
    {% endfor %}
  </div>
  <div id="[section-id]-pagination" class="pagination"></div>
</div>
```

Replace:
- `[Section Name]` - Human-readable name (e.g., "Use Cases")
- `[section-id]` - Lowercase ID (e.g., "usecases")
- `[icon]` - Emoji icon (e.g., "📋")
- `[Section Title]` - Display title (e.g., "Use Cases")
- `[collection-name]` - Jekyll collection name (e.g., "usecases")
- `[Link Text]` - Link button text (e.g., "View Use Case")
- `[Empty message]` - Message when no items (e.g., "No use cases found.")

## 🎨 Customization Options

### Front Matter Fields

Your markdown files support these front matter fields:

```yaml
---
title: "Item Title"              # Required
industry: ["Tech", "Finance"]    # Optional - shows as blue badges
domain: ["Cloud", "AI"]          # Optional - shows as blue badges
duration: "2 hours"              # Optional - shows as green badge (for labs)
link: "https://example.com"      # Optional - adds "View" link
---
```

### Badge Types

- **Blue badges** (`badge-blue`): Industry, domain, technology
- **Orange badges** (`badge-orange`): Status, priority
- **Green badges** (`badge-green`): Duration, completion time

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

### Change Items Per Page

Edit `assets/js/main.js`:

```javascript
const ITEMS_PER_PAGE = 6;  // Change to 9, 12, etc.
```

## 🎯 Benefits of This Structure

1. **Highly Modular**: Each section is in its own file
2. **Easy to Add Sections**: Just create a new include file
3. **Maintainable**: Changes to one section don't affect others
4. **Reusable**: Copy any section file as a template
5. **Clean**: index.html is only 61 lines!

## 📊 File Size Comparison

**Before Modularization:**
- `index.html`: 926 lines (everything in one file)

**After Modularization:**
- `index.html`: 61 lines (93% reduction!)
- `assets/css/styles.css`: 485 lines
- `assets/js/main.js`: 237 lines
- `_includes/introduction-section.html`: 87 lines
- `_includes/labs-section.html`: 40 lines
- `_includes/modes-section.html`: 38 lines
- `_data/sections.yml`: 37 lines

**Total**: Extremely well organized and easy to maintain!

## 🐛 Troubleshooting

**Section not appearing?**
- Check that the collection is defined in `_config.yml`
- Verify the section is added to `_data/sections.yml`
- Ensure the include file exists in `_includes/`
- Check that the include is added to `index.html`
- Rebuild Jekyll: `bundle exec jekyll serve`

**Search not working?**
- Check that cards have proper `data-*` attributes
- Verify section ID matches in HTML and JavaScript

**Pagination issues?**
- Verify section is added to `currentPage` object in `main.js`
- Check that section is initialized in `DOMContentLoaded` event
- Ensure pagination container ID matches: `{section-id}-pagination`

## 📞 Support

For questions or issues, please refer to the IBM Bob Innovation Hub documentation or contact the development team.

---

**Last Updated**: 2026-05-29
**Version**: 2.0 (Fully Modularized)