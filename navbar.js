const path = window.location.pathname;
const inGallery = path.includes('/gallery/');

const homeLink = inGallery ? '../index.html' : 'index.html';
const aboutLink = inGallery ? '../about.html' : 'about.html';
const galleryLink = inGallery ? 'collection.html' : 'gallery/collection.html';

document.getElementById('navbar-placeholder').innerHTML = `
<nav class="navbar">
<ul class="nav-links">
<li><a href="${homeLink}">Home</a></li>
<li><a href="${galleryLink}">Gallery</a></li>
<li><a href="${aboutLink}">About</a></li>
</ul>

<button id="theme-toggle" aria-label="Toggle theme">
<span class="icon">🌙</span>
</button>
</nav>
`;