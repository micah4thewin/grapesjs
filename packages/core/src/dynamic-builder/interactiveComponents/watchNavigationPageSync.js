import resyncAutoNavigation from './resyncAutoNavigation.js';

const watchNavigationPageSync = (editor) => {
  let syncTimer = null;
  const scheduleSync = () => {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      syncTimer = null;
      resyncAutoNavigation(editor);
    }, 40);
  };
  editor.on('page:add', scheduleSync);
  editor.on('page:remove', scheduleSync);
  editor.on('page:update', scheduleSync);
};

export default watchNavigationPageSync;
