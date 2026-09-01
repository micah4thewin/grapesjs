const autoOpenBlocksPanel = (editor) => {
  const viewsPanel = editor.Panels && editor.Panels.getPanel && editor.Panels.getPanel('views');
  const viewButtons = viewsPanel && viewsPanel.get('buttons');
  const blocksButton = viewButtons && viewButtons.filter((viewButton) => viewButton.get('id') === 'open-blocks')[0];
  if (blocksButton) {
    blocksButton.get('active') || blocksButton.set('active', true);
    return;
  }
  if (!editor.Commands.has('core:open-blocks')) return;
  editor.Commands.isActive('core:open-blocks') || editor.runCommand('core:open-blocks');
};

export default autoOpenBlocksPanel;
