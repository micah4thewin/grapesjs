import readLocalDraftRecord from './readLocalDraftRecord.js';
import readRevisionList from './readRevisionList.js';
import sortRevisionsNewestFirst from './sortRevisionsNewestFirst.js';

const listRestorableRecords = (editor, moduleOptions) => {
  const draftRecord = readLocalDraftRecord(editor, moduleOptions);
  const revisionList = sortRevisionsNewestFirst(readRevisionList(moduleOptions));
  return draftRecord ? [draftRecord].concat(revisionList) : revisionList;
};

export default listRestorableRecords;
