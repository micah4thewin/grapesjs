import getSiteMetaRecord from '../support/getSiteMetaRecord.js';

const buildProjectSnapshot = (editor) => ({
  projectData: editor.getProjectData(),
  siteMeta: getSiteMetaRecord(editor),
  savedAt: new Date().toISOString(),
});

export default buildProjectSnapshot;
