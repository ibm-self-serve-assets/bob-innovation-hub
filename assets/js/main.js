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
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark';
  } else {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light';
  }
}

// ─── Section / routing config ─────────────────────────────────────────────────
const SEARCH_SECTIONS  = ['use-cases', 'demos', 'labs', 'modes', 'skills', 'learning-resources', 'documentation', 'mcp', 'subagents', 'case-studies', 'bob-community'];
const SUB_TAB_SECTIONS = ['use-cases', 'modes', 'documentation', 'learning-resources'];

const ROUTE_MAP = {
  '':                         { section: 'introduction' },
  '/':                        { section: 'introduction' },
  '/learning-resources':                { section: 'learning-resources', subSection: 'learning-path' },
  '/learning-resources/learning-path':  { section: 'learning-resources', subSection: 'learning-path' },
  '/learning-resources/explore-bob':    { section: 'learning-resources', subSection: 'explore-bob' },
  '/use-cases':               { section: 'use-cases', subSection: 'business-use-cases' },
  '/use-cases/technical':     { section: 'use-cases', subSection: 'technical-use-cases' },
  '/use-cases/business':      { section: 'use-cases', subSection: 'business-use-cases' },
  '/demos':                   { section: 'demos' },
  '/labs':                    { section: 'labs' },
  '/modes':                   { section: 'modes', subSection: 'custom-modes' },
  '/modes/premium':           { section: 'modes', subSection: 'premium-modes' },
  '/modes/custom':            { section: 'modes', subSection: 'custom-modes' },
  '/skills':                  { section: 'skills' },
  '/documentation':                            { section: 'documentation', subSection: 'official-documentation' },
  '/documentation/official-documentation':     { section: 'documentation', subSection: 'official-documentation' },
  '/documentation/pricing-plan':               { section: 'documentation', subSection: 'pricing-plan' },
  '/mcp':                     { section: 'mcp' },
  '/subagents':               { section: 'subagents' },
  '/case-studies':            { section: 'case-studies' },
  '/bob-community':           { section: 'bob-community' },
};

const SECTION_TO_ROUTE = {
  'introduction':         '#/',
  'learning-resources':        '#/learning-resources',
  'learning-path':             '#/learning-resources/learning-path',
  'explore-bob':               '#/learning-resources/explore-bob',
  'use-cases':            '#/use-cases',
  'technical-use-cases':  '#/use-cases/technical',
  'business-use-cases':   '#/use-cases/business',
  'demos':                '#/demos',
  'labs':                 '#/labs',
  'modes':                '#/modes',
  'premium-modes':        '#/modes/premium',
  'custom-modes':         '#/modes/custom',
  'skills':               '#/skills',
  'documentation':                    '#/documentation',
  'official-documentation':           '#/documentation/official-documentation',
  'pricing-plan':                     '#/documentation/pricing-plan',
  'mcp':                  '#/mcp',
  'subagents':            '#/subagents',
  'case-studies':         '#/case-studies',
  'bob-community':        '#/bob-community',
};

// ─── Use-Case Detail ──────────────────────────────────────────────────────────
// Load embedded JSON data (rendered by Jekyll/Liquid at build time)
let _ucData = null;
function getUcData() {
  if (_ucData) return _ucData;
  try {
    const el = document.getElementById('use-cases-data');
    _ucData = el ? JSON.parse(el.textContent) : [];
  } catch (_) { _ucData = []; }
  return _ucData;
}

function findUcById(id) {
  return getUcData().find(uc => uc.id === id) || null;
}

function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return m ? m[1] : null;
}

function markdownToHtml(text) {
  if (!text) return '';
  // Split into blocks on blank lines
  const blocks = text.split(/\n{2,}/);
  return blocks.map(block => {
    const lines = block.split('\n').map(l => l.trimEnd());
    // Bullet list block
    if (lines.every(l => /^[\s]*[-*]\s/.test(l) || l.trim() === '')) {
      const items = lines
        .filter(l => /^[\s]*[-*]\s/.test(l))
        .map(l => `<li>${inlineMd(l.replace(/^[\s]*[-*]\s/, ''))}</li>`)
        .join('');
      return `<ul>${items}</ul>`;
    }
    // Paragraph
    return `<p>${lines.map(inlineMd).join('<br>')}</p>`;
  }).join('');
}

