import isEditorLive from '../support/isEditorLive.js';
import resolveWorkspaceSizeName from './resolveWorkspaceSizeName.js';

const wireWorkspaceSize = (editor, workspaceElement) => {
  const applySizeName = () => {
    if (!isEditorLive(editor) || !workspaceElement.isConnected) return;
    const nextSizeName = resolveWorkspaceSizeName(workspaceElement.clientWidth || 1280);
    if (workspaceElement.getAttribute('data-db-size') === nextSizeName) return;
    workspaceElement.setAttribute('data-db-size', nextSizeName);
    const isPhone = nextSizeName === 'xs';
    workspaceElement.setAttribute('data-db-inspector-open', isPhone ? '0' : '1');
    if (isPhone) workspaceElement.setAttribute('data-db-dock-open', '0');
    if (editor.refresh) setTimeout(() => isEditorLive(editor) && editor.refresh(), 60);
  };
  const viewWindow = workspaceElement.ownerDocument.defaultView;
  let resizeObserver = null;
  if (viewWindow && typeof viewWindow.ResizeObserver === 'function') {
    resizeObserver = new viewWindow.ResizeObserver(applySizeName);
    resizeObserver.observe(workspaceElement);
  } else if (viewWindow) {
    viewWindow.addEventListener('resize', applySizeName);
  }
  editor.on('destroy', () => {
    resizeObserver && resizeObserver.disconnect();
    viewWindow && viewWindow.removeEventListener('resize', applySizeName);
  });
  applySizeName();
};

export default wireWorkspaceSize;
