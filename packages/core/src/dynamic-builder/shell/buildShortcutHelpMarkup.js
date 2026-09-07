import buildKeyChipsMarkup from './buildKeyChipsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildShortcutHelpMarkup = (shortcutGroups) => {
  const groupsMarkup = shortcutGroups
    .map((groupRecord) => {
      const entriesMarkup = groupRecord.entries
        .map((entryRecord) =>
          [
            `<dt class="gjs-db-shortcut-keys">${buildKeyChipsMarkup(entryRecord.keysText)}</dt>`,
            `<dd class="gjs-db-shortcut-label">${escapeHtmlText(entryRecord.labelText)}</dd>`,
          ].join(''),
        )
        .join('');
      const noteMarkup = groupRecord.noteText
        ? `<p class="gjs-db-shortcut-note">${escapeHtmlText(groupRecord.noteText)}</p>`
        : '';
      return [
        `<h3 class="gjs-db-section-title">${escapeHtmlText(groupRecord.groupTitle)}</h3>`,
        `<dl class="gjs-db-shortcut-list">${entriesMarkup}</dl>`,
        noteMarkup,
      ].join('');
    })
    .join('');
  return `<div class="gjs-db-report" data-db-shortcut-help>${groupsMarkup}</div>`;
};

export default buildShortcutHelpMarkup;
