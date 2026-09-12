async function loadBook() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const res = await fetch('library.json');
  const books = await res.json();
  const book = books.find(b => b.id === id);

  const container = document.getElementById('bookDetail');

  if (!book) {
    container.innerHTML = `<p class="no-results">Book not found.</p>`;
    return;
  }

  document.title = book.title;

  container.innerHTML = `
    <img src="${book.cover}" alt="${book.title}" class="book-detail-img">
    <div class="book-title-row">
      <h1>${book.title}</h1>
    </div>
    <div class="book-meta">
      <p class="artist-name">${book.author}</p>
    </div>
    <div class="artwork-section">
      <h2>About the Book</h2>
      <p>${book.description}</p>
    </div>
    <a href="books.html" class="back-link">← Back to Library</a>
  `;
}

loadBook();