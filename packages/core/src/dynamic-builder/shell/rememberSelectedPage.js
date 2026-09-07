import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isEditorLive from '../support/isEditorLive.js';
import isPlainRecord from '../support/isPlainRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const rememberSelectedPage = (editor) => {
  let pendingWriteTimer = null;
  const readStoredPageId = () => {
    const shellRecord = getSiteMetaRecord(editor).shell;
    return isPlainRecord(shellRecord) ? String(shellRecord.lastPageId || '') : '';
  };
  const cancelPendingWrite = () => {
    pendingWriteTimer && clearTimeout(pendingWriteTimer);
    pendingWriteTimer = null;
  };
  const restoreStoredPage = () => {
    cancelPendingWrite();
    const storedPage = editor.Pages.get(readStoredPageId());
    if (storedPage && editor.Pages.getSelected() !== storedPage) editor.Pages.select(storedPage);
  };
  editor.on('page:select', (selectedPage) => {
    const selectedId = selectedPage && selectedPage.getId ? String(selectedPage.getId()) : '';
    cancelPendingWrite();
    if (!selectedId || selectedId === readStoredPageId()) return;
    pendingWriteTimer = setTimeout(() => {
      pendingWriteTimer = null;
      if (!isEditorLive(editor)) return;
      if (editor.Pages.get(selectedId)) updateSiteMetaRecord(editor, { shell: { lastPageId: selectedId } });
    }, 150);
  });
  editor.on('db:project:restored', restoreStoredPage);
  editor.on('db:revision:restored', restoreStoredPage);
  editor.on('destroy', cancelPendingWrite);
};

export default rememberSelectedPage;
