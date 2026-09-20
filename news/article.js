async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const res = await fetch('news.json');
  const items = await res.json();
  const post = items.find(a => a.id === id);

  const container = document.getElementById('articleDetail');

  if (!post) {
    container.innerHTML = `<p class="no-results">Article not found.</p>`;
    return;
  }

  document.title = post.title;

  container.innerHTML = `
    <img src="${post.cover}" alt="${post.title}" class="article-detail-img">

    <div class="article-title-row">
      <h1>${post.title}</h1>
      <span class="article-date">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>

    <div class="article-section">
      <p>${post.content}</p>
    </div>

    <a href="news.html" class="back-link">&larr; Back to News</a>
  `;
}

loadArticle();