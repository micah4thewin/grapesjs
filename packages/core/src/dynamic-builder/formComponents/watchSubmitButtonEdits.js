import escapeHtmlText from '../support/escapeHtmlText.js';
import isEditorLive from '../support/isEditorLive.js';
import readComponentPlainText from '../support/readComponentPlainText.js';

const watchSubmitButtonEdits = (editor) => {
  editor.on('rte:disable', (textView) => {
    const buttonComponent = textView && textView.model;
    if (!buttonComponent || !buttonComponent.is || !buttonComponent.is('db-submit-button')) return;
    setTimeout(() => {
      if (!isEditorLive(editor)) return;
      const hasMarkup = buttonComponent.components().models.some((childComponent) => !childComponent.is('textnode'));
      if (!hasMarkup) return;
      buttonComponent.components(escapeHtmlText(readComponentPlainText(buttonComponent) || 'Send'));
    }, 0);
  });
};

export default watchSubmitButtonEdits;
