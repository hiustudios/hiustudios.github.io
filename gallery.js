const searchInput = document.getElementById('searchInput');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const noResults = document.getElementById('noResults');
const paginationWrapper = document.getElementById('paginationWrapper');
const galleryGrid = document.getElementById('galleryGrid');

const PAGE_SIZE = 2;
let currentPage = 1;

function render() {
  const query = searchInput.value.toLowerCase().trim();

  const matchingItems = galleryItems.filter(item =>
    item.getAttribute('data-title').toLowerCase().includes(query)
  );

  const totalPages = Math.max(1, Math.ceil(matchingItems.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  galleryItems.forEach(item => {
    const isMatch = matchingItems.includes(item);
    const isOnPage = isMatch && matchingItems.indexOf(item) >= start && matchingItems.indexOf(item) < end;
    item.style.display = isOnPage ? '' : 'none';
  });

  noResults.hidden = matchingItems.length !== 0;

  renderPagination(totalPages, matchingItems.length);
}

function renderPagination(totalPages, resultCount) {
  paginationWrapper.innerHTML = '';

  if (totalPages <= 1 || resultCount === 0) return;

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '←';
  prevBtn.className = 'page-btn';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  paginationWrapper.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.addEventListener('click', () => goToPage(i));
    paginationWrapper.appendChild(btn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '→';
  nextBtn.className = 'page-btn';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  paginationWrapper.appendChild(nextBtn);
}

function goToPage(page) {
  currentPage = page;
  render();
  galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

searchInput.addEventListener('input', () => {
  currentPage = 1;
  render();
});

render();