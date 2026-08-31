const sortRevisionsNewestFirst = (revisionList) =>
  revisionList
    .slice()
    .sort((firstRevision, secondRevision) =>
      String(secondRevision.savedAt || '').localeCompare(String(firstRevision.savedAt || '')),
    );

export default sortRevisionsNewestFirst;
