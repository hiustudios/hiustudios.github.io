const path = window.location.pathname;
const inGallery = path.includes('/gallery/');
const inNews = path.includes('/news/');
const inSubfolder = inGallery || inNews;

const homeLink = inSubfolder ? '../index.html' : 'index.html';
const aboutLink = inSubfolder ? '../about.html' : 'about.html';

const galleryLink = inGallery
  ? 'collection.html'
  : inNews
  ? '../gallery/collection.html'
  : 'gallery/collection.html';

const newsLink = inNews
  ? 'news.html'
  : inGallery
  ? '../news/news.html'
  : 'news/news.html';

document.getElementById('navbar-placeholder').innerHTML = `
<nav class="navbar">
<ul class="nav-links">
<li><a href="${homeLink}">Home</a></li>
<li><a href="${galleryLink}">Gallery</a></li>
<li><a href="${newsLink}">News</a></li>
<li><a href="${aboutLink}">About</a></li>
</ul>

<button id="theme-toggle" aria-label="Toggle theme">
<span class="icon">🌙</span>
</button>
</nav>
`;