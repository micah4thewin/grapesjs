import escapeHtmlText from '../support/escapeHtmlText.js';
import getTemplateTabRecords from './getTemplateTabRecords.js';

const buildTemplateTabsMarkup = (fieldIdPrefix, activeTabId) => {
  const tabsMarkup = getTemplateTabRecords()
    .map((tabRecord) => {
      const isActive = tabRecord.tabId === activeTabId;
      return [
        '<button type="button" role="tab" class="gjs-db-template-tab"',
        ` id="${fieldIdPrefix}-tab-${escapeHtmlText(tabRecord.tabId)}"`,
        ` aria-controls="${fieldIdPrefix}-grid" aria-selected="${isActive ? 'true' : 'false'}"`,
        ` tabindex="${isActive ? '0' : '-1'}" data-db-template-tab="${escapeHtmlText(tabRecord.tabId)}">`,
        escapeHtmlText(tabRecord.label),
        '</button>',
      ].join('');
    })
    .join('');
  return `<div class="gjs-db-template-tabs" role="tablist" aria-label="Template kind">${tabsMarkup}</div>`;
};

export default buildTemplateTabsMarkup;
