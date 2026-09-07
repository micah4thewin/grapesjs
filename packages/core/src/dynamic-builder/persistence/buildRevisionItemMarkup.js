import buildRevisionBadgesMarkup from './buildRevisionBadgesMarkup.js';
import buildRevisionConfirmRowsMarkup from './buildRevisionConfirmRowsMarkup.js';
import buildRevisionMetaText from './buildRevisionMetaText.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import formatRevisionTimestamp from './formatRevisionTimestamp.js';

const buildRevisionItemMarkup = (revisionRecord, nowValue) => {
  const safeRevisionId = escapeHtmlText(revisionRecord.id);
  const safeRevisionLabel = escapeHtmlText(revisionRecord.label || revisionRecord.id);
  const timestampRecord = formatRevisionTimestamp(revisionRecord.savedAt, nowValue);
  const metaText = buildRevisionMetaText(revisionRecord);
  const isRestorable = revisionRecord.isRestorable !== false;
  const restoreAttributes = isRestorable ? '' : ' disabled aria-disabled="true"';
  const deleteButton =
    revisionRecord.kind === 'draft'
      ? ''
      : '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-revision-action="delete">' +
        'Delete</button>';
  return [
    '<li class="gjs-db-list-item gjs-db-revision-item" data-db-revision-id="' +
      safeRevisionId +
      '" data-db-revision-kind="' +
      escapeHtmlText(revisionRecord.kind || 'manual') +
      '">',
    '<div class="gjs-db-revision-summary">',
    '<span class="gjs-db-revision-label">' + safeRevisionLabel + buildRevisionBadgesMarkup(revisionRecord) + '</span>',
    '<time class="gjs-db-muted" title="' +
      escapeHtmlText(timestampRecord.fullText) +
      '" datetime="' +
      escapeHtmlText(revisionRecord.savedAt || '') +
      '">' +
      escapeHtmlText(timestampRecord.relativeText) +
      '</time>',
    '</div>',
    metaText ? '<div class="gjs-db-muted gjs-db-revision-meta">' + escapeHtmlText(metaText) + '</div>' : '',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-revision-action="restore"' +
      restoreAttributes +
      '>Restore</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-action="download">Download</button>',
    deleteButton,
    '</div>',
    buildRevisionConfirmRowsMarkup(revisionRecord),
    '</li>',
  ].join('');
};

export default buildRevisionItemMarkup;
