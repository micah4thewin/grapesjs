import getInspectorGroupRecords from './getInspectorGroupRecords.js';
import readShellPreference from '../shell/readShellPreference.js';
import writeShellPreference from '../shell/writeShellPreference.js';

const wireInspectorGroups = (editor, workspaceElement, pluginOptions) => {
  const setGroupState = (groupElement, isOpen) => {
    groupElement.setAttribute('data-db-open', isOpen ? '1' : '0');
    const headElement = groupElement.querySelector('[data-db-group-toggle]');
    if (headElement) headElement.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };
  getInspectorGroupRecords().forEach((groupRecord) => {
    const groupElement = workspaceElement.querySelector(`[data-db-inspector-group="${groupRecord.id}"]`);
    if (!groupElement) return;
    setGroupState(groupElement, readShellPreference(editor, pluginOptions, `ws-group-${groupRecord.id}`) !== '0');
  });
  workspaceElement.addEventListener('click', (clickEvent) => {
    const toggleButton = clickEvent.target.closest && clickEvent.target.closest('[data-db-group-toggle]');
    if (!toggleButton || !workspaceElement.contains(toggleButton)) return;
    const groupId = toggleButton.getAttribute('data-db-group-toggle');
    const groupElement = workspaceElement.querySelector(`[data-db-inspector-group="${groupId}"]`);
    if (!groupElement) return;
    const nextOpen = groupElement.getAttribute('data-db-open') !== '1';
    setGroupState(groupElement, nextOpen);
    writeShellPreference(editor, pluginOptions, `ws-group-${groupId}`, nextOpen ? '1' : '0');
  });
};

export default wireInspectorGroups;
