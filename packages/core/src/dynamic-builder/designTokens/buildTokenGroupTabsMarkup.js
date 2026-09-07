import escapeHtmlText from '../support/escapeHtmlText.js';
import getTokenGroupLabel from './getTokenGroupLabel.js';

const buildTokenGroupTabsMarkup = (groupKeys, activeGroupKey) => {
  const tabsMarkup = (groupKeys || [])
    .map((groupKey) => {
      const safeGroup = escapeHtmlText(groupKey);
      const isActive = groupKey === activeGroupKey;
      return [
        `<button type="button" role="tab" class="gjs-db-token-tab" id="db-token-tab-${safeGroup}"`,
        ` aria-selected="${isActive ? 'true' : 'false'}" aria-controls="db-token-panel-${safeGroup}"`,
        ` tabindex="${isActive ? '0' : '-1'}" data-db-token-tab="${safeGroup}">`,
        escapeHtmlText(getTokenGroupLabel(groupKey)),
        '</button>',
      ].join('');
    })
    .join('');
  return `<div class="gjs-db-token-tabs" role="tablist" aria-label="Token groups">${tabsMarkup}</div>`;
};

export default buildTokenGroupTabsMarkup;
