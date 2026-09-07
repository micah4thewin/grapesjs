import escapeHtmlText from '../support/escapeHtmlText.js';
import readComponentPlainText from '../support/readComponentPlainText.js';

const syncTextComponentContent = (textComponent, nextText) => {
  if (!textComponent || !textComponent.components) return;
  const cleanText = String(nextText == null ? '' : nextText)
    .replace(/\s+/g, ' ')
    .trim();
  if (readComponentPlainText(textComponent) === cleanText) return;
  textComponent.components(escapeHtmlText(cleanText));
};

export default syncTextComponentContent;
