// Bob Innovation Hub - Main JavaScript

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeButton(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
  if (theme === 'dark') {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light';
  } else {
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark';
  }
}

// Sections that show the search bar
const SEARCH_SECTIONS = ['use-cases', 'demos', 'labs', 'modes', 'skills', 'bob101', 'learning-resources'];

// Sections with sub-tabs
const SUB_TAB_SECTIONS = ['use-cases', 'modes'];

// Hash route map: fragment (without leading #) → { section, subSection? }
const ROUTE_MAP = {
  '':                         { section: 'introduction' },
  '/':                        { section: 'introduction' },
  '/bob101':                  { section: 'bob101' },
  '/learning-resources':      { section: 'learning-resources' },
  '/use-cases':               { section: 'use-cases', subSection: 'technical-use-cases' },
  '/use-cases/technical':     { section: 'use-cases', subSection: 'technical-use-cases' },
  '/use-cases/business':      { section: 'use-cases', subSection: 'business-use-cases' },
  '/demos':                   { section: 'demos' },
  '/labs':                    { section: 'labs' },
  '/modes':                   { section: 'modes', subSection: 'premium-modes' },
  '/modes/premium':           { section: 'modes', subSection: 'premium-modes' },
  '/modes/custom':            { section: 'modes', subSection: 'custom-modes' },
  '/skills':                  { section: 'skills' },
};

// Reverse map: section (+ optional subSection) → canonical hash fragment
const SECTION_TO_ROUTE = {
  'introduction':         '#/',
  'bob101':               '#/bob101',
  'learning-resources':   '#/learning-resources',
  'use-cases':            '#/use-cases',
  'technical-use-cases':  '#/use-cases/technical',
  'business-use-cases':   '#/use-cases/business',
  'demos':                '#/demos',
  'labs':                 '#/labs',
  'modes':                '#/modes',
  'premium-modes':        '#/modes/premium',
  'custom-modes':         '#/modes/custom',
  'skills':               '#/skills',
};

// Sidebar Navigation
const sidebarButtons = document.querySelectorAll('.sidebar-button');
const contentSections = document.querySelectorAll('.content-section');
const searchBar = document.getElementById('searchBar');
const searchContainer = document.querySelector('.search-container');

function activateSection(sectionId, subSectionId, pushRoute) {
  const sectionEl = document.getElementById(`${sectionId}-section`);
  if (!sectionEl) return;

  // Update sidebar buttons
  sidebarButtons.forEach(btn => btn.classList.remove('active'));
  const matchingBtn = document.querySelector(`.sidebar-button[data-section="${sectionId}"]`);
  if (matchingBtn) matchingBtn.classList.add('active');

  // Update content sections
  contentSections.forEach(s => s.classList.remove('active'));
  sectionEl.classList.add('active');

  // Show/hide search bar
  if (SEARCH_SECTIONS.includes(sectionId)) {
    searchContainer.style.display = 'block';
    searchBar.value = '';
  } else {
    searchContainer.style.display = 'none';
  }

  // Handle sub-tabs
  if (subSectionId && SUB_TAB_SECTIONS.includes(sectionId)) {
    sectionEl.querySelectorAll('.sub-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    const targetTab = sectionEl.querySelector(`.sub-tab[data-sub-section="${subSectionId}"]`);
    if (targetTab) {
      targetTab.classList.add('active');
      targetTab.setAttribute('aria-selected', 'true');
    }

    sectionEl.querySelectorAll('.sub-section').forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById(`${subSectionId}-sub`);
    if (targetPanel) targetPanel.classList.add('active');

    filterAndPaginate(subSectionId);
  } else if (SUB_TAB_SECTIONS.includes(sectionId)) {
    // No sub-section specified — activate the first sub-tab
    const firstTab = sectionEl.querySelector('.sub-tab');
    if (firstTab) {
      const firstSubSection = firstTab.dataset.subSection;
      sectionEl.querySelectorAll('.sub-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      firstTab.classList.add('active');
      firstTab.setAttribute('aria-selected', 'true');
      sectionEl.querySelectorAll('.sub-section').forEach(p => p.classList.remove('active'));
      const firstPanel = document.getElementById(`${firstSubSection}-sub`);
      if (firstPanel) firstPanel.classList.add('active');
      filterAndPaginate(firstSubSection);
    }
  } else if (SEARCH_SECTIONS.includes(sectionId)) {
    // Reset domain filter for flat sections (demos, labs)
    activeDomainFilter[sectionId] = '';
    resetDomainPills(sectionEl);
    filterAndPaginate(sectionId);
  }

  // Update hash
  if (pushRoute) {
    const hash = subSectionId
      ? (SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/')
      : (SECTION_TO_ROUTE[sectionId] || '#/');
    if (window.location.hash !== hash) {
      // Replace so the home→section→back button goes to home, not loops
      history.pushState(null, '', hash);
    }
  }
}

sidebarButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;
    if (!document.getElementById(`${targetSection}-section`)) return;
    activateSection(targetSection, null, true);
  });
});

