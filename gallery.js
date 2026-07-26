const searchInput = document.getElementById('searchInput');
const galleryItems = document.querySelectorAll('.gallery-item');
const noResults = document.getElementById('noResults');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  galleryItems.forEach(item => {
    const title = item.getAttribute('data-title').toLowerCase();
    const matches = title.includes(query);

    item.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });

  noResults.hidden = visibleCount !== 0;
});