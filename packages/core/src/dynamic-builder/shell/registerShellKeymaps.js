import runShellCommand from './runShellCommand.js';

const getShortcutDefinitions = () => [
  { commandId: 'db:open-command-palette', keyName: 'k', needsShift: false },
  { commandId: 'db:save-revision', keyName: 's', needsShift: true },
  { commandId: 'db:open-shortcut-help', keyName: '/', needsShift: false },
];

const registerShellKeymaps = (editor) => {
  const keymapsModule = editor.Keymaps;
  if (keymapsModule && keymapsModule.add) {
    keymapsModule.add('db:open-command-palette', '⌘+k, ctrl+k', 'db:open-command-palette', {
      prevent: true,
      force: true,
    });
    keymapsModule.add('db:save-revision', '⌘+shift+s, ctrl+shift+s', 'db:save-revision', {
      prevent: true,
      force: true,
    });
    keymapsModule.add('db:open-shortcut-help', '⌘+shift+slash, ctrl+shift+slash', 'db:open-shortcut-help', {
      prevent: true,
    });
  }
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return;
  const handleShellShortcut = (keyEvent) => {
    if (!keyEvent.ctrlKey && !keyEvent.metaKey) return;
    const pressedKey = String(keyEvent.key || '').toLowerCase();
    const shortcutRecord = getShortcutDefinitions().find(
      (definitionRecord) =>
        definitionRecord.keyName === pressedKey && definitionRecord.needsShift === Boolean(keyEvent.shiftKey),
    );
    if (!shortcutRecord) return;
    keyEvent.preventDefault();
    keyEvent.stopPropagation();
    runShellCommand(editor, shortcutRecord.commandId);
  };
  ownerDocument.addEventListener('keydown', handleShellShortcut, true);
  editor.on('destroy', () => ownerDocument.removeEventListener('keydown', handleShellShortcut, true));
};

export default registerShellKeymaps;
