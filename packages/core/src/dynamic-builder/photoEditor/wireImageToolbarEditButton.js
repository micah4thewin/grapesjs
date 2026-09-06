import getIconMarkup from '../support/getIconMarkup.js';
import openPhotoEditorModal from './openPhotoEditorModal.js';

const wireImageToolbarEditButton = (editor) => {
  const imageTypes = ['db-image', 'image'];
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || imageTypes.indexOf(String(selectedComponent.get('type') || '')) < 0) return;
    if (selectedComponent.get('dbPhotoEditorWired')) return;
    const toolbarItems = [...(selectedComponent.get('toolbar') || [])];
    toolbarItems.push({
      attributes: { title: 'Edit photo' },
      label: getIconMarkup('sliders', { size: 15, label: 'Edit photo' }),
      command: () => openPhotoEditorModal(editor, selectedComponent),
    });
    selectedComponent.set({ toolbar: toolbarItems, dbPhotoEditorWired: true });
  });
};

export default wireImageToolbarEditButton;
