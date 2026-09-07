import buildTemplateCardMarkup from './buildTemplateCardMarkup.js';
import filterTemplateRecords from './filterTemplateRecords.js';
import listVisibleTemplateRecords from './listVisibleTemplateRecords.js';
import resolveTemplateEmptyText from './resolveTemplateEmptyText.js';
import scheduleTemplatePreviews from './scheduleTemplatePreviews.js';
import updateTemplateCategoryOptions from './updateTemplateCategoryOptions.js';

const renderTemplateCards = (editor, rootElement, viewState) => {
  const gridElement = rootElement.querySelector('[data-db-template-grid]');
  const emptyElement = rootElement.querySelector('[data-db-template-empty]');
  if (!gridElement) return [];
  const tabRecords = listVisibleTemplateRecords(viewState);
  viewState.categoryId = updateTemplateCategoryOptions(rootElement, tabRecords, viewState.categoryId);
  const visibleRecords = filterTemplateRecords(tabRecords, viewState.queryText, viewState.categoryId);
  gridElement.innerHTML = visibleRecords.map((templateRecord) => buildTemplateCardMarkup(templateRecord)).join('');
  if (emptyElement) {
    emptyElement.hidden = visibleRecords.length > 0;
    emptyElement.textContent = resolveTemplateEmptyText(viewState.tabId, tabRecords.length > 0);
  }
  scheduleTemplatePreviews(editor, [...gridElement.querySelectorAll('[data-db-template-card]')], (templateId) =>
    visibleRecords.find((templateRecord) => templateRecord.templateId === templateId),
  );
  return visibleRecords;
};

export default renderTemplateCards;
