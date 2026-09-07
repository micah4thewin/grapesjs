const runNavbarBehavior = () => {
  document.querySelectorAll('[data-db-navbar]').forEach((navbarElement) => {
    if (navbarElement.dataset.dbNavbarReady) return;
    navbarElement.dataset.dbNavbarReady = 'true';
    const normalizePath = (pathValue) => pathValue.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
    const currentPath = normalizePath(window.location.pathname);
    navbarElement.querySelectorAll('[data-db-navbar-menu] a[href]').forEach((linkElement) => {
      const hrefValue = linkElement.getAttribute('href') || '';
      let isCurrent = false;
      try {
        const linkUrl = new URL(hrefValue, window.location.href);
        isCurrent =
          hrefValue.indexOf('#') < 0 &&
          linkUrl.origin === window.location.origin &&
          normalizePath(linkUrl.pathname) === currentPath;
      } catch (urlError) {
        isCurrent = false;
      }
      if (isCurrent) linkElement.setAttribute('aria-current', 'page');
      else linkElement.removeAttribute('aria-current');
    });
    const toggleElement = navbarElement.querySelector('[data-db-navbar-toggle]');
    const panelElement = navbarElement.querySelector('[data-db-navbar-panel]');
    const scrimElement = navbarElement.querySelector('[data-db-navbar-scrim]');
    const closeElement = navbarElement.querySelector('[data-db-navbar-close]');
    if (!toggleElement || !panelElement) return;
    if (!panelElement.id) panelElement.id = 'db-navbar-panel-' + Math.random().toString(36).slice(2, 9);
    toggleElement.setAttribute('aria-controls', panelElement.id);
    const isMenuOpen = () => navbarElement.getAttribute('data-db-open') === 'true';
    const isDrawerLayout = () => window.matchMedia('(max-width: 900px)').matches;
    const menuState = { previousOverflow: null };
    const setMenuOpen = (shouldOpen) => {
      if (shouldOpen === isMenuOpen()) return;
      navbarElement.setAttribute('data-db-open', shouldOpen ? 'true' : 'false');
      toggleElement.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      const ownerBody = navbarElement.ownerDocument.body;
      if (shouldOpen && isDrawerLayout()) {
        menuState.previousOverflow = ownerBody.style.overflow;
        ownerBody.style.overflow = 'hidden';
      } else if (!shouldOpen && menuState.previousOverflow !== null) {
        ownerBody.style.overflow = menuState.previousOverflow;
        menuState.previousOverflow = null;
      }
      if (!shouldOpen) return;
      const firstLink = panelElement.querySelector('[data-db-navbar-menu] a') || panelElement.querySelector('a, button');
      if (firstLink) setTimeout(() => firstLink.focus(), 60);
    };
    const closeAndRefocus = () => {
      setMenuOpen(false);
      toggleElement.focus();
    };
    toggleElement.addEventListener('click', () => setMenuOpen(!isMenuOpen()));
    if (scrimElement) scrimElement.addEventListener('click', () => setMenuOpen(false));
    if (closeElement) closeElement.addEventListener('click', closeAndRefocus);
    panelElement.addEventListener('click', (clickEvent) => {
      const linkTarget = clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('a') : null;
      if (linkTarget && isMenuOpen()) setMenuOpen(false);
    });
    navbarElement.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key === 'Escape' && isMenuOpen()) {
        closeAndRefocus();
        return;
      }
      if (keyEvent.key !== 'Tab' || !isMenuOpen() || !isDrawerLayout()) return;
      const focusable = [toggleElement, ...panelElement.querySelectorAll('a, button, input, select, textarea')].filter(
        (candidate) => !candidate.hasAttribute('disabled'),
      );
      const firstItem = focusable[0];
      const lastItem = focusable[focusable.length - 1];
      const activeItem = navbarElement.ownerDocument.activeElement;
      if (!keyEvent.shiftKey && activeItem === lastItem) {
        keyEvent.preventDefault();
        firstItem.focus();
      }
      if (keyEvent.shiftKey && activeItem === firstItem) {
        keyEvent.preventDefault();
        lastItem.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (!isDrawerLayout() && isMenuOpen()) setMenuOpen(false);
    });
  });
};

export default runNavbarBehavior;
