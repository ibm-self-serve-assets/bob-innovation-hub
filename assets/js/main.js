// Bob Innovation Hub - Main JavaScript

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themeText   = document.getElementById('themeText');
const html        = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeButton(currentTheme);

// Also apply Carbon dark theme class so cds-* components pick up g100 tokens
function applyCarbonTheme(theme) {
  if (theme === 'dark') {
    document.body.setAttribute('data-carbon-theme', 'g100');
    document.body.classList.add('cds-theme-zone-g100');
    document.body.classList.remove('cds-theme-zone-white');
  } else {
    document.body.setAttribute('data-carbon-theme', 'white');
    document.body.classList.add('cds-theme-zone-white');
    document.body.classList.remove('cds-theme-zone-g100');
  }
}
applyCarbonTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  const cur = html.getAttribute('data-theme');
  const next = cur === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeButton(next);
  applyCarbonTheme(next);
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

// ─── Section / routing config ─────────────────────────────────────────────────
const SEARCH_SECTIONS  = ['use-cases', 'demos', 'labs', 'modes', 'skills', 'bob101', 'learning-resources'];
const SUB_TAB_SECTIONS = ['use-cases', 'modes'];

const ROUTE_MAP = {
  '':                         { section: 'introduction' },
  '/':                        { section: 'introduction' },
  '/bob101':                  { section: 'bob101' },
  '/learning-resources':      { section: 'learning-resources' },
  '/use-cases':               { section: 'use-cases', subSection: 'business-use-cases' },
  '/use-cases/technical':     { section: 'use-cases', subSection: 'technical-use-cases' },
  '/use-cases/business':      { section: 'use-cases', subSection: 'business-use-cases' },
  '/demos':                   { section: 'demos' },
  '/labs':                    { section: 'labs' },
  '/modes':                   { section: 'modes', subSection: 'custom-modes' },
  '/modes/premium':           { section: 'modes', subSection: 'premium-modes' },
  '/modes/custom':            { section: 'modes', subSection: 'custom-modes' },
  '/skills':                  { section: 'skills' },
};

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

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const sidebarButtons   = document.querySelectorAll('.sidebar-button');
const contentSections  = document.querySelectorAll('.content-section');
const searchContainer  = document.getElementById('searchContainer') || document.querySelector('.search-container');

// cds-search exposes a `.value` property; fallback to native input
const cdsSearch = document.getElementById('searchBar');

function getSearchValue() {
  if (!cdsSearch) return '';
  // cds-search WC exposes .value directly after hydration
  if (typeof cdsSearch.value === 'string') return cdsSearch.value;
  // fallback: look inside shadow root
  const inner = cdsSearch.shadowRoot && cdsSearch.shadowRoot.querySelector('input');
  return inner ? inner.value : '';
}

function setSearchValue(val) {
  if (!cdsSearch) return;
  if (typeof cdsSearch.value === 'string') {
    cdsSearch.value = val;
  } else {
    const inner = cdsSearch.shadowRoot && cdsSearch.shadowRoot.querySelector('input');
    if (inner) inner.value = val;
  }
}

function clearSearch() { setSearchValue(''); }

