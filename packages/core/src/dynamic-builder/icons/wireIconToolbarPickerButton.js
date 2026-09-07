import getIconMarkup from '../support/getIconMarkup.js';

const toolbarMarker = 'data-db-icon-toolbar';

const wireIconToolbarPickerButton = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || selectedComponent.get('type') !== 'db-icon') return;
    const toolbarItems = [...(selectedComponent.get('toolbar') || [])];
    if (
      toolbarItems.some((toolbarItem) => toolbarItem && toolbarItem.attributes && toolbarItem.attributes[toolbarMarker])
    )
      return;
    toolbarItems.push({
      attributes: { title: 'Change icon', [toolbarMarker]: 'true' },
      label: getIconMarkup('symbols', { size: 15, label: 'Change icon' }),
      command: 'db:open-icon-picker',
    });
    selectedComponent.set('toolbar', toolbarItems, { avoidStore: true });
  });
};

export default wireIconToolbarPickerButton;
