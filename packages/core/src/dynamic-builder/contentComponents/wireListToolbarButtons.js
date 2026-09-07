import activateTextEditing from '../support/activateTextEditing.js';
import appendToolbarItemOnce from '../support/appendToolbarItemOnce.js';
import getIconMarkup from '../support/getIconMarkup.js';
import addListItemAfter from './addListItemAfter.js';

const isListItem = (component) => {
  const parentComponent = component.parent && component.parent();
  return (
    component.get('tagName') === 'li' && Boolean(parentComponent && parentComponent.is && parentComponent.is('db-list'))
  );
};

const wireListToolbarButtons = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || !selectedComponent.is) return;
    if (!selectedComponent.is('db-list') && !isListItem(selectedComponent)) return;
    appendToolbarItemOnce(selectedComponent, {
      attributes: { title: 'Add item' },
      label: getIconMarkup('plus', { size: 15, label: 'Add item' }),
      command: () => {
        const addedItem = addListItemAfter(selectedComponent, '');
        addedItem && activateTextEditing(editor, addedItem, 'start');
      },
    });
  });
};

export default wireListToolbarButtons;
