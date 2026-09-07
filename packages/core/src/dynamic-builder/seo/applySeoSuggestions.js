import buildSeoSuggestionsFromPage from './buildSeoSuggestionsFromPage.js';
import resolveSeoModalPage from './resolveSeoModalPage.js';
import showToastNotice from '../support/showToastNotice.js';

const applySeoSuggestions = (editor, rootElement) => {
  const suggestions = buildSeoSuggestionsFromPage(editor, resolveSeoModalPage(editor, rootElement));
  const suggestionEntries = [
    ['title', suggestions.title, 'a page title'],
    ['description', suggestions.description, 'a meta description'],
    ['ogImage', suggestions.image, 'a share image'],
  ];
  const filledLabels = [];
  let keptCount = 0;
  suggestionEntries.forEach(([fieldKey, suggestedValue, labelText]) => {
    const fieldElement = rootElement.querySelector('[data-db-seo-field="' + fieldKey + '"]');
    if (!fieldElement || !suggestedValue) return;
    if (String(fieldElement.value || '').trim()) {
      keptCount += 1;
      return;
    }
    fieldElement.value = suggestedValue;
    fieldElement.dataset.dbSeoTouched = 'true';
    filledLabels.push(labelText);
  });
  if (filledLabels.length) {
    showToastNotice(editor, 'Suggested ' + filledLabels.join(', ') + '. Review the text, then save.', {
      kind: 'success',
    });
    return filledLabels;
  }
  const messageText = keptCount
    ? 'The fields are already filled in. Clear one to get a suggestion for it.'
    : 'Nothing to suggest yet. Add a headline, a paragraph and an image to the page first.';
  showToastNotice(editor, messageText, { kind: 'warning' });
  return filledLabels;
};

export default applySeoSuggestions;
