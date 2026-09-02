const closeShellMenus = (stripElement, options = {}) => {
  const openTrigger = stripElement.querySelector('[data-db-menu-trigger][aria-expanded="true"]');
  stripElement.querySelectorAll('[data-db-menu]').forEach((menuElement) => {
    menuElement.hidden = true;
  });
  stripElement.querySelectorAll('[data-db-menu-trigger]').forEach((triggerElement) => {
    triggerElement.setAttribute('aria-expanded', 'false');
  });
  if (options.restoreFocus && openTrigger && openTrigger.focus) openTrigger.focus();
};

export default closeShellMenus;
