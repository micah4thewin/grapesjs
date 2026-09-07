import activateTemplateManagerTab from './activateTemplateManagerTab.js';
import findTemplateRecordById from './findTemplateRecordById.js';
import openSaveTemplateModal from './openSaveTemplateModal.js';
import renderTemplateCards from './renderTemplateCards.js';
import runTemplateCardAction from './runTemplateCardAction.js';
import wireTabListKeyboardNavigation from '../support/wireTabListKeyboardNavigation.js';

const wireTemplateManagerEvents = (editor, moduleOptions, rootElement, viewState, reopenOnTab) => {
  const activateTab = (tabId, options) => activateTemplateManagerTab(editor, rootElement, viewState, tabId, options);
  rootElement.querySelectorAll('[data-db-template-tab]').forEach((tabButton) => {
    tabButton.addEventListener('click', () => activateTab(tabButton.getAttribute('data-db-template-tab')));
  });
  wireTabListKeyboardNavigation(rootElement, { tabAttribute: 'data-db-template-tab', activateTab });
  const searchElement = rootElement.querySelector('[data-db-template-search]');
  searchElement &&
    searchElement.addEventListener('input', () => {
      viewState.queryText = String(searchElement.value || '');
      renderTemplateCards(editor, rootElement, viewState);
    });
  const categoryElement = rootElement.querySelector('[data-db-template-category]');
  categoryElement &&
    categoryElement.addEventListener('change', () => {
      viewState.categoryId = String(categoryElement.value || 'all');
      renderTemplateCards(editor, rootElement, viewState);
    });
  rootElement.querySelectorAll('[data-db-template-save]').forEach((saveButton) => {
    saveButton.addEventListener('click', () =>
      openSaveTemplateModal(editor, moduleOptions, saveButton.getAttribute('data-db-template-save'), () =>
        reopenOnTab('user'),
      ),
    );
  });
  const gridElement = rootElement.querySelector('[data-db-template-grid]');
  gridElement &&
    gridElement.addEventListener('click', (clickEvent) => {
      const actionButton = clickEvent.target.closest('[data-db-template-action]');
      const cardElement = actionButton && actionButton.closest('[data-db-template-card]');
      if (!cardElement) return;
      const templateRecord = findTemplateRecordById(viewState, cardElement.getAttribute('data-db-template-card'));
      templateRecord &&
        runTemplateCardAction(
          editor,
          moduleOptions,
          templateRecord,
          actionButton.getAttribute('data-db-template-action'),
          () => reopenOnTab('user'),
        );
    });
};

export default wireTemplateManagerEvents;
