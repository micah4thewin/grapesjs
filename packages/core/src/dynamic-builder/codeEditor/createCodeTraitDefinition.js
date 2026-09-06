import escapeHtmlText from '../support/escapeHtmlText.js';
import openCodeEditorModal from './openCodeEditorModal.js';
import resolveCodeLanguageRecord from './resolveCodeLanguageRecord.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';

const buildPreviewText = (codeText) => {
  const trimmedText = String(codeText || '').trim();
  if (!trimmedText) return 'Nothing here yet.';
  return trimmedText.length > 220 ? trimmedText.slice(0, 220) + '\u2026' : trimmedText;
};

const createCodeTraitDefinition = (editor) => ({
  eventCapture: [],
  createInput: ({ trait }) => {
    const languageRecord = resolveCodeLanguageRecord(trait.get('language'));
    return [
      '<div class="gjs-db-field gjs-db-trait-code">',
      '<code class="gjs-db-trait-code-preview" data-db-trait-code-preview></code>',
      '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-trait-code-open>',
      'Edit ' + escapeHtmlText(languageRecord.label),
      '</button>',
      '</div>',
    ].join('');
  },
  onUpdate: ({ component, trait, elInput }) => {
    const previewElement = resolveTraitInnerElement(elInput, '[data-db-trait-code-preview]');
    if (previewElement) previewElement.textContent = buildPreviewText(trait.getValue());
    const openButton = resolveTraitInnerElement(elInput, '[data-db-trait-code-open]');
    if (!openButton || openButton.dataset.dbTraitCodeWired === 'true') return;
    openButton.dataset.dbTraitCodeWired = 'true';
    openButton.addEventListener('click', () => {
      const languageName = String(trait.get('language') || 'html');
      openCodeEditorModal(editor, {
        title: String(trait.get('label') || 'Edit code'),
        label: String(trait.get('label') || ''),
        language: languageName,
        value: String(trait.getValue() || ''),
        helpText: String(trait.get('helpText') || ''),
        onSubmit: (codeText) => {
          trait.setValue(codeText);
          if (previewElement) previewElement.textContent = buildPreviewText(codeText);
          if (component && component.trigger) component.trigger('change:attributes');
        },
      });
    });
  },
});

export default createCodeTraitDefinition;
