import getPageDisplayName from './getPageDisplayName.js';

const updatePagesTriggerLabel = (editor, stripElement) => {
  const applyCurrentPageName = () => {
    const labelElement = stripElement.querySelector('[data-db-pages-label]');
    const triggerElement = stripElement.querySelector('[data-db-menu-trigger="pages"]');
    if (!labelElement) return;
    const pageName = getPageDisplayName(editor.Pages.getSelected());
    labelElement.textContent = pageName;
    triggerElement && triggerElement.setAttribute('aria-label', `Pages: ${pageName}`);
  };
  applyCurrentPageName();
  editor.on('page', applyCurrentPageName);
};

export default updatePagesTriggerLabel;
