import getEditorInstanceSuffix from './getEditorInstanceSuffix.js';
import getShellShortcutDefinitions from './getShellShortcutDefinitions.js';
import isShortcutEventForEditor from './isShortcutEventForEditor.js';
import matchShellShortcut from './matchShellShortcut.js';
import runShellShortcut from './runShellShortcut.js';
import wireActiveShellInstanceTracking from './wireActiveShellInstanceTracking.js';

const registerShellKeymaps = (editor) => {
  const definitionRecords = getShellShortcutDefinitions();
  const keymapsModule = editor.Keymaps;
  if (keymapsModule && keymapsModule.add) {
    definitionRecords.forEach((definitionRecord) => {
      const handleKeymap = (keymapEditor, sender, keymapOptions) => {
        const keyEvent = keymapOptions && keymapOptions.event;
        if (!keyEvent || !isShortcutEventForEditor(editor, keyEvent)) return;
        keyEvent.preventDefault();
        runShellShortcut(editor, definitionRecord);
      };
      keymapsModule.add(definitionRecord.commandId, definitionRecord.keys, handleKeymap, { force: true });
    });
  }
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return;
  getEditorInstanceSuffix(editor);
  wireActiveShellInstanceTracking(editor);
  const handleShellShortcut = (keyEvent) => {
    const definitionRecord = matchShellShortcut(definitionRecords, keyEvent);
    if (!definitionRecord || !isShortcutEventForEditor(editor, keyEvent)) return;
    keyEvent.preventDefault();
    keyEvent.stopPropagation();
    const originalEvent = keyEvent._parentEvent;
    if (originalEvent && typeof originalEvent.preventDefault === 'function') originalEvent.preventDefault();
    runShellShortcut(editor, definitionRecord);
  };
  ownerDocument.addEventListener('keydown', handleShellShortcut, true);
  editor.on('destroy', () => ownerDocument.removeEventListener('keydown', handleShellShortcut, true));
};

export default registerShellKeymaps;
