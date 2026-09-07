const getShellShortcutDefinitions = () => [
  {
    commandId: 'db:open-command-palette',
    keys: '\u2318+k, ctrl+k',
    keyNames: ['k'],
    needsShift: false,
    ignoresShift: false,
    modalClassName: 'gjs-db-palette-modal',
    isTransient: true,
  },
  {
    commandId: 'db:save-revision',
    keys: '\u2318+shift+s, ctrl+shift+s',
    keyNames: ['s'],
    needsShift: true,
    ignoresShift: false,
    modalClassName: 'gjs-db-save-revision-modal',
    isTransient: false,
  },
  {
    commandId: 'db:open-shortcut-help',
    keys: '\u2318+/, ctrl+/',
    keyNames: ['/', '?'],
    needsShift: false,
    ignoresShift: true,
    modalClassName: 'gjs-db-shortcut-help-modal',
    isTransient: true,
  },
];

export default getShellShortcutDefinitions;
