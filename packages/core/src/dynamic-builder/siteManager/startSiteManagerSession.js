import adoptCurrentProjectAsSite from './adoptCurrentProjectAsSite.js';
import isEditorLive from '../support/isEditorLive.js';
import openSiteManagerModal from './openSiteManagerModal.js';
import restoreLastOpenedSite from './restoreLastOpenedSite.js';

const finishSessionStart = (editor, managerOptions, siteRecord, wasAdopted) => {
  if (!isEditorLive(editor)) return null;
  if (managerOptions.openOnStart) openSiteManagerModal(editor, managerOptions);
  editor.trigger('db:site:ready', { site: siteRecord || null, adopted: wasAdopted });
  return siteRecord || null;
};

const startSiteManagerSession = (editor, managerOptions) => {
  if (!editor.onReady) return false;
  editor.onReady(() => {
    if (!isEditorLive(editor)) return;
    managerOptions.storageAdapter.listSites().then((siteRecords) => {
      if (!isEditorLive(editor)) return null;
      const hasSites = siteRecords.length > 0;
      const startPromise = hasSites
        ? restoreLastOpenedSite(editor, managerOptions, siteRecords)
        : adoptCurrentProjectAsSite(editor, managerOptions);
      return startPromise.then((siteRecord) => finishSessionStart(editor, managerOptions, siteRecord, !hasSites));
    });
  });
  return true;
};

export default startSiteManagerSession;
