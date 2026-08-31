const registerShellKeymaps = (editor) => {
  const keymapsModule = editor.Keymaps;
  if (!keymapsModule || !keymapsModule.add) return;
  keymapsModule.add('db:open-command-palette', '\u2318+k, ctrl+k', 'db:open-command-palette', {
    prevent: true,
    force: true,
  });
  keymapsModule.add('db:save-revision', '\u2318+shift+s, ctrl+shift+s', 'db:save-revision', {
    prevent: true,
    force: true,
  });
  keymapsModule.add('db:open-shortcut-help', 'shift+alt+h', 'db:open-shortcut-help', { prevent: true });
};

export default registerShellKeymaps;
