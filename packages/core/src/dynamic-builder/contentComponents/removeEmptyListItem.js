import activateTextEditing from '../support/activateTextEditing.js';

const removeEmptyListItem = async (editor, listItem) => {
  const listComponent = listItem.parent && listItem.parent();
  if (!listComponent) return false;
  const previousItem = listComponent.components().at(listItem.index() - 1);
  if (!previousItem) return false;
  const itemView = listItem.getView && listItem.getView();
  if (itemView && itemView.disableEditing) await itemView.disableEditing();
  listItem.remove();
  await activateTextEditing(editor, previousItem, 'end');
  return true;
};

export default removeEmptyListItem;
