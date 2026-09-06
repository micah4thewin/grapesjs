import escapeHtmlText from '../support/escapeHtmlText.js';
import formatRevisionTimestamp from './formatRevisionTimestamp.js';

const buildRevisionItemMarkup = (revisionRecord) => {
  const safeRevisionId = escapeHtmlText(revisionRecord.id);
  const safeRevisionLabel = escapeHtmlText(revisionRecord.label || revisionRecord.id);
  const safeSavedTime = escapeHtmlText(formatRevisionTimestamp(revisionRecord.savedAt));
  return [
    '<li class="gjs-db-list-item gjs-db-revision-item" data-db-revision-id="' + safeRevisionId + '">',
    '<div class="gjs-db-revision-summary">',
    '<span class="gjs-db-revision-label">' + safeRevisionLabel + '</span>',
    '<span class="gjs-db-muted">' + safeSavedTime + '</span>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-revision-action="restore">Restore</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-action="download">Download</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-revision-action="delete">Delete</button>',
    '</div>',
    '<div class="gjs-db-button-row gjs-db-revision-confirm" data-db-revision-confirm="restore" hidden>',
    '<span class="gjs-db-muted">Restore this revision? Unsaved changes will be replaced.</span>',
    '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-revision-action="confirm-restore">',
    'Confirm restore</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-action="cancel-restore">Keep current</button>',
    '</div>',
    '<div class="gjs-db-button-row gjs-db-revision-confirm" data-db-revision-confirm="delete" hidden>',
    '<span class="gjs-db-muted">Delete this revision permanently? This cannot be undone.</span>',
    '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-revision-action="confirm-delete">',
    'Confirm delete</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-action="cancel-delete">Keep revision</button>',
    '</div>',
    '</li>',
  ].join('');
};

export default buildRevisionItemMarkup;
