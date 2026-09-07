import adoptCurrentProjectAsSite from './adoptCurrentProjectAsSite.js';
import isEditorLive from '../support/isEditorLive.js';
import openSiteManagerModal from './openSiteManagerModal.js';
import restoreLastOpenedSite from './restoreLastOpenedSite.js';

const shouldOpenOnStart = (managerOptions, siteCount, wasAdopted) =>
  managerOptions.openOnStart && !wasAdopted && siteCount > 1;

const finishSessionStart = (editor, managerOptions, siteRecord, wasAdopted, siteCount) => {
  if (!isEditorLive(editor)) return null;
  if (shouldOpenOnStart(managerOptions, siteCount, wasAdopted)) openSiteManagerModal(editor, managerOptions);
  editor.trigger('db:site:ready', { site: siteRecord || null, adopted: wasAdopted });
  return siteRecord || null;
};

const startSiteManagerSession = (editor, managerOptions) => {
  if (!editor.onReady) return false;
  editor.onReady(() => {
    if (!isEditorLive(editor)) return;
    managerOptions.storageAdapter
      .listSites()
      .then((siteRecords) => {
        if (!isEditorLive(editor)) return null;
        const hasSites = siteRecords.length > 0;
        const startPromise = hasSites
          ? restoreLastOpenedSite(editor, managerOptions, siteRecords)
          : adoptCurrentProjectAsSite(editor, managerOptions);
        return startPromise.then((siteRecord) =>
          finishSessionStart(editor, managerOptions, siteRecord, !hasSites, siteRecords.length),
        );
      })
      .catch((sessionError) => console.error(sessionError));
  });
  return true;
};

export default startSiteManagerSession;
