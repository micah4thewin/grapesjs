import findSiteRecordById from './findSiteRecordById.js';
import isEditorLive from '../support/isEditorLive.js';
import readCurrentSiteRecord from './readCurrentSiteRecord.js';
import setCurrentSiteRecord from './setCurrentSiteRecord.js';
import toSlugText from '../support/toSlugText.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const buildRenamedSiteRecord = (siteRecord, commandOptions) => {
  const nextName = String(commandOptions.name || '').trim() || siteRecord.name;
  const hasDescription = typeof commandOptions.description === 'string';
  return {
    ...siteRecord,
    name: nextName,
    slug: toSlugText(nextName) || siteRecord.slug,
    description: hasDescription ? commandOptions.description.trim() : siteRecord.description,
    updatedAt: new Date().toISOString(),
  };
};

const runRenameSiteCommand = (editor, managerOptions, commandOptions) =>
  managerOptions.storageAdapter.listSites().then((siteRecords) => {
    if (!isEditorLive(editor)) return null;
    const siteRecord = findSiteRecordById(siteRecords, commandOptions.siteId);
    if (!siteRecord) return null;
    const renamedRecord = buildRenamedSiteRecord(siteRecord, commandOptions);
    return managerOptions.storageAdapter.writeSite(renamedRecord).then(() => {
      if (!isEditorLive(editor)) return null;
      const currentRecord = readCurrentSiteRecord(editor);
      if (currentRecord && currentRecord.id === renamedRecord.id) {
        setCurrentSiteRecord(editor, managerOptions, renamedRecord);
        updateSiteMetaRecord(editor, {
          seo: { siteName: renamedRecord.name },
          identity: { siteName: renamedRecord.name },
        });
      }
      editor.trigger('db:site:rename', { site: renamedRecord });
      return renamedRecord;
    });
  });

export default runRenameSiteCommand;
