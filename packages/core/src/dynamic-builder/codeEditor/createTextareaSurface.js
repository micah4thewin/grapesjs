import resolveCodeLanguageRecord from './resolveCodeLanguageRecord.js';

const insertTextAtSelection = (textareaElement, insertedText) => {
  const selectionStart = textareaElement.selectionStart || 0;
  const selectionEnd = textareaElement.selectionEnd || 0;
  const currentValue = textareaElement.value;
  textareaElement.value = currentValue.slice(0, selectionStart) + insertedText + currentValue.slice(selectionEnd);
  const nextCaret = selectionStart + insertedText.length;
  textareaElement.setSelectionRange(nextCaret, nextCaret);
};

const createTextareaSurface = (hostElement, surfaceOptions) => {
  const ownerDocument = hostElement.ownerDocument;
  const languageRecord = resolveCodeLanguageRecord(surfaceOptions.language);
  const indentText = ' '.repeat(languageRecord.indentUnit);
  const textareaElement = ownerDocument.createElement('textarea');
  textareaElement.className = 'gjs-db-field-input gjs-db-code-textarea';
  textareaElement.setAttribute('spellcheck', 'false');
  textareaElement.setAttribute('rows', String(surfaceOptions.rows || 10));
  textareaElement.setAttribute('aria-label', surfaceOptions.label || languageRecord.label + ' code');
  textareaElement.value = String(surfaceOptions.value || '');
  hostElement.appendChild(textareaElement);
  let tabIndents = true;
  textareaElement.addEventListener('input', () => surfaceOptions.onChange(textareaElement.value));
  textareaElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key === 'Escape') {
      tabIndents = false;
      return;
    }
    if (keyEvent.key !== 'Tab' || !tabIndents) return;
    keyEvent.preventDefault();
    insertTextAtSelection(textareaElement, indentText);
    surfaceOptions.onChange(textareaElement.value);
  });
  textareaElement.addEventListener('focus', () => {
    tabIndents = true;
  });
  return {
    getValue: () => textareaElement.value,
    setValue: (nextValue) => {
      textareaElement.value = String(nextValue || '');
    },
    insertAtCursor: (snippetText) => {
      insertTextAtSelection(textareaElement, String(snippetText || ''));
      textareaElement.focus();
      surfaceOptions.onChange(textareaElement.value);
    },
    focus: () => textareaElement.focus(),
    refresh: () => undefined,
  };
};

export default createTextareaSurface;
