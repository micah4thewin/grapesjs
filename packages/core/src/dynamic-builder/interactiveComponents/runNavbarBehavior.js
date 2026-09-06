const runNavbarBehavior = () => {
  document.querySelectorAll('[data-db-navbar]').forEach((navbarElement) => {
    if (navbarElement.dataset.dbNavbarReady) return;
    navbarElement.dataset.dbNavbarReady = 'true';
    const toggleElement = navbarElement.querySelector('[data-db-navbar-toggle]');
    const panelElement = navbarElement.querySelector('[data-db-navbar-panel]');
    const scrimElement = navbarElement.querySelector('[data-db-navbar-scrim]');
    if (!toggleElement || !panelElement) return;
    if (!panelElement.id) panelElement.id = 'db-navbar-panel-' + Math.random().toString(36).slice(2, 9);
    toggleElement.setAttribute('aria-controls', panelElement.id);
    const isMenuOpen = () => navbarElement.getAttribute('data-db-open') === 'true';
    const isDrawerLayout = () => window.matchMedia('(max-width: 900px)').matches;
    const setMenuOpen = (shouldOpen) => {
      navbarElement.setAttribute('data-db-open', shouldOpen ? 'true' : 'false');
      toggleElement.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      const ownerBody = navbarElement.ownerDocument.body;
      if (shouldOpen && isDrawerLayout()) ownerBody.style.overflow = 'hidden';
      else ownerBody.style.removeProperty('overflow');
      if (shouldOpen) {
        const firstLink = panelElement.querySelector('a, button');
        if (firstLink) setTimeout(() => firstLink.focus(), 60);
      }
    };
    toggleElement.addEventListener('click', () => setMenuOpen(!isMenuOpen()));
    if (scrimElement) scrimElement.addEventListener('click', () => setMenuOpen(false));
    panelElement.addEventListener('click', (clickEvent) => {
      const linkTarget = clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('a') : null;
      if (linkTarget && isMenuOpen()) setMenuOpen(false);
    });
    navbarElement.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key === 'Escape' && isMenuOpen()) {
        setMenuOpen(false);
        toggleElement.focus();
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
    setMenuOpen(false);
  });
};

export default runNavbarBehavior;
