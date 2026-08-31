import escapeHtmlText from '../support/escapeHtmlText.js';
import collectBindingPathEntries from './collectBindingPathEntries.js';
import createValueTraitDefinition from './createValueTraitDefinition.js';

const createBindingPathTraitDefinition = (editor, moduleOptions) =>
  createValueTraitDefinition(({ trait }) => {
    const datalistId = `gjs-db-binding-paths-${trait.cid}`;
    const optionMarkup = collectBindingPathEntries(editor, moduleOptions)
      .map((pathEntry) => `<option value="${escapeHtmlText(pathEntry)}"></option>`)
      .join('');
    const placeholderValue = escapeHtmlText(trait.get('placeholder') || '{{db:source.field}}');
    return [
      '<div class="gjs-db-field">',
      `<input type="text" class="gjs-db-field-input" list="${datalistId}" placeholder="${placeholderValue}">`,
      `<datalist id="${datalistId}">${optionMarkup}</datalist>`,
      '</div>',
    ].join('');
  }, 'input');

export default createBindingPathTraitDefinition;
