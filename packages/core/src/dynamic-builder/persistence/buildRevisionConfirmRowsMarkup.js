import escapeHtmlText from '../support/escapeHtmlText.js';

const buildConfirmRow = (confirmKind, promptText, confirmLabel, cancelLabel, labelText) =>
  [
    '<div class="gjs-db-button-row gjs-db-revision-confirm" data-db-revision-confirm="' + confirmKind + '"',
    ' role="group" aria-label="' + escapeHtmlText(confirmKind + ' ' + labelText) + '" hidden>',
    '<span class="gjs-db-muted">' + escapeHtmlText(promptText) + '</span>',
    '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-revision-action="confirm-' +
      confirmKind +
      '">' +
      escapeHtmlText(confirmLabel) +
      '</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-action="cancel-' +
      confirmKind +
      '">' +
      escapeHtmlText(cancelLabel) +
      '</button>',
    '</div>',
  ].join('');

const buildRevisionConfirmRowsMarkup = (revisionRecord) => {
  const labelText = String(revisionRecord.label || revisionRecord.id || '');
  const restorePrompt =
    'Replace the current site with this ' +
    (revisionRecord.kind === 'draft' ? 'draft' : 'revision') +
    '? A safety copy of the current site will be kept.';
  const rows = [buildConfirmRow('restore', restorePrompt, 'Restore now', 'Keep current', labelText)];
  if (revisionRecord.kind !== 'draft') {
    rows.push(
      buildConfirmRow(
        'delete',
        'Delete this revision permanently? This cannot be undone.',
        'Delete now',
        'Keep revision',
        labelText,
      ),
    );
  }
  return rows.join('');
};

export default buildRevisionConfirmRowsMarkup;
