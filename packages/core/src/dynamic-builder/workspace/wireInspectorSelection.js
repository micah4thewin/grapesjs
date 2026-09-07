import isEditorLive from '../support/isEditorLive.js';
import orderInspectorTraitGroups from './orderInspectorTraitGroups.js';
import resolveComponentDisplayName from './resolveComponentDisplayName.js';

const wireInspectorSelection = (editor, workspaceElement) => {
  const inspectorElement = workspaceElement.querySelector('[data-db-inspector]');
  const titleElement = workspaceElement.querySelector('[data-db-inspector-title]');
  const eyebrowElement = workspaceElement.querySelector('[data-db-inspector-eyebrow]');
  const refreshInspectorHeader = () => {
    if (!isEditorLive(editor) || !inspectorElement || !inspectorElement.isConnected) return;
    const selectedComponent = editor.getSelected ? editor.getSelected() : null;
    inspectorElement.setAttribute('data-db-has-selection', selectedComponent ? '1' : '0');
    if (titleElement) {
      titleElement.textContent = selectedComponent
        ? resolveComponentDisplayName(selectedComponent)
        : 'Pick something on the page';
    }
    if (eyebrowElement) eyebrowElement.textContent = selectedComponent ? 'Selected' : 'Nothing selected';
    orderInspectorTraitGroups(selectedComponent);
  };
  editor.on('component:selected component:deselected', () => setTimeout(refreshInspectorHeader, 0));
  editor.on('component:update:name', refreshInspectorHeader);
  refreshInspectorHeader();
};

export default wireInspectorSelection;
