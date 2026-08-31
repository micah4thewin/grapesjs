import escapeHtmlText from '../support/escapeHtmlText.js';

const buildShortcutHelpMarkup = (shortcutGroups) => {
  const groupsMarkup = shortcutGroups
    .map((groupRecord) => {
      const entriesMarkup = groupRecord.entries
        .map((entryRecord) =>
          [
            `<dt style="margin: 0"><span class="gjs-db-badge">${escapeHtmlText(entryRecord.keysText)}</span></dt>`,
            `<dd style="margin: 0" class="gjs-db-muted">${escapeHtmlText(entryRecord.labelText)}</dd>`,
          ].join(''),
        )
        .join('');
      return [
        `<h3 class="gjs-db-section-title">${escapeHtmlText(groupRecord.groupTitle)}</h3>`,
        `<dl class="gjs-db-grid-two" style="margin: 0">${entriesMarkup}</dl>`,
      ].join('');
    })
    .join('');
  return `<div class="gjs-db-report" data-db-shortcut-help>${groupsMarkup}</div>`;
};

export default buildShortcutHelpMarkup;
