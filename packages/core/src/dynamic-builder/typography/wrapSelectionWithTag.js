import escapeHtmlText from '../support/escapeHtmlText.js';

const wrapSelectionWithTag = (richTextEditor, tagName) => {
  const currentSelection = richTextEditor && richTextEditor.selection && richTextEditor.selection();
  const selectedText = currentSelection ? String(currentSelection) : '';
  if (!selectedText) return;
  richTextEditor.insertHTML(`<${tagName}>${escapeHtmlText(selectedText)}</${tagName}>`);
};

export default wrapSelectionWithTag;
