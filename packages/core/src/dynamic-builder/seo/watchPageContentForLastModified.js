import stampPageUpdatedAt from './stampPageUpdatedAt.js';

const watchPageContentForLastModified = (editor) => {
  let pendingTimer = null;
  const scheduleStamp = () => {
    if (pendingTimer) clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => {
      pendingTimer = null;
      stampPageUpdatedAt(editor, null);
    }, 400);
  };
  editor.on('update', scheduleStamp);
  editor.on('destroy', () => pendingTimer && clearTimeout(pendingTimer));
};

export default watchPageContentForLastModified;
