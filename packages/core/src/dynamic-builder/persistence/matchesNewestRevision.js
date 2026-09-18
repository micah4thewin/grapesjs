import buildProjectSnapshot from './buildProjectSnapshot.js';
import dehydratePayloadAssets from './dehydratePayloadAssets.js';
import readRevisionList from './readRevisionList.js';
import sortRevisionsNewestFirst from './sortRevisionsNewestFirst.js';

const matchesNewestRevision = (editor, moduleOptions) => {
  const newestRecord = sortRevisionsNewestFirst(readRevisionList(editor, moduleOptions))[0];
  if (!newestRecord || !newestRecord.isRestorable) return false;
  try {
    // The stored payload holds pool tokens where the live project holds data
    // URIs, so the current project is reduced the same way before comparing.
    const currentPayload = dehydratePayloadAssets(buildProjectSnapshot(editor).projectData).payload;
    return JSON.stringify(currentPayload) === JSON.stringify(newestRecord.payload.projectData);
  } catch (serializeError) {
    return false;
  }
};

export default matchesNewestRevision;
