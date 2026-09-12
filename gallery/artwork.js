async function loadArtwork() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const res = await fetch('gallery.json');
  const artworks = await res.json();
  const art = artworks.find(a => a.id === id);

  const container = document.getElementById('artworkDetail');

  if (!art) {
    container.innerHTML = `<p class="no-results">Artwork not found.</p>`;
    return;
  }

  document.title = art.title;

  container.innerHTML = `
    <img src="${art.cover}" alt="${art.title}" class="artwork-detail-img">

    <div class="artwork-title-row">
      <h1>${art.title}</h1>
      <span class="artwork-year">${art.year}</span>
    </div>

    <div class="artwork-meta">
      <p class="artist-name">${art.artist}</p>

      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-label">Born</span>
          <span class="meta-value">${art.born}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">From</span>
          <span class="meta-value">${art.from}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Medium</span>
          <span class="meta-value">${art.medium}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Dimensions</span>
          <span class="meta-value">${art.dimensions}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Status</span>
          <span class="meta-value">${art.status}</span>
        </div>
      </div>
    </div>

    <div class="artwork-section">
      <h2>About the Artwork</h2>
      <p>${art.aboutArtwork}</p>
    </div>

    <div class="artwork-section">
      <h2>About the Artist</h2>
      <p>${art.aboutArtist}</p>
    </div>

    <a href="collection.html" class="back-link">&larr; Back to Gallery</a>
  `;
}

loadArtwork();