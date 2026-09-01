import closeShellMenus from './closeShellMenus.js';
import deleteSitePage from './deleteSitePage.js';
import renameSitePage from './renameSitePage.js';

const wirePagesMenuActions = (editor, stripElement) => {
  stripElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const actionElement = targetElement.closest('[data-db-page-action]');
    if (!actionElement || !stripElement.contains(actionElement)) return;
    const actionName = actionElement.getAttribute('data-db-page-action');
    const pageId = actionElement.getAttribute('data-db-page-id') || '';
    closeShellMenus(stripElement);
    if (actionName === 'select') editor.Pages.select(pageId);
    else if (actionName === 'rename') renameSitePage(editor, pageId);
    else if (actionName === 'delete') deleteSitePage(editor, pageId);
    else if (actionName === 'add') editor.runCommand('db:add-page');
  });
};

export default wirePagesMenuActions;