// Hide search bar on initial load when landing page is active
if (document.querySelector('.sidebar-button.active') &&
    !SEARCH_SECTIONS.includes(document.querySelector('.sidebar-button.active').dataset.section)) {
  searchContainer.style.display = 'none';
}

// Active domain filter per sub-section: '' means "All"
const activeDomainFilter = {};

// Sub-tab Navigation
document.querySelectorAll('.sub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const subSection = tab.dataset.subSection;
    const parentSection = tab.closest('.content-section');
    const sectionId = parentSection.id.replace('-section', '');

    // Update tab active state
    parentSection.querySelectorAll('.sub-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Show the correct sub-section panel
    parentSection.querySelectorAll('.sub-section').forEach(panel => panel.classList.remove('active'));
    const targetPanel = document.getElementById(`${subSection}-sub`);
    if (targetPanel) targetPanel.classList.add('active');

    // Reset search, domain filter, and paginate the new sub-section
    searchBar.value = '';
    activeDomainFilter[subSection] = '';
    resetDomainPills(document.getElementById(`${subSection}-sub`));
    filterAndPaginate(subSection);

    // Update hash for the sub-tab
    const hash = SECTION_TO_ROUTE[subSection] || SECTION_TO_ROUTE[sectionId] || '#/';
    if (window.location.hash !== hash) {
      history.pushState(null, '', hash);
    }
  });
});


function resetDomainPills(subPanel) {
  if (!subPanel) return;
  const bar = subPanel.querySelector('.domain-filter');
  if (!bar) return;
  bar.querySelectorAll('.domain-pill').forEach(p => p.classList.remove('active'));
  const allPill = bar.querySelector('.domain-pill[data-domain=""]');
  if (allPill) allPill.classList.add('active');
}

// Search Functionality
let searchTimeout;

searchBar.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const activeButton = document.querySelector('.sidebar-button.active');
    if (!activeButton) return;
    const activeSection = activeButton.dataset.section;

    if (SUB_TAB_SECTIONS.includes(activeSection)) {
      const activeSubTab = document.querySelector(`#${activeSection}-section .sub-tab.active`);
      if (activeSubTab) {
        filterAndPaginate(activeSubTab.dataset.subSection);
      }
    } else {
      filterAndPaginate(activeSection);
    }

    // Write search term into the hash as ?q= (replaceState — no extra history entries)
    const q = searchBar.value.trim();
    const routeKey = currentRouteKey();
    const newHash = buildHash(routeKey, q);
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  }, 300);
});

// Pagination Configuration — 8 cards on wide screens, 6 on narrow
function getItemsPerPage() {
  return window.innerWidth < 1600 ? 6 : 8;
}
let currentPage = {
  labs: 1,
  'custom-modes': 1,
  'premium-modes': 1,
  demos: 1,
  'technical-use-cases': 1,
  'business-use-cases': 1,
  modes: 1,
  skills: 1
};

