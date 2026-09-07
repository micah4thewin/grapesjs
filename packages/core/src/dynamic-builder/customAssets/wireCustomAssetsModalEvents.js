import activateCustomAssetsTab from './activateCustomAssetsTab.js';
import deleteCustomAssetRecord from './deleteCustomAssetRecord.js';
import handleCustomFontUpload from './handleCustomFontUpload.js';
import handleCustomIconUpload from './handleCustomIconUpload.js';
import wireTabListKeyboardNavigation from '../support/wireTabListKeyboardNavigation.js';

const wireCustomAssetsModalEvents = (editor, rootElement) => {
  rootElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const formElement = submitEvent.target;
    if (!formElement || !formElement.hasAttribute) return;
    if (formElement.hasAttribute('data-db-custom-font-form')) handleCustomFontUpload(editor, rootElement);
    if (formElement.hasAttribute('data-db-custom-icon-form')) handleCustomIconUpload(editor, rootElement);
  });
  rootElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!targetElement) return;
    const tabButton = targetElement.closest('[data-db-custom-tab]');
    if (tabButton) {
      activateCustomAssetsTab(rootElement, tabButton.getAttribute('data-db-custom-tab'));
      return;
    }
    const deleteButton = targetElement.closest('[data-db-custom-delete]');
    if (!deleteButton) return;
    deleteCustomAssetRecord(
      editor,
      rootElement,
      deleteButton.getAttribute('data-db-custom-delete'),
      deleteButton.getAttribute('data-db-custom-id'),
    );
  });
  wireTabListKeyboardNavigation(rootElement, {
    tabAttribute: 'data-db-custom-tab',
    activateTab: (tabId, options) => activateCustomAssetsTab(rootElement, tabId, options),
  });
};

export default wireCustomAssetsModalEvents;
