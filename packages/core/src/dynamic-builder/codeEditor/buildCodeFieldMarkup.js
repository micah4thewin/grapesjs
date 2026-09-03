import escapeHtmlText from '../support/escapeHtmlText.js';
import getCodeSnippetRecords from './getCodeSnippetRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';
import resolveCodeLanguageRecord from './resolveCodeLanguageRecord.js';

const buildCodeFieldMarkup = (fieldOptions) => {
  const languageRecord = resolveCodeLanguageRecord(fieldOptions.language);
  const snippetRecords = getCodeSnippetRecords()[fieldOptions.language] || [];
  const snippetOptionsMarkup = snippetRecords
    .map(
      (snippetRecord) =>
        '<option value="' + escapeHtmlText(snippetRecord.id) + '">' + escapeHtmlText(snippetRecord.label) + '</option>',
    )
    .join('');
  return [
    '<div class="gjs-db-code-field" data-db-code-field="' + escapeHtmlText(fieldOptions.name) + '">',
    '<div class="gjs-db-code-field-head">',
    '<span class="gjs-db-code-language">' + escapeHtmlText(languageRecord.label) + '</span>',
    '<span class="gjs-db-code-field-title">' + escapeHtmlText(fieldOptions.label || '') + '</span>',
    snippetRecords.length
      ? '<select class="gjs-db-code-snippets" data-db-code-snippets aria-label="Insert a snippet">' +
        '<option value="">Insert a snippet</option>' +
        snippetOptionsMarkup +
        '</select>'
      : '',
    '<button type="button" class="gjs-db-button gjs-db-code-expand" data-db-code-expand ',
    'title="Expand the editor" aria-label="Expand the editor" aria-pressed="false">',
    getIconMarkup('fullscreen', { size: 14 }),
    '</button>',
    '</div>',
    '<div class="gjs-db-code-surface" data-db-code-surface></div>',
    '<p class="gjs-db-code-status" data-db-code-status role="status"></p>',
    fieldOptions.helpText ? '<p class="gjs-db-field-help">' + escapeHtmlText(fieldOptions.helpText) + '</p>' : '',
    '</div>',
  ].join('');
};

export default buildCodeFieldMarkup;
