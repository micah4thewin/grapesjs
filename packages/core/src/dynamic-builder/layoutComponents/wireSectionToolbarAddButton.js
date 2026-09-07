import appendToolbarItemOnce from '../support/appendToolbarItemOnce.js';
import getIconMarkup from '../support/getIconMarkup.js';
import insertSectionAfterComponent from './insertSectionAfterComponent.js';

const wireSectionToolbarAddButton = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || !selectedComponent.get || selectedComponent.get('type') !== 'db-section') return;
    appendToolbarItemOnce(selectedComponent, {
      attributes: { title: 'Add section below' },
      label: getIconMarkup('plus', { size: 15, label: 'Add section below' }),
      command: () => insertSectionAfterComponent(editor, selectedComponent),
    });
  });
};

export default wireSectionToolbarAddButton;
