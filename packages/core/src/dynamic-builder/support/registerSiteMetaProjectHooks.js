import deepMergeRecords from './deepMergeRecords.js';
import getSiteMetaRecord from './getSiteMetaRecord.js';
import isPlainRecord from './isPlainRecord.js';
import replaceSiteMetaRecord from './replaceSiteMetaRecord.js';

const registerSiteMetaProjectHooks = (editor) => {
  const editorModel = editor.getModel();
  if (editorModel.get('dbSiteMetaProjectHooks')) return;
  editorModel.set('dbSiteMetaProjectHooks', true);
  editor.on('project:get', (eventData) => {
    const projectRecord = eventData && eventData.project;
    if (!isPlainRecord(projectRecord)) return;
    projectRecord.dbSiteMeta = deepMergeRecords({}, getSiteMetaRecord(editor));
  });
  editor.on('project:load', (eventData) => {
    const projectRecord = eventData && eventData.project;
    if (!isPlainRecord(projectRecord) || !isPlainRecord(projectRecord.dbSiteMeta)) return;
    replaceSiteMetaRecord(editor, projectRecord.dbSiteMeta, { silent: true });
  });
};

export default registerSiteMetaProjectHooks;
