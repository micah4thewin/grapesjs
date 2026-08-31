import readRevisionList from './readRevisionList.js';
import writeRevisionList from './writeRevisionList.js';

const deleteRevisionRecord = (editor, moduleOptions, revisionId) => {
  const remainingRevisionList = readRevisionList(moduleOptions).filter(
    (revisionRecord) => revisionRecord.id !== revisionId,
  );
  writeRevisionList(editor, moduleOptions, remainingRevisionList);
  return remainingRevisionList;
};

export default deleteRevisionRecord;
