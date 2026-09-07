import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildAccordionItemInnerMarkup = (itemTitleText, panelBodyText, headingLevel) => {
  const headingTag = /^[2-6]$/.test(String(headingLevel || '')) ? 'h' + headingLevel : 'h3';
  return (
    `<${headingTag} class="db-accordion-header">` +
    '<button type="button" class="db-accordion-trigger" data-db-accordion-trigger="true" aria-expanded="false">' +
    `<span class="db-accordion-title">${escapeHtmlText(itemTitleText)}</span>` +
    `<span class="db-accordion-chevron">${getIconMarkup('chevronDown', { size: 18 })}</span>` +
    '</button>' +
    `</${headingTag}>` +
    '<div class="db-accordion-panel" data-db-accordion-panel="true" role="region" hidden="hidden">' +
    `<p>${escapeHtmlText(panelBodyText)}</p>` +
    '</div>'
  );
};

export default buildAccordionItemInnerMarkup;
