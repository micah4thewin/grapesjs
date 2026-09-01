const closeShellMenus = (stripElement) => {
  stripElement.querySelectorAll('[data-db-menu]').forEach((menuElement) => {
    menuElement.hidden = true;
  });
  stripElement.querySelectorAll('[data-db-menu-trigger]').forEach((triggerElement) => {
    triggerElement.setAttribute('aria-expanded', 'false');
  });
};

export default closeShellMenus;
