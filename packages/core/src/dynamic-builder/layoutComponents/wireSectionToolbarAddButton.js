import getIconMarkup from '../support/getIconMarkup.js';
import insertSectionAfterComponent from './insertSectionAfterComponent.js';

const wireSectionToolbarAddButton = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || selectedComponent.get('type') !== 'db-section') return;
    if (selectedComponent.get('dbAddSectionWired')) return;
    const toolbarItems = [...(selectedComponent.get('toolbar') || [])];
    toolbarItems.push({
      attributes: { title: 'Add section below' },
      label: getIconMarkup('plus', { size: 15, label: 'Add section below' }),
      command: () => insertSectionAfterComponent(editor, selectedComponent),
    });
    selectedComponent.set({ toolbar: toolbarItems, dbAddSectionWired: true });
  });
};

export default wireSectionToolbarAddButton;
