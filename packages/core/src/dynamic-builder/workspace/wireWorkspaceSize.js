import isEditorLive from '../support/isEditorLive.js';
import resolveWorkspaceSizeName from './resolveWorkspaceSizeName.js';

const wireWorkspaceSize = (editor, workspaceElement) => {
  const applySizeName = () => {
    if (!isEditorLive(editor) || !workspaceElement.isConnected) return;
    const nextSizeName = resolveWorkspaceSizeName(workspaceElement.clientWidth || 1280);
    if (workspaceElement.getAttribute('data-db-size') === nextSizeName) return;
    const wasRoomy = ['lg', 'md'].indexOf(workspaceElement.getAttribute('data-db-size')) >= 0;
    workspaceElement.setAttribute('data-db-size', nextSizeName);
    const isRoomy = nextSizeName === 'lg' || nextSizeName === 'md';
    if (isRoomy !== wasRoomy) {
      workspaceElement.setAttribute('data-db-dock-open', isRoomy ? '1' : '0');
      workspaceElement.setAttribute('data-db-inspector-open', nextSizeName === 'xs' ? '0' : '1');
    }
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
