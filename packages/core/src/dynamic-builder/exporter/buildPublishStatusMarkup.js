const buildPublishStatusMarkup = (preflightRecord) => {
  const errorCount = Number(preflightRecord.errorCount) || 0;
  const warningCount = Number(preflightRecord.warningCount) || 0;
  const pluralize = (count, singular, plural) => count + ' ' + (count === 1 ? singular : plural);
  if (errorCount > 0) {
    return [
      '<div class="gjs-db-export-status" data-db-export-status="error">',
      '<span class="gjs-db-badge gjs-db-badge-error">Needs attention</span>',
      '<span>' +
        pluralize(errorCount, 'problem was', 'problems were') +
        ' found. Fix them for the best result, or download anyway.</span>',
      '</div>',
    ].join('');
  }
  if (warningCount > 0) {
    return [
      '<div class="gjs-db-export-status" data-db-export-status="warning">',
      '<span class="gjs-db-badge gjs-db-badge-warning">Worth a look</span>',
      '<span>No blocking problems. ' +
        pluralize(warningCount, 'warning', 'warnings') +
        ' could improve the site before you publish.</span>',
      '</div>',
    ].join('');
  }
  return [
    '<div class="gjs-db-export-status" data-db-export-status="success">',
    '<span class="gjs-db-badge gjs-db-badge-success">All checks passed</span>',
    '<span>Ready to download.</span>',
    '</div>',
  ].join('');
};

export default buildPublishStatusMarkup;
