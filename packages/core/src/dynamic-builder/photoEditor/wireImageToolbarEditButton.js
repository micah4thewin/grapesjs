import getIconMarkup from '../support/getIconMarkup.js';

const toolbarMarker = 'data-db-photo-toolbar';

const wireImageToolbarEditButton = (editor) => {
  const imageTypes = ['db-image', 'image'];
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || imageTypes.indexOf(String(selectedComponent.get('type') || '')) < 0) return;
    const toolbarItems = [...(selectedComponent.get('toolbar') || [])];
    if (
      toolbarItems.some((toolbarItem) => toolbarItem && toolbarItem.attributes && toolbarItem.attributes[toolbarMarker])
    )
      return;
    toolbarItems.push({
      attributes: { title: 'Edit photo', [toolbarMarker]: 'true' },
      label: getIconMarkup('sliders', { size: 15, label: 'Edit photo' }),
      command: 'db:open-photo-editor',
    });
    selectedComponent.set('toolbar', toolbarItems, { avoidStore: true });
  });
};

export default wireImageToolbarEditButton;