function filterAndPaginate(section) {
  const container = document.getElementById(`${section}-container`);
  if (!container) return;

  const searchTerm = searchBar.value.toLowerCase().trim();
  const domainFilter = (activeDomainFilter[section] || '').toLowerCase();
  const cards = Array.from(container.querySelectorAll('.asset-card'));
  const emptyState = container.querySelector('.empty-state');

  // Filter cards by search term AND active domain
  let visibleCards = cards.filter(card => {
    if (emptyState && card === emptyState) return false;
    const title = card.dataset.title || '';
    const content = card.dataset.content || '';
    const industry = card.dataset.industry || '';
    const language = card.dataset.language || '';
    const domain = card.dataset.domain || '';
    const matchesSearch = `${title} ${content} ${industry} ${language} ${domain}`.includes(searchTerm);
    const matchesDomain = !domainFilter || domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  // Sort: Service Engineering assets appear first
  visibleCards.sort((a, b) => {
    const aIsServiceEng = (a.dataset.team || '') === 'service engineering' ? 0 : 1;
    const bIsServiceEng = (b.dataset.team || '') === 'service engineering' ? 0 : 1;
    return aIsServiceEng - bIsServiceEng;
  });
  // Re-insert all asset cards in sorted order so the CSS grid renders them correctly.
  // Non-visible cards are appended after visible ones, keeping the full stable order.
  const hiddenCards = cards.filter(c => !(emptyState && c === emptyState) && !visibleCards.includes(c));
  [...visibleCards, ...hiddenCards].forEach(card => container.appendChild(card));

  // Reset to page 1 when searching
  if (searchTerm) currentPage[section] = 1;

  // Hide all cards first
  cards.forEach(card => {
    if (emptyState && card === emptyState) return;
    card.classList.add('hidden');
  });

  // No-results message
  let noResultsDiv = container.querySelector('.no-results');
  if (visibleCards.length === 0 && (searchTerm || domainFilter)) {
    if (!noResultsDiv) {
      noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'no-results';
      container.appendChild(noResultsDiv);
    }
    noResultsDiv.textContent = searchTerm
      ? `No results found for "${searchBar.value}"${domainFilter ? ` in domain "${domainFilter}"` : ''}`
      : `No use cases found for domain "${domainFilter}"`;
    noResultsDiv.classList.remove('hidden');
  } else if (noResultsDiv) {
    noResultsDiv.classList.add('hidden');
  }

  // Pagination
  if (!(section in currentPage)) currentPage[section] = 1;
  const ITEMS_PER_PAGE = getItemsPerPage();
  const totalPages = Math.ceil(visibleCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage[section] - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  visibleCards.slice(startIndex, endIndex).forEach(card => card.classList.remove('hidden'));

  updatePagination(section, currentPage[section], totalPages, visibleCards.length);
}

function updatePagination(section, page, totalPages, totalItems) {
  const paginationContainer = document.getElementById(`${section}-pagination`);
  if (!paginationContainer) return;

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let paginationHTML = '';

  // Previous button
  paginationHTML += `
    <button class="pagination-button" onclick="changePage('${section}', ${page - 1})" ${page === 1 ? 'disabled' : ''}>
      ← Previous
    </button>
  `;

  // Page numbers
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    paginationHTML += `<button class="pagination-button" onclick="changePage('${section}', 1)">1</button>`;
    if (startPage > 2) paginationHTML += `<span class="pagination-info">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-button ${i === page ? 'active' : ''}" onclick="changePage('${section}', ${i})">
        ${i}
      </button>
    `;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) paginationHTML += `<span class="pagination-info">...</span>`;
    paginationHTML += `<button class="pagination-button" onclick="changePage('${section}', ${totalPages})">${totalPages}</button>`;
  }

  // Next button
  paginationHTML += `
    <button class="pagination-button" onclick="changePage('${section}', ${page + 1})" ${page === totalPages ? 'disabled' : ''}>
      Next →
    </button>
  `;

  // Info
  const ITEMS_PER_PAGE = getItemsPerPage();
  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, totalItems);
  paginationHTML += `<span class="pagination-info">${startItem}–${endItem} of ${totalItems}</span>`;

  paginationContainer.innerHTML = paginationHTML;
}

