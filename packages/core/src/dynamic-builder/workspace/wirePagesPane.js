import buildPagesPaneMarkup from './buildPagesPaneMarkup.js';
import isEditorLive from '../support/isEditorLive.js';

const wirePagesPane = (editor, workspaceElement) => {
  const paneElement = workspaceElement.querySelector('[data-db-dock-pane="pages"]');
  if (!paneElement) return;
  const renderPages = () => {
    if (!isEditorLive(editor) || !paneElement.isConnected) return;
    paneElement.innerHTML = buildPagesPaneMarkup(editor);
  };
  paneElement.addEventListener('click', (clickEvent) => {
    const closest = clickEvent.target.closest && clickEvent.target.closest.bind(clickEvent.target);
    if (!closest) return;
    const pageButton = closest('[data-db-page-id]');
    if (pageButton) {
      editor.Pages.select(pageButton.getAttribute('data-db-page-id'));
      return;
    }
    const commandButton = closest('[data-db-page-command]');
    if (commandButton) editor.runCommand(commandButton.getAttribute('data-db-page-command'));
  });
  editor.on('page:add page:remove page:select page:update', () => setTimeout(renderPages, 0));
  renderPages();
};

export default wirePagesPane;