function inlineMd(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

// Track which sub-section we came from so Back returns correctly
let _ucReturnSubSection = 'business-use-cases';

function navigateToUcDetail(ucId) {
  const uc = findUcById(ucId);
  if (!uc) return;

  // Remember which tab we came from (business or technical)
  const useCasesSectionEl = document.getElementById('use-cases-section');
  const activeSubTab = useCasesSectionEl && useCasesSectionEl.querySelector('.sub-tab.active');
  if (activeSubTab) _ucReturnSubSection = activeSubTab.dataset.subSection;

  renderUcDetail(uc);

  // Show detail section
  contentSections.forEach(s => s.classList.remove('active'));
  document.getElementById('use-case-detail-section').classList.add('active');

  // Dim sidebar active state (no sidebar item for detail pages)
  sidebarButtons.forEach(btn => btn.classList.remove('active'));

  searchContainer.style.display = 'none';

  const hash = '#/use-cases/' + encodeURIComponent(ucId);
  if (window.location.hash !== hash) history.pushState(null, '', hash);

  // GA4 virtual page view
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: ucId ? 'use-case: ' + ucId : 'use-case-detail',
      page_location: window.location.origin + window.location.pathname + hash
    });
  }
}

function renderUcDetail(uc) {
  // Reset tab to overview
  document.querySelectorAll('.uc-detail-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.uc-detail-tab[data-tab="overview"]').classList.add('active');
  document.querySelectorAll('.uc-tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('ucTabOverview').classList.add('active');

  // Title + description
  document.getElementById('ucDetailTitle').textContent = uc.title || '';
  document.getElementById('ucDetailDescription').textContent = uc.description || '';

  // Badges
  const badgesEl = document.getElementById('ucDetailBadges');
  badgesEl.innerHTML = '';
  if (uc.domain) {
    const d = document.createElement('span');
    d.className = 'uc-badge uc-badge--domain';
    d.textContent = uc.domain;
    badgesEl.appendChild(d);
  }
  if (uc.type) {
    const t = document.createElement('span');
    t.className = 'uc-badge uc-badge--type';
    t.textContent = uc.type;
    badgesEl.appendChild(t);
  }

  // Explore lab button (lab or link)
  const exploreBtn = document.getElementById('ucExploreBtn');
  const exploreUrl = uc.lab || uc.link;
  if (exploreUrl) {
    exploreBtn.style.display = 'inline-flex';
    exploreBtn.onclick = () => window.open(exploreUrl, '_blank', 'noopener,noreferrer');
  } else {
    exploreBtn.style.display = 'none';
  }

  // Overview — Problem
  const problemBlock = document.getElementById('ucProblemBlock');
  if (uc.problem) {
    document.getElementById('ucProblemText').innerHTML = markdownToHtml(uc.problem);
    problemBlock.style.display = 'block';
  } else {
    problemBlock.style.display = 'none';
  }

  // Overview — Solution
  const solutionBlock = document.getElementById('ucSolutionBlock');
  if (uc.solution) {
    document.getElementById('ucSolutionText').innerHTML = markdownToHtml(uc.solution);
    solutionBlock.style.display = 'block';
  } else {
    solutionBlock.style.display = 'none';
  }

  // Overview — Architecture diagram (collapsible, shown only when image is available)
  const archBlock = document.getElementById('ucArchBlock');
  const archBody  = document.getElementById('ucArchBody');
  const archBtn   = document.getElementById('ucArchBtn');
  if (uc.architecture_diagram) {
    const _archBase = 'https://raw.githubusercontent.com/ibm-self-serve-assets/bob-innovation-hub/refs/heads/main';
    archBody.innerHTML = `<img src="${_archBase}${uc.architecture_diagram}" alt="Solution Architecture Diagram" class="uc-arch-img">`;
    archBlock.style.display = 'block';
    // Reset collapsed state on each navigation
    archBtn.classList.remove('open');
    archBody.style.display = 'none';
  } else {
    archBlock.style.display = 'none';
    archBody.innerHTML = '';
  }

  // Side — Business value
  const bizBlock = document.getElementById('ucBizValueBlock');
  let bizItems = [];
  if (typeof uc.business_value === 'string' && uc.business_value.trim()) {
    bizItems = uc.business_value.split('\n')
      .map(l => l.replace(/^[\s\-\*]+/, '').trim())
      .filter(l => l.length > 0);
  } else if (Array.isArray(uc.business_value)) {
    bizItems = uc.business_value.filter(v => v && v.trim());
  }
  if (bizItems.length) {
    const list = document.getElementById('ucBizValueList');
    list.innerHTML = bizItems.map(v => `<li><span class="uc-value-check">✓</span>${v}</li>`).join('');
    bizBlock.style.display = 'block';
  } else {
    bizBlock.style.display = 'none';
  }

  // Side — Tech stack
  const techBlock = document.getElementById('ucTechStackBlock');
  const techItems = Array.isArray(uc.tech_stack)
    ? uc.tech_stack
    : (typeof uc.tech_stack === 'string' && uc.tech_stack.trim() ? [uc.tech_stack] : []);
  if (techItems.length) {
    const pills = document.getElementById('ucTechPills');
    pills.innerHTML = techItems.map(t => `<span class="uc-tech-pill">${t}</span>`).join('');
    techBlock.style.display = 'block';
  } else {
    techBlock.style.display = 'none';
  }

  // Side — resource links (if no problem/solution, show links in overview)
  const linksBlock = document.getElementById('ucLinksBlock');
  const linkItems = [];
  if (uc.link)  linkItems.push({ label: 'View Use Case', href: uc.link });
  if (uc.mode)  linkItems.push({ label: 'View Mode', href: uc.mode });
  if (uc.skill) linkItems.push({ label: 'View Skill', href: uc.skill });
  if (linkItems.length) {
    document.getElementById('ucLinksList').innerHTML = linkItems
      .map(l => `<a class="uc-resource-link" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label} →</a>`)
      .join('');
    linksBlock.style.display = 'block';
  } else {
    linksBlock.style.display = 'none';
  }

  // Demo tab
  const demoTab = document.getElementById('ucDemoTab');
  if (uc.demo) {
    demoTab.style.display = 'inline-flex';
    document.getElementById('ucDemoSubtitle').textContent =
      `Experience the ${uc.title} solution live. Follow the guided walkthrough below.`;
    const ytId = getYouTubeId(uc.demo);
    const playerEl = document.getElementById('ucDemoPlayer');
    if (ytId) {
      playerEl.innerHTML = `<iframe class="uc-demo-iframe" src="https://www.youtube.com/embed/${ytId}" title="${uc.title} Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      playerEl.innerHTML = `<a class="uc-demo-external-link" href="${uc.demo}" target="_blank" rel="noopener noreferrer">Open Demo →</a>`;
    }
    const stepsBlock = document.getElementById('ucDemoStepsBlock');
    if (uc.demo_steps && uc.demo_steps.length) {
      const stepsList = document.getElementById('ucDemoStepsList');
      stepsList.innerHTML = uc.demo_steps.map((s, i) =>
        `<li class="uc-demo-step"><span class="uc-step-num">${i + 1}</span><div><strong>${s.title || s}</strong>${s.desc ? `<p>${s.desc}</p>` : ''}</div></li>`
      ).join('');
      stepsBlock.style.display = 'block';
    } else {
      stepsBlock.style.display = 'none';
    }
  } else {
    demoTab.style.display = 'none';
  }

  // Presentation tab
  const presTab = document.getElementById('ucPresentationTab');
  if (uc.slide_deck || (uc.slide_titles && uc.slide_titles.length)) {
    presTab.style.display = 'inline-flex';
    document.getElementById('ucPresentationSubtitle').textContent =
      `Browse the slides for ${uc.title}. Use the navigation to move between slides.`;
    renderSlideViewer(uc);
  } else {
    presTab.style.display = 'none';
  }
}

// Simple slide viewer — PDF iframe when slide_deck is set, slide titles otherwise
let _currentSlide = 0;
let _slideTitles  = [];
let _slideDeckUrl = null;

function renderSlideViewer(uc) {
  _slideTitles  = uc.slide_titles || [];
  _currentSlide = 0;
  _slideDeckUrl = uc.slide_deck || null;
  updateSlideView();
}

function updateSlideView() {
  const layout = document.getElementById('ucPresentationLayout');
  const nav    = document.getElementById('ucSlideNav');
  const viewer = document.getElementById('ucSlideViewer');
  if (!layout || !nav || !viewer) return;

  const total = _slideTitles.length;

  // If a PDF is available, render it as an embedded viewer (full-width)
  if (_slideDeckUrl && total === 0) {
    // _slideDeckUrl is site-root-relative (e.g. /docs/slide_decks/foo.pdf).
    // On GitHub Pages the site lives under a subpath (/bob-innovation-hub/),
    // so we must prepend the page's base (origin + pathname without the hash)
    // rather than using the bare root-relative path.
    const pageBase = location.href.split('#')[0].replace(/\/$/, '');
    const pdfUrl = pageBase + _slideDeckUrl;
    layout.classList.add('uc-presentation-layout--pdf');
    nav.innerHTML = '';
    viewer.innerHTML = `
      <iframe
        class="uc-pdf-iframe"
        src="${pdfUrl}"
        title="Presentation Deck"
      ></iframe>
      <div class="uc-pdf-fallback">
        <a class="uc-resource-link" href="${pdfUrl}" target="_blank" rel="noopener noreferrer">
          Open PDF in new tab →
        </a>
      </div>`;
    return;
  }

  // Slide titles mode — restore two-column layout
  layout.classList.remove('uc-presentation-layout--pdf');

  if (total === 0) {
    nav.innerHTML = '';
    viewer.innerHTML = '<p class="uc-no-slides">No slide preview available.</p>';
    return;
  }

  nav.innerHTML = `<p class="uc-slides-label">SLIDES (${total})</p>` +
    _slideTitles.map((t, i) =>
      `<button class="uc-slide-nav-item ${i === _currentSlide ? 'active' : ''}" onclick="goToSlide(${i})">${i + 1}. ${t}</button>`
    ).join('');

  const slide = _slideTitles[_currentSlide];
  viewer.innerHTML = `
    <div class="uc-slide-display">
      <span class="uc-slide-label">SLIDE ${_currentSlide + 1} OF ${total}</span>
      <h3 class="uc-slide-title">${slide}</h3>
    </div>
    <div class="uc-slide-controls">
      <button class="uc-slide-btn" onclick="goToSlide(${_currentSlide - 1})" ${_currentSlide === 0 ? 'disabled' : ''}>← Previous</button>
      <div class="uc-slide-dots">
        ${_slideTitles.map((_, i) => `<span class="uc-slide-dot ${i === _currentSlide ? 'active' : ''}" onclick="goToSlide(${i})"></span>`).join('')}
      </div>
      <button class="uc-slide-btn uc-slide-btn--primary" onclick="goToSlide(${_currentSlide + 1})" ${_currentSlide === total - 1 ? 'disabled' : ''}>Next →</button>
    </div>`;
}

function goToSlide(idx) {
  if (idx < 0 || idx >= _slideTitles.length) return;
  _currentSlide = idx;
  updateSlideView();
}

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

  // GA4 virtual page view
  if (typeof gtag === 'function') {
    const hash = subSectionId
      ? (SECTION_TO_ROUTE[subSectionId] || SECTION_TO_ROUTE[sectionId] || '#/')
      : (SECTION_TO_ROUTE[sectionId] || '#/');
    gtag('event', 'page_view', {
      page_title: subSectionId || sectionId || 'introduction',
      page_location: window.location.origin + window.location.pathname + hash
    });
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

  // GA4 virtual page view for sub-tab switch
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: subSectionId || sectionId || 'unknown',
      page_location: window.location.origin + window.location.pathname + hash
    });
  }
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

    // GA4 virtual page view for sub-tab switch
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_title: subSection || sectionId || 'unknown',
        page_location: window.location.origin + window.location.pathname + hash
      });
    }
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
  'learning-resources': 1,
  'learning-path': 1,
  'explore-bob': 1,
  documentation: 1,
  'official-documentation': 1,
  'pricing-plan': 1,
  mcp: 1,
  subagents: 1,
  'case-studies': 1,
  'bob-community': 1,
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

const ALL_PAGINATED_SECTIONS = ['labs','custom-modes','premium-modes','demos','technical-use-cases','business-use-cases','modes','skills','learning-path','explore-bob','official-documentation','pricing-plan','mcp','subagents','case-studies','bob-community'];

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
  // Detect /use-cases/:id detail route
  const ucDetailMatch = path.match(/^\/use-cases\/(.+)$/);
  if (ucDetailMatch && !ROUTE_MAP[path]) {
    return { section: 'use-case-detail', ucId: decodeURIComponent(ucDetailMatch[1]), query };
  }
  return { ...(ROUTE_MAP[path] || ROUTE_MAP['/']), query };
}

// ─── Share buttons ────────────────────────────────────────────────────────────
const SHARE_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;

function buildShareUrl(card) {
  // Use-case cards have a detail page — link directly to it
  if (card.dataset.ucId) {
    const hash = '#/use-cases/' + encodeURIComponent(card.dataset.ucId);
    return window.location.origin + window.location.pathname + hash;
  }
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

  // Use-case card clicks → detail view
  document.querySelectorAll('.uc-card-clickable').forEach(card => {
    card.addEventListener('click', e => {
      // Don't intercept clicks on links/buttons inside the card
      if (e.target.closest('a, button, cds-link')) return;
      const ucId = card.dataset.ucId;
      if (ucId) navigateToUcDetail(ucId);
    });
  });

  // Back button in detail view
  const backBtn = document.getElementById('ucBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      activateSection('use-cases', _ucReturnSubSection, true);
      repaginateAll();
    });
  }

  // Tab switching in detail view
  document.querySelectorAll('.uc-detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      document.querySelectorAll('.uc-detail-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.uc-tab-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`ucTab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`).classList.add('active');
    });
  });

  // Collapsible architecture block
  const archBtn = document.getElementById('ucArchBtn');
  if (archBtn) {
    archBtn.addEventListener('click', () => {
      const body = document.getElementById('ucArchBody');
      const open = archBtn.classList.toggle('open');
      if (body) body.style.display = open ? 'block' : 'none';
    });
  }

  injectShareButtons();

  const resolved = resolveHash(window.location.hash);
  if (resolved.section === 'use-case-detail') {
    navigateToUcDetail(resolved.ucId);
  } else {
    activateSection(resolved.section, resolved.subSection || null, false);
    if (resolved.query) setSearchValue(resolved.query);
    repaginateAll();
    if (resolved.query) setTimeout(() => highlightCard(resolved.query), 50);
  }
});

// Browser back/forward
window.addEventListener('hashchange', () => {
  const resolved = resolveHash(window.location.hash);
  if (resolved.section === 'use-case-detail') {
    navigateToUcDetail(resolved.ucId);
  } else {
    activateSection(resolved.section, resolved.subSection || null, false);
    setSearchValue(resolved.query || '');
    repaginateAll();
    if (resolved.query) setTimeout(() => highlightCard(resolved.query), 50);
  }
});

// Re-paginate on resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(repaginateAll, 200);
});

// Made with Bob