function changePage(section, newPage) {
  currentPage[section] = newPage;
  filterAndPaginate(section);

  // Scroll to top of relevant section/sub-section
  const subPanel = document.getElementById(`${section}-sub`);
  const mainSection = document.getElementById(`${section}-section`);
  const target = subPanel || mainSection;
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const ALL_PAGINATED_SECTIONS = ['labs', 'custom-modes', 'premium-modes', 'demos', 'technical-use-cases', 'business-use-cases', 'modes', 'bob101', 'skills', 'learning-resources'];

function repaginateAll() {
  ALL_PAGINATED_SECTIONS.forEach(s => filterAndPaginate(s));
}

// Parse the hash fragment into { path, query }
// e.g. "#/demos?q=retail" → { path: "/demos", query: "retail" }
function parseHash(hash) {
  const raw = hash.replace(/^#/, '') || '/';
  const qIdx = raw.indexOf('?');
  if (qIdx === -1) {
    let path = raw;
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    return { path, query: '' };
  }
  let path = raw.slice(0, qIdx);
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
  const params = new URLSearchParams(raw.slice(qIdx + 1));
  return { path, query: params.get('q') || '' };
}

// Build a hash string from a route key and optional query
function buildHash(routeKey, query) {
  if (query) return routeKey + '?q=' + encodeURIComponent(query);
  return routeKey;
}

// Get the current section's canonical hash key (without query)
function currentRouteKey() {
  const activeBtn = document.querySelector('.sidebar-button.active');
  if (!activeBtn) return '#/';
  const sectionId = activeBtn.dataset.section;
  const activeSubTab = document.querySelector(`#${sectionId}-section .sub-tab.active`);
  const subSectionId = activeSubTab ? activeSubTab.dataset.subSection : null;
  return subSectionId
    ? (SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/')
    : (SECTION_TO_ROUTE[sectionId] || '#/');
}

// Highlight a specific card by slug — scroll into view and briefly pulse it
function highlightCard(slug) {
  if (!slug) return;
  const card = document.querySelector(`.asset-card[data-slug="${slug}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('card-highlight');
  setTimeout(() => card.classList.remove('card-highlight'), 2000);
}

// Resolve a parsed path to { section, subSection }
function resolveHash(hash) {
  const { path, query } = parseHash(hash);
  return { ...(ROUTE_MAP[path] || ROUTE_MAP['/']), query };
}

// ─── Share buttons ────────────────────────────────────────────────────────────

const SHARE_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;

// Build the shareable URL for a given card element
function buildShareUrl(card) {
  const sectionEl = card.closest('.content-section');
  const subPanel  = card.closest('.sub-section');
  const sectionId    = sectionEl ? sectionEl.id.replace('-section', '') : null;
  const subSectionId = subPanel  ? subPanel.id.replace('-sub', '')      : null;

  const routeKey = subSectionId
    ? (SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/')
    : (SECTION_TO_ROUTE[sectionId] || '#/');

  // Use data-title (already lowercased) as the search query so the URL
  // pre-fills the search box and surfaces exactly this asset.
  const q = card.dataset.title || '';
  const hash = buildHash(routeKey, q);
  return window.location.origin + window.location.pathname + hash;
}

// Inject a share button into every card inside a search-enabled section
function injectShareButtons() {
  // Collect the containers that hold cards — for tabbed sections use each
  // sub-section panel; for plain sections use the section element itself.
  const containers = [];
  SEARCH_SECTIONS.forEach(s => {
    const sectionEl = document.getElementById(`${s}-section`);
    if (!sectionEl) return;
    const panels = sectionEl.querySelectorAll('.sub-section');
    if (panels.length) {
      panels.forEach(p => containers.push(p));
    } else {
      containers.push(sectionEl);
    }
  });

  containers.forEach(container => {
    container.querySelectorAll('.asset-card').forEach(card => {
      if (!card.dataset.title) return;          // skip empty-state cards
      if (card.querySelector('.card-share-btn')) return;  // already injected

      const h3 = card.querySelector('h3');
      if (!h3) return;

      // Wrap the h3 in a flex row together with the share button
      const header = document.createElement('div');
      header.className = 'card-header';
      h3.parentNode.insertBefore(header, h3);
      header.appendChild(h3);

      const btn = document.createElement('button');
      btn.className = 'card-share-btn';
      btn.setAttribute('aria-label', 'Copy link to this asset');
      btn.innerHTML = SHARE_SVG + '<span class="card-share-tooltip">Copied to clipboard</span>';
      header.appendChild(btn);

      btn.addEventListener('click', e => {
        e.stopPropagation();
        const url = buildShareUrl(card);

        const confirm = () => {
          btn.classList.add('copied');
          setTimeout(() => {
            btn.classList.remove('copied');
          }, 2000);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(confirm).catch(() => fallbackCopy(url, confirm));
        } else {
          fallbackCopy(url, confirm);
        }
      });
    });
  });
}

function fallbackCopy(text, callback) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (_) {}
  document.body.removeChild(ta);
  callback();
}

// ─────────────────────────────────────────────────────────────────────────────

// Initialize: activate correct section from hash, pre-fill search, then paginate
document.addEventListener('DOMContentLoaded', () => {
  // Wire up domain filter pills
  document.querySelectorAll('.domain-filter').forEach(bar => {
    bar.addEventListener('click', e => {
      const pill = e.target.closest('.domain-pill');
      if (!pill) return;

      const subSection = bar.dataset.subSection;
      const domain = pill.dataset.domain;

      bar.querySelectorAll('.domain-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeDomainFilter[subSection] = domain;
      currentPage[subSection] = 1;
      filterAndPaginate(subSection);
    });
  });

  injectShareButtons();
  const { section, subSection, query } = resolveHash(window.location.hash);
  activateSection(section, subSection || null, false);
  if (query) {
    searchBar.value = query;
  }
  repaginateAll();
  // After pagination, highlight the card if the query exactly matches a slug
  if (query) {
    setTimeout(() => highlightCard(query), 50);
  }
});

// Handle browser back/forward and direct hash changes
window.addEventListener('hashchange', () => {
  const { section, subSection, query } = resolveHash(window.location.hash);
  activateSection(section, subSection || null, false);
  searchBar.value = query || '';
  repaginateAll();
  if (query) {
    setTimeout(() => highlightCard(query), 50);
  }
});

// Re-paginate when window is resized (switches between 6 and 8 per page)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(repaginateAll, 200);
});

// Made with Bob
