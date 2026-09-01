const autoOpenBlocksPanel = (editor) => {
  if (!editor.Commands.has('core:open-blocks')) return;
  editor.Commands.isActive('core:open-blocks') || editor.runCommand('core:open-blocks');
};

export default autoOpenBlocksPanel;
