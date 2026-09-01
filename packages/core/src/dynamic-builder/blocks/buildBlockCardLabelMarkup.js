import escapeHtmlText from '../support/escapeHtmlText.js';

const buildBlockCardLabelMarkup = (titleText, hintText) =>
  `${escapeHtmlText(titleText)}<span class="gjs-db-block-hint">${escapeHtmlText(hintText)}</span>`;

export default buildBlockCardLabelMarkup;
