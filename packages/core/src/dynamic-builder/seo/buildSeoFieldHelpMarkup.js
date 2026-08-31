import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoFieldHelpMarkup = (helpText) => '<span class="gjs-db-field-help">' + escapeHtmlText(helpText) + '</span>';

export default buildSeoFieldHelpMarkup;
