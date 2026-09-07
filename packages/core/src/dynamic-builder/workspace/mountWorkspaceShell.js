import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildWorkspaceMarkup from './buildWorkspaceMarkup.js';
import prepareManagerPanels from './prepareManagerPanels.js';
import retryManagerPanelPlacement from './retryManagerPanelPlacement.js';

const mountWorkspaceShell = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  if (containerElement.querySelector('[data-db-workspace]')) return null;
  const editorElement = containerElement.querySelector('.gjs-editor');
  const canvasElement = containerElement.querySelector('.gjs-cv-canvas');
  if (!editorElement || !canvasElement) return null;
  prepareManagerPanels(editor);
  const workspaceElement = buildElementFromMarkup(containerElement.ownerDocument, buildWorkspaceMarkup(editor));
  if (!workspaceElement) return null;
  editorElement.appendChild(workspaceElement);
  const stageCanvasElement = workspaceElement.querySelector('[data-db-stage-canvas]');
  if (stageCanvasElement) stageCanvasElement.appendChild(canvasElement);
  retryManagerPanelPlacement(editor, workspaceElement);
  editor.on('destroy', () => workspaceElement.remove());
  return workspaceElement;
};

export default mountWorkspaceShell;
