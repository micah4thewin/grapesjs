import createCodeSurface from './createCodeSurface.js';
import getCodeSnippetRecords from './getCodeSnippetRecords.js';
import validateCodeText from './validateCodeText.js';

const mountCodeField = (editor, fieldElement, fieldOptions) => {
  const surfaceHost = fieldElement.querySelector('[data-db-code-surface]');
  const statusElement = fieldElement.querySelector('[data-db-code-status]');
  if (!surfaceHost) return null;
  const reportStatus = (codeText) => {
    if (!statusElement) return;
    const validationResult = validateCodeText(fieldOptions.language, codeText);
    statusElement.textContent = validationResult.valid ? '' : validationResult.message;
    fieldElement.setAttribute('data-db-code-valid', validationResult.valid ? 'true' : 'false');
  };
  const codeSurface = createCodeSurface(editor, surfaceHost, {
    language: fieldOptions.language,
    value: fieldOptions.value,
    label: fieldOptions.label,
    rows: fieldOptions.rows,
    onChange: (codeText) => {
      reportStatus(codeText);
      if (fieldOptions.onChange) fieldOptions.onChange(codeText);
    },
  });
  reportStatus(fieldOptions.value || '');
  const snippetSelect = fieldElement.querySelector('[data-db-code-snippets]');
  if (snippetSelect) {
    snippetSelect.addEventListener('change', () => {
      const snippetRecords = getCodeSnippetRecords()[fieldOptions.language] || [];
      const chosenRecord = snippetRecords.find((snippetRecord) => snippetRecord.id === snippetSelect.value);
      snippetSelect.value = '';
      if (chosenRecord) codeSurface.insertAtCursor(chosenRecord.code);
    });
  }
  const expandButton = fieldElement.querySelector('[data-db-code-expand]');
  if (expandButton) {
    expandButton.addEventListener('click', () => {
      const isExpanded = fieldElement.getAttribute('data-db-code-expanded') === 'true';
      fieldElement.setAttribute('data-db-code-expanded', isExpanded ? 'false' : 'true');
      expandButton.setAttribute('aria-pressed', isExpanded ? 'false' : 'true');
      codeSurface.refresh();
    });
  }
  return codeSurface;
};

export default mountCodeField;
