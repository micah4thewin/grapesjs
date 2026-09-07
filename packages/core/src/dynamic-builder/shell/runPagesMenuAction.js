import deleteSitePage from './deleteSitePage.js';
import duplicateSitePage from './duplicateSitePage.js';
import openPageSettingsForPage from './openPageSettingsForPage.js';
import renameSitePage from './renameSitePage.js';
import setSitePageAsHome from './setSitePageAsHome.js';

const runPagesMenuAction = (editor, actionName, pageId) => {
  const actionRunners = {
    select: () => editor.Pages.select(pageId),
    rename: () => renameSitePage(editor, pageId),
    duplicate: () => duplicateSitePage(editor, pageId),
    settings: () => openPageSettingsForPage(editor, pageId),
    'set-home': () => setSitePageAsHome(editor, pageId),
    delete: () => deleteSitePage(editor, pageId),
    add: () => editor.runCommand('db:add-page'),
  };
  const runAction = actionRunners[actionName];
  if (runAction) runAction();
};

export default runPagesMenuAction;
