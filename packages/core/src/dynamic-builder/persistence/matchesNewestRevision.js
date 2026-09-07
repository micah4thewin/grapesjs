import buildProjectSnapshot from './buildProjectSnapshot.js';
import readRevisionList from './readRevisionList.js';
import sortRevisionsNewestFirst from './sortRevisionsNewestFirst.js';

const matchesNewestRevision = (editor, moduleOptions) => {
  const newestRecord = sortRevisionsNewestFirst(readRevisionList(moduleOptions))[0];
  if (!newestRecord || !newestRecord.isRestorable) return false;
  try {
    const currentText = JSON.stringify(buildProjectSnapshot(editor).projectData);
    return currentText === JSON.stringify(newestRecord.payload.projectData);
  } catch (serializeError) {
    return false;
  }
};

export default matchesNewestRevision;
