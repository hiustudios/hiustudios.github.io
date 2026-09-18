const track = document.getElementById('offerings');
const dotsWrapper = document.getElementById('offeringsDots');

if (track && dotsWrapper) {
  const cards = Array.from(track.children);

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
    });
    dotsWrapper.appendChild(dot);
  });

  const dots = Array.from(dotsWrapper.children);

  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }, 50);
  });

  // ===== Mouse drag support (desktop) =====
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let didDrag = false;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    didDrag = false;
    track.classList.add('dragging');
    startX = e.pageX;
    scrollStart = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('dragging');

    if (didDrag) {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const delta = e.pageX - startX;
    if (Math.abs(delta) > 5) didDrag = true;
    track.scrollLeft = scrollStart - delta;
  });

  track.addEventListener('dragstart', (e) => e.preventDefault());

  track.addEventListener('click', (e) => {
    if (didDrag) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}