import getIconMarkup from '../support/getIconMarkup.js';
import openIconPickerForComponent from './openIconPickerForComponent.js';

const wireIconToolbarPickerButton = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || selectedComponent.get('type') !== 'db-icon') return;
    if (selectedComponent.get('dbIconPickerWired')) return;
    const toolbarItems = [...(selectedComponent.get('toolbar') || [])];
    toolbarItems.push({
      attributes: { title: 'Change icon' },
      label: getIconMarkup('symbols', { size: 15, label: 'Change icon' }),
      command: () => openIconPickerForComponent(editor, selectedComponent),
    });
    selectedComponent.set({ toolbar: toolbarItems, dbIconPickerWired: true });
  });
};

export default wireIconToolbarPickerButton;
