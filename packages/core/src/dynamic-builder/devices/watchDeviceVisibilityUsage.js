import registerDeviceVisibilityStyles from './registerDeviceVisibilityStyles.js';
import isEditorLive from '../support/isEditorLive.js';

const watchDeviceVisibilityUsage = (editor) => {
  let syncTimer = null;
  const syncNow = () => {
    syncTimer = null;
    if (!isEditorLive(editor)) return;
    registerDeviceVisibilityStyles(editor);
  };
  const scheduleSync = () => {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(syncNow, 80);
  };
  editor.on('component:update:classes component:add component:remove component:clone load page:select', scheduleSync);
  editor.on('db:device-visibility:change', syncNow);
  if (editor.onReady) editor.onReady(syncNow);
  else syncNow();
};

export default watchDeviceVisibilityUsage;
