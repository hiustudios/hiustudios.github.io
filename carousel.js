const track = document.getElementById('offerings');
const dotsWrapper = document.getElementById('offeringsDots');

if (track && dotsWrapper) {
  const originalCards = Array.from(track.children);
  const total = originalCards.length;

  // Clone first and last card for seamless looping
  const firstClone = originalCards[0].cloneNode(true);
  const lastClone = originalCards[total - 1].cloneNode(true);
  firstClone.setAttribute('aria-hidden', 'true');
  lastClone.setAttribute('aria-hidden', 'true');

  track.insertBefore(lastClone, originalCards[0]);
  track.appendChild(firstClone);

  const allSlides = Array.from(track.children); // [lastClone, real1..realN, firstClone]

  // Build dots for the real slides only
  originalCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      track.scrollTo({ left: track.clientWidth * (i + 1), behavior: 'smooth' });
    });
    dotsWrapper.appendChild(dot);
  });

  const dots = Array.from(dotsWrapper.children);

  function setActiveDot(realIndex) {
    dots.forEach(d => d.classList.remove('active'));
    if (dots[realIndex]) dots[realIndex].classList.add('active');
  }

  // Jump instantly (no animation) to the real slide position
  function jumpTo(slideIndex) {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = track.clientWidth * slideIndex;
    track.style.scrollBehavior = '';
  }

  // Position at the first real slide on load (after layout is ready)
  requestAnimationFrame(() => {
    jumpTo(1);
  });

  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const rawIndex = Math.round(track.scrollLeft / track.clientWidth);

      if (rawIndex === 0) {
        // landed on the cloned last slide -> silently jump to the real last slide
        jumpTo(total);
        setActiveDot(total - 1);
      } else if (rawIndex === total + 1) {
        // landed on the cloned first slide -> silently jump to the real first slide
        jumpTo(1);
        setActiveDot(0);
      } else {
        setActiveDot(rawIndex - 1);
      }
    }, 80);
  });

  // Re-align on resize so slide widths stay correct
  window.addEventListener('resize', () => {
    const rawIndex = Math.round(track.scrollLeft / track.clientWidth);
    jumpTo(rawIndex);
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