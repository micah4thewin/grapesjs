import runSeoHealthCheck from './runSeoHealthCheck.js';

const watchSeoHealthUpdates = (editor) => {
  let pendingTimer = null;
  const scheduleHealthCheck = () => {
    if (pendingTimer) clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => {
      pendingTimer = null;
      if (editor.Pages) runSeoHealthCheck(editor, null);
    }, 250);
  };
  editor.on('db:page-meta:update db:site-meta:update page:select db:seo:saved', scheduleHealthCheck);
  editor.on('destroy', () => pendingTimer && clearTimeout(pendingTimer));
};

export default watchSeoHealthUpdates;
