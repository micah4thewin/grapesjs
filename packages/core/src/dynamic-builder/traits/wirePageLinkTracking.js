import refreshTrackedPageLinks from './refreshTrackedPageLinks.js';

const wirePageLinkTracking = (editor) => {
  let refreshTimer = null;
  const scheduleRefresh = () => {
    if (refreshTimer) return;
    refreshTimer = setTimeout(() => {
      refreshTimer = null;
      refreshTrackedPageLinks(editor);
    }, 0);
  };
  ['page', 'page:update', 'page:remove', 'page:add'].forEach((eventName) => editor.on(eventName, scheduleRefresh));
  editor.on('destroy', () => refreshTimer && clearTimeout(refreshTimer));
};

export default wirePageLinkTracking;
