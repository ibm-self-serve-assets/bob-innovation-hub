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

// Sidebar Navigation
const sidebarButtons = document.querySelectorAll('.sidebar-button');
const contentSections = document.querySelectorAll('.content-section');
const searchBar = document.getElementById('searchBar');
const searchContainer = document.querySelector('.search-container');

sidebarButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;
    
    // Update buttons
    sidebarButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Update content
    contentSections.forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(`${targetSection}-section`).classList.add('active');
    
    // Show/hide search bar based on section
    if (targetSection === 'introduction') {
      searchContainer.style.display = 'none';
    } else {
      searchContainer.style.display = 'block';
      // Reset search and pagination for new section
      searchBar.value = '';
      filterAndPaginate(targetSection);
    }
  });
});

// Hide search bar on initial load if introduction is active
if (document.querySelector('.sidebar-button.active').dataset.section === 'introduction') {
  searchContainer.style.display = 'none';
}

// Search Functionality
let searchTimeout;

searchBar.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const activeSection = document.querySelector('.sidebar-button.active').dataset.section;
    filterAndPaginate(activeSection);
  }, 300);
});

// Pagination Configuration
const ITEMS_PER_PAGE = 6;
let currentPage = {
  labs: 1,
  modes: 1
};

function filterAndPaginate(section) {
  const searchTerm = searchBar.value.toLowerCase().trim();
  const container = document.getElementById(`${section}-container`);
  const cards = Array.from(container.querySelectorAll('.asset-card'));
  const emptyState = container.querySelector('.empty-state');
  
  // Filter cards
  let visibleCards = cards.filter(card => {
    if (emptyState && card === emptyState) return false;
    
    const title = card.dataset.title || '';
    const content = card.dataset.content || '';
    const industry = card.dataset.industry || '';
    const language = card.dataset.language || '';
    
    const searchableText = `${title} ${content} ${industry} ${language}`;
    return searchableText.includes(searchTerm);
  });

  // Reset to page 1 when searching
  if (searchTerm) {
    currentPage[section] = 1;
  }

  // Hide all cards first
  cards.forEach(card => {
    if (emptyState && card === emptyState) return;
    card.classList.add('hidden');
  });

  // Show no results message if needed
  let noResultsDiv = container.querySelector('.no-results');
  if (visibleCards.length === 0 && searchTerm) {
    if (!noResultsDiv) {
      noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'no-results';
      noResultsDiv.textContent = `No results found for "${searchBar.value}"`;
      container.appendChild(noResultsDiv);
    }
    noResultsDiv.classList.remove('hidden');
  } else if (noResultsDiv) {
    noResultsDiv.classList.add('hidden');
  }

  // Calculate pagination
  const totalPages = Math.ceil(visibleCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage[section] - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Show cards for current page
  visibleCards.slice(startIndex, endIndex).forEach(card => {
    card.classList.remove('hidden');
  });

  // Update pagination
  updatePagination(section, currentPage[section], totalPages, visibleCards.length);
}

function updatePagination(section, page, totalPages, totalItems) {
  const paginationContainer = document.getElementById(`${section}-pagination`);
  
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
    if (startPage > 2) {
      paginationHTML += `<span class="pagination-info">...</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-button ${i === page ? 'active' : ''}" onclick="changePage('${section}', ${i})">
        ${i}
      </button>
    `;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += `<span class="pagination-info">...</span>`;
    }
    paginationHTML += `<button class="pagination-button" onclick="changePage('${section}', ${totalPages})">${totalPages}</button>`;
  }

  // Next button
  paginationHTML += `
    <button class="pagination-button" onclick="changePage('${section}', ${page + 1})" ${page === totalPages ? 'disabled' : ''}>
      Next →
    </button>
  `;

  // Info
  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, totalItems);
  paginationHTML += `
    <span class="pagination-info">
      ${startItem}-${endItem} of ${totalItems}
    </span>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

function changePage(section, newPage) {
  currentPage[section] = newPage;
  filterAndPaginate(section);
  
  // Scroll to top of content
  document.getElementById(`${section}-section`).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize pagination on page load
document.addEventListener('DOMContentLoaded', () => {
  filterAndPaginate('introduction');
  filterAndPaginate('labs');
  filterAndPaginate('modes');
});

// Made with Bob
