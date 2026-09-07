import escapeHtmlText from '../support/escapeHtmlText.js';
import getSaveStatusTexts from './getSaveStatusTexts.js';

const buildSaveStatusMarkup = () => {
  const idleTexts = getSaveStatusTexts('idle', '', '');
  return [
    '<button type="button" class="gjs-db-status gjs-db-status-button" data-db-save-status data-db-state="idle"',
    ` data-db-command="db:open-revisions" title="${escapeHtmlText(idleTexts.title)}"`,
    ` aria-label="${escapeHtmlText(`${idleTexts.label}. ${idleTexts.title}`)}">`,
    `<span class="gjs-db-status-dot" aria-hidden="true"></span><span data-db-save-status-text>${idleTexts.label}</span>`,
    '</button>',
    '<span class="gjs-db-visually-hidden" data-db-save-announcer role="status" aria-live="polite"></span>',
  ].join('');
};

export default buildSaveStatusMarkup;
