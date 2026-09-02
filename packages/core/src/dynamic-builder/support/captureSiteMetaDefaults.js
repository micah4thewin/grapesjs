import deepMergeRecords from './deepMergeRecords.js';
import getSiteMetaRecord from './getSiteMetaRecord.js';

const captureSiteMetaDefaults = (editor) => {
  const editorModel = editor.getModel();
  const defaultsRecord = deepMergeRecords({}, getSiteMetaRecord(editor));
  editorModel.set('dbSiteMetaDefaults', defaultsRecord);
  return defaultsRecord;
};

export default captureSiteMetaDefaults;
