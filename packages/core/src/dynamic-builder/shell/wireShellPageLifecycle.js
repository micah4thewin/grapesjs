import ensureMainPageName from './ensureMainPageName.js';
import insertSharedSymbolsOnNewPage from './insertSharedSymbolsOnNewPage.js';
import rememberSelectedPage from './rememberSelectedPage.js';

const wireShellPageLifecycle = (editor) => {
  ensureMainPageName(editor);
  editor.on('db:project:restored', () => ensureMainPageName(editor));
  editor.on('db:revision:restored', () => ensureMainPageName(editor));
  editor.on('db:page:added', (addedPayload) => {
    const addedPage = addedPayload && addedPayload.page;
    addedPage && insertSharedSymbolsOnNewPage(editor, addedPage);
  });
  rememberSelectedPage(editor);
};

export default wireShellPageLifecycle;
