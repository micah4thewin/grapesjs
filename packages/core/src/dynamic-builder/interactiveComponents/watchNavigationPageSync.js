import isEditorLive from '../support/isEditorLive.js';
import resyncAutoNavigation from './resyncAutoNavigation.js';

const watchNavigationPageSync = (editor) => {
  let syncTimer = null;
  const scheduleSync = () => {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      syncTimer = null;
      if (!isEditorLive(editor)) return;
      resyncAutoNavigation(editor);
    }, 40);
  };
  editor.on('page:add', scheduleSync);
  editor.on('page:remove', scheduleSync);
  editor.on('page:update', scheduleSync);
  editor.on('destroy', () => syncTimer && clearTimeout(syncTimer));
};

export default watchNavigationPageSync;
