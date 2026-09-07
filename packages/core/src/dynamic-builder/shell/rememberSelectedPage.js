import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const rememberSelectedPage = (editor) => {
  const readStoredPageId = () => {
    const shellRecord = getSiteMetaRecord(editor).shell;
    return isPlainRecord(shellRecord) ? String(shellRecord.lastPageId || '') : '';
  };
  const restoreStoredPage = () => {
    const storedPage = editor.Pages.get(readStoredPageId());
    if (storedPage && editor.Pages.getSelected() !== storedPage) editor.Pages.select(storedPage);
  };
  editor.on('page:select', (selectedPage) => {
    const selectedId = selectedPage && selectedPage.getId ? String(selectedPage.getId()) : '';
    if (!selectedId || selectedId === readStoredPageId()) return;
    updateSiteMetaRecord(editor, { shell: { lastPageId: selectedId } });
  });
  editor.on('db:project:restored', restoreStoredPage);
};

export default rememberSelectedPage;
