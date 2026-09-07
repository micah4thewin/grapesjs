const buildRevisionBadgesMarkup = (revisionRecord) => {
  const badgeParts = [];
  if (revisionRecord.kind === 'draft') badgeParts.push('<span class="gjs-db-badge">Autosave</span>');
  if (revisionRecord.kind === 'safety') badgeParts.push('<span class="gjs-db-badge">Safety copy</span>');
  if (revisionRecord.kind === 'import') badgeParts.push('<span class="gjs-db-badge">Imported</span>');
  if (revisionRecord.isRestorable === false) {
    badgeParts.push('<span class="gjs-db-badge gjs-db-badge-error">Not restorable</span>');
  }
  return badgeParts.join('');
};

export default buildRevisionBadgesMarkup;
