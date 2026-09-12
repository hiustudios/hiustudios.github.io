let allBooks = [];
let currentPage = 1;
const PAGE_SIZE = 6;

const searchInput = document.getElementById('searchInput');
const libraryGrid = document.getElementById('libraryGrid');
const noResults = document.getElementById('noResults');
const paginationWrapper = document.getElementById('paginationWrapper');

async function loadLibrary() {
  const res = await fetch('library.json');
  allBooks = await res.json();
  render();
}

function render() {
  const query = searchInput.value.toLowerCase().trim();

  const matching = allBooks.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = matching.slice(start, start + PAGE_SIZE);

  libraryGrid.innerHTML = pageItems.map(book => `
    <a href="book.html?id=${book.id}" class="book-item">
      <img src="${book.cover}" alt="${book.title}">
      <span class="book-category">${book.category}</span>
      <h3>${book.title}</h3>
      <p class="book-author">${book.author}</p>
    </a>
  `).join('');

  noResults.hidden = matching.length !== 0;

  renderPagination(totalPages, matching.length);
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
  libraryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

searchInput.addEventListener('input', () => {
  currentPage = 1;
  render();
});

loadLibrary();