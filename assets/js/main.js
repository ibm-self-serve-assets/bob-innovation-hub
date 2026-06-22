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
const SEARCH_SECTIONS = ['use-cases', 'demos', 'labs', 'modes'];

// Sections with sub-tabs
const SUB_TAB_SECTIONS = ['use-cases', 'modes'];

// Sidebar Navigation
const sidebarButtons = document.querySelectorAll('.sidebar-button');
const contentSections = document.querySelectorAll('.content-section');
const searchBar = document.getElementById('searchBar');
const searchContainer = document.querySelector('.search-container');

sidebarButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;

    // Skip nav-link style buttons embedded in content (no section switch)
    if (!document.getElementById(`${targetSection}-section`)) return;

    // Update sidebar buttons
    sidebarButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Update content sections
    contentSections.forEach(section => section.classList.remove('active'));
    document.getElementById(`${targetSection}-section`).classList.add('active');

    // Show/hide search bar
    if (SEARCH_SECTIONS.includes(targetSection)) {
      searchContainer.style.display = 'block';
      searchBar.value = '';
      // For tabbed sections, paginate the active sub-section
      if (SUB_TAB_SECTIONS.includes(targetSection)) {
        const activeSubTab = document.querySelector(`#${targetSection}-section .sub-tab.active`);
        if (activeSubTab) {
          filterAndPaginate(activeSubTab.dataset.subSection);
        }
      } else {
        filterAndPaginate(targetSection);
      }
    } else {
      searchContainer.style.display = 'none';
    }
  });
});

// Hide search bar on initial load when landing page is active
if (document.querySelector('.sidebar-button.active') &&
    !SEARCH_SECTIONS.includes(document.querySelector('.sidebar-button.active').dataset.section)) {
  searchContainer.style.display = 'none';
}

// Sub-tab Navigation (Use-Cases: Technical / Business)
document.querySelectorAll('.sub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const subSection = tab.dataset.subSection;
    const parentSection = tab.closest('.content-section');

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

    // Reset search and paginate the new sub-section
    searchBar.value = '';
    filterAndPaginate(subSection);
  });
});

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
  modes: 1
};

function filterAndPaginate(section) {
  const container = document.getElementById(`${section}-container`);
  if (!container) return;

  const searchTerm = searchBar.value.toLowerCase().trim();
  const cards = Array.from(container.querySelectorAll('.asset-card'));
  const emptyState = container.querySelector('.empty-state');

  // Filter cards
  let visibleCards = cards.filter(card => {
    if (emptyState && card === emptyState) return false;
    const title = card.dataset.title || '';
    const content = card.dataset.content || '';
    const industry = card.dataset.industry || '';
    const language = card.dataset.language || '';
    const domain = card.dataset.domain || '';
    return `${title} ${content} ${industry} ${language} ${domain}`.includes(searchTerm);
  });

  // Reset to page 1 when searching
  if (searchTerm) currentPage[section] = 1;

  // Hide all cards first
  cards.forEach(card => {
    if (emptyState && card === emptyState) return;
    card.classList.add('hidden');
  });

  // No-results message
  let noResultsDiv = container.querySelector('.no-results');
  if (visibleCards.length === 0 && searchTerm) {
    if (!noResultsDiv) {
      noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'no-results';
      container.appendChild(noResultsDiv);
    }
    noResultsDiv.textContent = `No results found for "${searchBar.value}"`;
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

const ALL_PAGINATED_SECTIONS = ['labs', 'custom-modes', 'premium-modes', 'demos', 'technical-use-cases', 'business-use-cases', 'modes'];

function repaginateAll() {
  ALL_PAGINATED_SECTIONS.forEach(s => filterAndPaginate(s));
}

// Initialize pagination on page load
document.addEventListener('DOMContentLoaded', repaginateAll);

// Re-paginate when window is resized (switches between 6 and 8 per page)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(repaginateAll, 200);
});

// Made with Bob
