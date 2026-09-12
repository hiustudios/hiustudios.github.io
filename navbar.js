const path = window.location.pathname;
const inGallery = path.includes('/gallery/');
const inLibrary = path.includes('/library/');
const inSubfolder = inGallery || inLibrary;

const homeLink = inSubfolder ? '../index.html' : 'index.html';
const aboutLink = inSubfolder ? '../about.html' : 'about.html';

const galleryLink = inGallery
    ? 'collection.html'
    : inLibrary
        ? '../gallery/collection.html'
        : 'gallery/collection.html';

const libraryLink = inLibrary
    ? 'books.html'
    : inGallery
        ? '../library/books.html'
        : 'library/books.html';

document.getElementById('navbar-placeholder').innerHTML = `
<nav class="navbar">
<ul class="nav-links">
<li><a href="${homeLink}">Home</a></li>
<li><a href="${galleryLink}">Gallery</a></li>
<li><a href="${libraryLink}">Library</a></li>
<li><a href="${aboutLink}">About</a></li>
</ul>

<button id="theme-toggle" aria-label="Toggle theme">
<span class="icon">🌙</span>
</button>
</nav>
`;