// ─── activateSection ──────────────────────────────────────────────────────────
function activateSection(sectionId, subSectionId, pushRoute) {
  const sectionEl = document.getElementById(`${sectionId}-section`);
  if (!sectionEl) return;

  // Update sidebar button active state
  sidebarButtons.forEach(btn => btn.classList.remove('active'));
  const matchingBtn = document.querySelector(`.sidebar-button[data-section="${sectionId}"]`);
  if (matchingBtn) matchingBtn.classList.add('active');

  // Show correct content section
  contentSections.forEach(s => s.classList.remove('active'));
  sectionEl.classList.add('active');

  // Show/hide search
  if (SEARCH_SECTIONS.includes(sectionId)) {
    searchContainer.style.display = 'block';
    clearSearch();
  } else {
    searchContainer.style.display = 'none';
  }

  // Handle sub-sections
  if (subSectionId && SUB_TAB_SECTIONS.includes(sectionId)) {
    activateSubSection(sectionEl, sectionId, subSectionId);
  } else if (SUB_TAB_SECTIONS.includes(sectionId)) {
    // Activate first sub-tab (which is whichever .sub-tab has .active class)
    const firstActiveTab = sectionEl.querySelector('.sub-tab.active') || sectionEl.querySelector('.sub-tab');
    if (firstActiveTab) {
      activateSubSection(sectionEl, sectionId, firstActiveTab.dataset.subSection);
    }
  } else if (SEARCH_SECTIONS.includes(sectionId)) {
    activeDomainFilter[sectionId] = '';
    resetDomainPills(sectionEl);
    filterAndPaginate(sectionId);
  }

  if (pushRoute) {
    const hash = subSectionId
      ? (SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/')
      : (SECTION_TO_ROUTE[sectionId] || '#/');
    if (window.location.hash !== hash) history.pushState(null, '', hash);
  }
}

function activateSubSection(sectionEl, sectionId, subSectionId) {
  // Sync hidden .sub-tab buttons (preserve JS state)
  sectionEl.querySelectorAll('.sub-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const targetHiddenTab = sectionEl.querySelector(`.sub-tab[data-sub-section="${subSectionId}"]`);
  if (targetHiddenTab) {
    targetHiddenTab.classList.add('active');
    targetHiddenTab.setAttribute('aria-selected', 'true');
  }

  // Also sync cds-tabs selected value
  const cdsTabsEl = sectionEl.querySelector('cds-tabs');
  if (cdsTabsEl && cdsTabsEl.value !== subSectionId) {
    cdsTabsEl.value = subSectionId;
  }

  sectionEl.querySelectorAll('.sub-section').forEach(p => p.classList.remove('active'));
  const targetPanel = document.getElementById(`${subSectionId}-sub`);
  if (targetPanel) targetPanel.classList.add('active');

  filterAndPaginate(subSectionId);
}

// ─── Side nav clicks ──────────────────────────────────────────────────────────
sidebarButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;
    if (!document.getElementById(`${targetSection}-section`)) return;
    activateSection(targetSection, null, true);
  });
});

// ─── cds-tabs → sub-section bridge ───────────────────────────────────────────
// cds-tabs v2 emits 'cds-tabs-selected' with detail.item = the selected cds-tab element
document.addEventListener('cds-tabs-selected', e => {
  const tabsEl = e.target;
  if (!tabsEl || tabsEl.tagName.toLowerCase() !== 'cds-tabs') return;

  // Carbon v2 detail: { item: cds-tab element }
  // The cds-tab value attribute == sub-section id (we set it that way)
  const selectedTab = e.detail && e.detail.item;
  if (!selectedTab) return;
  const subSectionId = selectedTab.getAttribute('data-sub-section')
    || selectedTab.getAttribute('value')
    || (selectedTab.dataset && selectedTab.dataset.subSection);
  if (!subSectionId) return;

  const sectionEl = tabsEl.closest('.content-section');
  if (!sectionEl) return;
  const sectionId = sectionEl.id.replace('-section', '');

  clearSearch();
  activeDomainFilter[subSectionId] = '';
  resetDomainPills(document.getElementById(`${subSectionId}-sub`));
  activateSubSection(sectionEl, sectionId, subSectionId);

  const hash = SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/';
  if (window.location.hash !== hash) history.pushState(null, '', hash);
});

// ─── Hidden .sub-tabs fallback (unchanged logic) ─────────────────────────────
document.querySelectorAll('.sub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const subSection = tab.dataset.subSection;
    const parentSection = tab.closest('.content-section');
    const sectionId = parentSection.id.replace('-section', '');

    parentSection.querySelectorAll('.sub-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    parentSection.querySelectorAll('.sub-section').forEach(panel => panel.classList.remove('active'));
    const targetPanel = document.getElementById(`${subSection}-sub`);
    if (targetPanel) targetPanel.classList.add('active');

    clearSearch();
    activeDomainFilter[subSection] = '';
    resetDomainPills(document.getElementById(`${subSection}-sub`));
    filterAndPaginate(subSection);

    const hash = SECTION_TO_ROUTE[subSection] || SECTION_TO_ROUTE[sectionId] || '#/';
    if (window.location.hash !== hash) history.pushState(null, '', hash);
  });
});

// ─── Domain filter ─────────────────────────────────────────────────────────────
const activeDomainFilter = {};

function resetDomainPills(subPanel) {
  if (!subPanel) return;
  const bar = subPanel.querySelector('.domain-filter');
  if (!bar) return;
  bar.querySelectorAll('.domain-pill').forEach(p => p.classList.remove('active'));
  const allPill = bar.querySelector('.domain-pill[data-domain=""]');
  if (allPill) allPill.classList.add('active');
}

// ─── Search ───────────────────────────────────────────────────────────────────
let searchTimeout;

function onSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const activeBtn = document.querySelector('.sidebar-button.active');
    if (!activeBtn) return;
    const activeSection = activeBtn.dataset.section;

    if (SUB_TAB_SECTIONS.includes(activeSection)) {
      const activeSubTab = document.querySelector(`#${activeSection}-section .sub-tab.active`);
      if (activeSubTab) filterAndPaginate(activeSubTab.dataset.subSection);
    } else {
      filterAndPaginate(activeSection);
    }

    const q = getSearchValue().trim();
    const routeKey = currentRouteKey();
    const newHash = buildHash(routeKey, q);
    if (window.location.hash !== newHash) history.replaceState(null, '', newHash);
  }, 300);
}

// cds-search fires 'cds-search-input' on every keystroke
if (cdsSearch) {
  cdsSearch.addEventListener('cds-search-input', onSearchInput);
  // Also wire native 'input' as fallback (fires from shadow-root input in some browsers)
  cdsSearch.addEventListener('input', onSearchInput);
}

// ─── Pagination ───────────────────────────────────────────────────────────────
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
  skills: 1,
  bob101: 1,
  'learning-resources': 1,
};

function filterAndPaginate(section) {
  const container = document.getElementById(`${section}-container`);
  if (!container) return;

  const searchTerm = getSearchValue().toLowerCase().trim();
  const domainFilter = (activeDomainFilter[section] || '').toLowerCase();
  const cards = Array.from(container.querySelectorAll('.asset-card'));
  const emptyState = container.querySelector('.empty-state');

  let visibleCards = cards.filter(card => {
    if (emptyState && card === emptyState) return false;
    const title    = card.dataset.title    || '';
    const content  = card.dataset.content  || '';
    const industry = card.dataset.industry || '';
    const language = card.dataset.language || '';
    const domain   = card.dataset.domain   || '';
    const matchesSearch = `${title} ${content} ${industry} ${language} ${domain}`.includes(searchTerm);
    const matchesDomain = !domainFilter || domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  visibleCards.sort((a, b) => {
    const aIsServiceEng = (a.dataset.team || '') === 'service engineering' ? 0 : 1;
    const bIsServiceEng = (b.dataset.team || '') === 'service engineering' ? 0 : 1;
    return aIsServiceEng - bIsServiceEng;
  });

  const hiddenCards = cards.filter(c => !(emptyState && c === emptyState) && !visibleCards.includes(c));
  [...visibleCards, ...hiddenCards].forEach(card => container.appendChild(card));

  if (searchTerm) currentPage[section] = 1;

  cards.forEach(card => {
    if (emptyState && card === emptyState) return;
    card.classList.add('hidden');
  });

  let noResultsDiv = container.querySelector('.no-results');
  if (visibleCards.length === 0 && (searchTerm || domainFilter)) {
    if (!noResultsDiv) {
      noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'no-results';
      container.appendChild(noResultsDiv);
    }
    noResultsDiv.textContent = searchTerm
      ? `No results found for "${getSearchValue()}"${domainFilter ? ` in domain "${domainFilter}"` : ''}`
      : `No use cases found for domain "${domainFilter}"`;
    noResultsDiv.classList.remove('hidden');
  } else if (noResultsDiv) {
    noResultsDiv.classList.add('hidden');
  }

  if (!(section in currentPage)) currentPage[section] = 1;
  const ITEMS_PER_PAGE = getItemsPerPage();
  const totalPages  = Math.ceil(visibleCards.length / ITEMS_PER_PAGE);
  const startIndex  = (currentPage[section] - 1) * ITEMS_PER_PAGE;
  const endIndex    = startIndex + ITEMS_PER_PAGE;

  visibleCards.slice(startIndex, endIndex).forEach(card => card.classList.remove('hidden'));
  updatePagination(section, currentPage[section], totalPages, visibleCards.length);
}

function updatePagination(section, page, totalPages, totalItems) {
  const paginationContainer = document.getElementById(`${section}-pagination`);
  if (!paginationContainer) return;

  if (totalPages <= 1) { paginationContainer.innerHTML = ''; return; }

  const ITEMS_PER_PAGE = getItemsPerPage();
  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem   = Math.min(page * ITEMS_PER_PAGE, totalItems);

  let html = '';
  html += `<button class="pagination-button" onclick="changePage('${section}',${page-1})" ${page===1?'disabled':''}>← Prev</button>`;

  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage   = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

  if (startPage > 1) {
    html += `<button class="pagination-button" onclick="changePage('${section}',1)">1</button>`;
    if (startPage > 2) html += `<span class="pagination-info">…</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="pagination-button ${i===page?'active':''}" onclick="changePage('${section}',${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span class="pagination-info">…</span>`;
    html += `<button class="pagination-button" onclick="changePage('${section}',${totalPages})">${totalPages}</button>`;
  }

  html += `<button class="pagination-button" onclick="changePage('${section}',${page+1})" ${page===totalPages?'disabled':''}>Next →</button>`;
  html += `<span class="pagination-info">${startItem}–${endItem} of ${totalItems}</span>`;

  paginationContainer.innerHTML = html;
}

function changePage(section, newPage) {
  currentPage[section] = newPage;
  filterAndPaginate(section);
  const subPanel    = document.getElementById(`${section}-sub`);
  const mainSection = document.getElementById(`${section}-section`);
  const target = subPanel || mainSection;
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const ALL_PAGINATED_SECTIONS = ['labs','custom-modes','premium-modes','demos','technical-use-cases','business-use-cases','modes','bob101','skills','learning-resources'];

function repaginateAll() {
  ALL_PAGINATED_SECTIONS.forEach(s => filterAndPaginate(s));
}

// ─── Hash helpers ─────────────────────────────────────────────────────────────
function parseHash(hash) {
  const raw  = hash.replace(/^#/, '') || '/';
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

function buildHash(routeKey, query) {
  return query ? routeKey + '?q=' + encodeURIComponent(query) : routeKey;
}

function currentRouteKey() {
  const activeBtn = document.querySelector('.sidebar-button.active');
  if (!activeBtn) return '#/';
  const sectionId  = activeBtn.dataset.section;
  const activeSubTab = document.querySelector(`#${sectionId}-section .sub-tab.active`);
  const subSectionId = activeSubTab ? activeSubTab.dataset.subSection : null;
  return subSectionId
    ? (SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/')
    : (SECTION_TO_ROUTE[sectionId] || '#/');
}

function highlightCard(slug) {
  if (!slug) return;
  const card = document.querySelector(`.asset-card[data-slug="${slug}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('card-highlight');
  setTimeout(() => card.classList.remove('card-highlight'), 2000);
}

function resolveHash(hash) {
  const { path, query } = parseHash(hash);
  return { ...(ROUTE_MAP[path] || ROUTE_MAP['/']), query };
}

// ─── Share buttons ────────────────────────────────────────────────────────────
const SHARE_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;

function buildShareUrl(card) {
  const sectionEl   = card.closest('.content-section');
  const subPanel    = card.closest('.sub-section');
  const sectionId   = sectionEl ? sectionEl.id.replace('-section', '') : null;
  const subSectionId= subPanel  ? subPanel.id.replace('-sub', '')      : null;
  const routeKey = subSectionId
    ? (SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/')
    : (SECTION_TO_ROUTE[sectionId] || '#/');
  const q = card.dataset.title || '';
  return window.location.origin + window.location.pathname + buildHash(routeKey, q);
}

function injectShareButtons() {
  const containers = [];
  SEARCH_SECTIONS.forEach(s => {
    const sectionEl = document.getElementById(`${s}-section`);
    if (!sectionEl) return;
    const panels = sectionEl.querySelectorAll('.sub-section');
    if (panels.length) panels.forEach(p => containers.push(p));
    else containers.push(sectionEl);
  });

  containers.forEach(container => {
    container.querySelectorAll('.asset-card').forEach(card => {
      if (!card.dataset.title) return;
      if (card.querySelector('.card-share-btn')) return;
      const h3 = card.querySelector('h3');
      if (!h3) return;

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
          setTimeout(() => btn.classList.remove('copied'), 2000);
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
  ta.focus(); ta.select();
  try { document.execCommand('copy'); } catch (_) {}
  document.body.removeChild(ta);
  callback();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Domain filter pills
  document.querySelectorAll('.domain-filter').forEach(bar => {
    bar.addEventListener('click', e => {
      const pill = e.target.closest('.domain-pill');
      if (!pill) return;
      const subSection = bar.dataset.subSection;
      const domain     = pill.dataset.domain;
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
  if (query) setSearchValue(query);

  repaginateAll();

  if (query) setTimeout(() => highlightCard(query), 50);
});

// Browser back/forward
window.addEventListener('hashchange', () => {
  const { section, subSection, query } = resolveHash(window.location.hash);
  activateSection(section, subSection || null, false);
  setSearchValue(query || '');
  repaginateAll();
  if (query) setTimeout(() => highlightCard(query), 50);
});

// Re-paginate on resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(repaginateAll, 200);
});

// Made with Bob
