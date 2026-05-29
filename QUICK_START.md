# Quick Start Guide: Adding New Sections

## 🎯 5-Step Process to Add a New Section

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
Add your section metadata:
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
    
  - id: usecases     # ← Add this
    title: Use Cases
    icon: 📋
```

#### Step 4: Add Section HTML to `index.html`
Copy an existing section (Labs or Modes) and customize it. Add before the closing `</main>` tag:

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

#### Step 5: Update JavaScript in `assets/js/main.js`

Add your section to the `currentPage` object (around line 82):
```javascript
let currentPage = {
  labs: 1,
  modes: 1,
  usecases: 1  // ← Add this
};
```

Add initialization in the `DOMContentLoaded` event (around line 221):
```javascript
document.addEventListener('DOMContentLoaded', () => {
  filterAndPaginate('introduction');
  filterAndPaginate('labs');
  filterAndPaginate('modes');
  filterAndPaginate('usecases');  // ← Add this
});
```

#### Step 6: Rebuild Jekyll
```bash
bundle exec jekyll serve
```

**That's it!** Your new section will automatically have:
- ✅ Navigation button in sidebar (from sections.yml)
- ✅ Search functionality
- ✅ Pagination
- ✅ Responsive cards
- ✅ Theme support

## 📋 Section HTML Template

Use this template when adding a new section to `index.html`:

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
Reorder sections in `_data/sections.yml` - they appear in the sidebar in the order listed.

### Add Custom Badges
In your section HTML, add custom badge types:
```html
{% if item.status %}
  <span class="badge badge-orange">⚡ {{ item.status }}</span>
{% endif %}
```

### Hide Search for Introduction
The search bar is automatically hidden for the introduction section via JavaScript.

## 📊 File Size Comparison

**Before Modularization:**
- `index.html`: 926 lines (everything in one file)

**After Modularization:**
- `index.html`: 141 lines (85% reduction!)
- `assets/css/styles.css`: 485 lines
- `assets/js/main.js`: 237 lines
- `_includes/introduction-section.html`: 87 lines
- `_data/sections.yml`: 37 lines

**Total**: Much better organized and easier to maintain!

## 💡 Pro Tips

- Keep section IDs lowercase and hyphenated
- Use descriptive icons that match your content
- Test search functionality with various terms
- Ensure all markdown files have proper front matter
- Use consistent badge types across similar content
- Always rebuild Jekyll after making changes

## 🚀 Testing Your Changes

1. Start Jekyll locally: `bundle exec jekyll serve`
2. View at: `http://localhost:4000`
3. Test navigation between sections
4. Test search functionality
5. Test pagination
6. Test theme toggle
7. Test responsive design (resize browser)

---

Need help? Check the full [README.md](README.md) for detailed documentation.