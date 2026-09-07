const runNavbarScrollBehavior = () => {
  const navbarElements = Array.prototype.filter.call(
    document.querySelectorAll('[data-db-navbar][data-db-scroll]'),
    (navbarElement) => navbarElement.getAttribute('data-db-scroll') !== 'none' && !navbarElement.dataset.dbScrollReady,
  );
  if (!navbarElements.length) return;
  const scrollState = { lastY: window.scrollY || 0, ticking: false };
  const applyScrollState = () => {
    scrollState.ticking = false;
    const currentY = Math.max(0, window.scrollY || 0);
    const direction = currentY > scrollState.lastY + 4 ? 'down' : currentY < scrollState.lastY - 4 ? 'up' : '';
    navbarElements.forEach((navbarElement) => {
      navbarElement.setAttribute('data-db-scrolled', currentY > 24 ? 'true' : 'false');
      if (currentY <= 24) navbarElement.setAttribute('data-db-scroll-dir', 'up');
      else if (direction && navbarElement.getAttribute('data-db-open') !== 'true') {
        navbarElement.setAttribute('data-db-scroll-dir', direction);
      }
    });
    scrollState.lastY = currentY;
  };
  navbarElements.forEach((navbarElement) => {
    navbarElement.dataset.dbScrollReady = 'true';
    navbarElement.addEventListener('focusin', () => navbarElement.setAttribute('data-db-scroll-dir', 'up'));
  });
  window.addEventListener(
    'scroll',
    () => {
      if (scrollState.ticking) return;
      scrollState.ticking = true;
      window.requestAnimationFrame(applyScrollState);
    },
    { passive: true },
  );
  applyScrollState();
};

export default runNavbarScrollBehavior;
