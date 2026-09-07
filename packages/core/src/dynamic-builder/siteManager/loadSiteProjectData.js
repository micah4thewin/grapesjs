import buildStarterSiteProjectData from './buildStarterSiteProjectData.js';
import isPlainRecord from '../support/isPlainRecord.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';
import resetUndoHistory from '../persistence/resetUndoHistory.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const loadSiteProjectData = (editor, siteRecord, projectSnapshot) => {
  const snapshotRecord = isPlainRecord(projectSnapshot) ? projectSnapshot : null;
  const projectData = snapshotRecord && isPlainRecord(snapshotRecord.projectData) ? snapshotRecord.projectData : null;
  try {
    editor.loadProjectData(projectData || buildStarterSiteProjectData(siteRecord));
  } catch (loadError) {
    console.error(loadError);
    return false;
  }
  if (projectData) {
    if (isPlainRecord(snapshotRecord.siteMeta))
      replaceSiteMetaRecord(editor, snapshotRecord.siteMeta, { silent: true });
  } else {
    replaceSiteMetaRecord(editor, {}, { silent: true });
    updateSiteMetaRecord(editor, { seo: { siteName: siteRecord.name }, identity: { siteName: siteRecord.name } });
  }
  resetUndoHistory(editor);
  return true;
};

export default loadSiteProjectData;
