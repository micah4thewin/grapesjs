const runNavbarBehavior = () => {
  document.querySelectorAll('[data-db-navbar]').forEach((navbarElement) => {
    if (navbarElement.dataset.dbNavbarReady) return;
    navbarElement.dataset.dbNavbarReady = 'true';
    const toggleElement = navbarElement.querySelector('[data-db-navbar-toggle]');
    const menuElement = navbarElement.querySelector('[data-db-navbar-menu]');
    if (!toggleElement || !menuElement) return;
    if (!menuElement.id) menuElement.id = 'db-navbar-menu-' + Math.random().toString(36).slice(2, 9);
    toggleElement.setAttribute('aria-controls', menuElement.id);
    const isMenuOpen = () => navbarElement.getAttribute('data-db-open') === 'true';
    const setMenuOpen = (shouldOpen) => {
      navbarElement.setAttribute('data-db-open', shouldOpen ? 'true' : 'false');
      toggleElement.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    };
    toggleElement.addEventListener('click', () => setMenuOpen(!isMenuOpen()));
    navbarElement.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key !== 'Escape' || !isMenuOpen()) return;
      setMenuOpen(false);
      toggleElement.focus();
    });
    document.addEventListener('click', (clickEvent) => {
      if (!isMenuOpen()) return;
      const clickTarget = clickEvent.target;
      const insideNavbar =
        clickTarget && clickTarget.closest && clickTarget.closest('[data-db-navbar]') === navbarElement;
      if (!insideNavbar) setMenuOpen(false);
    });
    setMenuOpen(isMenuOpen());
  });
};

export default runNavbarBehavior;
