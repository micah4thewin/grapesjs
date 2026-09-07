import buildToolsMenuItemMarkup from './buildToolsMenuItemMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildToolsMenuSectionMarkup = (sectionRecord, labelRecords) => {
  const safeTitle = escapeHtmlText(sectionRecord.sectionTitle);
  const itemsMarkup = sectionRecord.commandIds
    .map((commandId) => buildToolsMenuItemMarkup(commandId, labelRecords))
    .join('');
  return [
    '<div class="gjs-db-menu-separator" role="separator"></div>',
    `<div class="gjs-db-menu-section" role="group" aria-label="${safeTitle}">`,
    `<div class="gjs-db-menu-section-title" aria-hidden="true">${safeTitle}</div>`,
    itemsMarkup,
    '</div>',
  ].join('');
};

export default buildToolsMenuSectionMarkup;
