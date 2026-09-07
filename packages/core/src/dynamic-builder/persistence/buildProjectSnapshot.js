import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import resolveEditorTabId from './resolveEditorTabId.js';

const buildProjectSnapshot = (editor) => ({
  projectData: editor.getProjectData(),
  siteMeta: getSiteMetaRecord(editor),
  savedAt: new Date().toISOString(),
  tabId: resolveEditorTabId(editor),
});

export default buildProjectSnapshot;
