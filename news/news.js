const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const paginationWrapper = document.getElementById('paginationWrapper');
const newsGrid = document.getElementById('newsGrid');

const PAGE_SIZE = 6;
let currentPage = 1;
let newsCards = [];

function getSearchText(card) {
  const title = card.querySelector('h3').textContent.toLowerCase();
  const date = card.querySelector('.news-card-date').textContent.toLowerCase();
  return title + ' ' + date;
}

function render() {
  const query = searchInput.value.toLowerCase().trim();

  const matchingCards = newsCards.filter(card =>
    getSearchText(card).includes(query)
  );

  const totalPages = Math.max(1, Math.ceil(matchingCards.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  newsCards.forEach(card => {
    const isMatch = matchingCards.includes(card);
    const isOnPage = isMatch && matchingCards.indexOf(card) >= start && matchingCards.indexOf(card) < end;
    card.style.display = isOnPage ? '' : 'none';
  });

  noResults.hidden = matchingCards.length !== 0;

  renderPagination(totalPages, matchingCards.length);
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
  newsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function loadNews() {
  const res = await fetch('news.json');
  const data = await res.json();

  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  newsGrid.innerHTML = data.map(item => `
    <a href="article.html?id=${item.id}" class="news-card">
      <img src="${item.cover}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p class="news-card-date">${new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </a>
  `).join('');

  newsCards = Array.from(document.querySelectorAll('.news-card'));

  searchInput.addEventListener('input', () => {
    currentPage = 1;
    render();
  });

  render();
}

loadNews();