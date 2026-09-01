import getPageDisplayName from './getPageDisplayName.js';

const updatePagesTriggerLabel = (editor, stripElement) => {
  const applyCurrentPageName = () => {
    const labelElement = stripElement.querySelector('[data-db-pages-label]');
    if (!labelElement) return;
    labelElement.textContent = getPageDisplayName(editor.Pages.getSelected());
  };
  applyCurrentPageName();
  editor.on('page', applyCurrentPageName);
};

export default updatePagesTriggerLabel;
