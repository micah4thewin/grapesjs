import escapeHtmlText from '../support/escapeHtmlText.js';
import resolvePageFileName from '../support/resolvePageFileName.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const createPageLinkTraitDefinition = (editor) => ({
  createInput: () => {
    const pageOptionsMarkup = editor.Pages.getAll()
      .map((pageModel) => {
        const fileValue = `${resolvePageFileName(editor, pageModel)}.html`;
        const pageName = String(pageModel.getName() || '').trim() || 'Home';
        return `<option value="${escapeHtmlText(fileValue)}">${escapeHtmlText(pageName)}</option>`;
      })
      .join('');
    return [
      '<div class="gjs-db-field">',
      '<select class="gjs-db-field-input" data-db-page-link>',
      '<option value="">Choose a page</option>',
      pageOptionsMarkup,
      '</select>',
      '</div>',
    ].join('');
  },
  onEvent: ({ elInput, component }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-page-link]');
    const selectedValue = selectElement ? selectElement.value : '';
    if (selectedValue && component && component.addAttributes) component.addAttributes({ href: selectedValue });
  },
  onUpdate: ({ elInput, component }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-page-link]');
    if (!selectElement) return;
    const currentHref = component && component.getAttributes ? String(component.getAttributes().href || '') : '';
    const hasMatchingOption = [...selectElement.options].some((optionElement) => optionElement.value === currentHref);
    selectElement.value = hasMatchingOption ? currentHref : '';
  },
});

export default createPageLinkTraitDefinition;
