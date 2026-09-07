import appendToolbarItemOnce from '../support/appendToolbarItemOnce.js';
import getIconMarkup from '../support/getIconMarkup.js';
import openQuickInsertPicker from './openQuickInsertPicker.js';

const hostTypes = ['db-container', 'db-column'];

const wireAddBelowToolbarButton = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || !selectedComponent.parent) return;
    const parentComponent = selectedComponent.parent();
    if (!parentComponent || !parentComponent.get) return;
    if (hostTypes.indexOf(String(parentComponent.get('type') || '')) < 0) return;
    appendToolbarItemOnce(selectedComponent, {
      attributes: { title: 'Add block below' },
      label: getIconMarkup('plus', { size: 15, label: 'Add block below' }),
      command: () => openQuickInsertPicker(editor, selectedComponent),
    });
  });
};

export default wireAddBelowToolbarButton;
