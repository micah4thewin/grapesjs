import readMenuRowIndex from '../traits/readMenuRowIndex.js';

const dispatchListEditorEvent = (component, eventTarget, eventType, listSpec, editor) => {
  const fieldElement = eventTarget.closest('[data-db-list-field]');
  if (fieldElement) {
    if (eventType !== 'change') return false;
    const fieldName = fieldElement.getAttribute('data-db-list-field');
    return Boolean(listSpec.handleField(component, readMenuRowIndex(fieldElement), fieldName, fieldElement, editor));
  }
  if (eventTarget.closest('[data-db-list-add]')) {
    listSpec.handleAdd(component, editor);
    return true;
  }
  if (eventTarget.closest('[data-db-menu-remove]')) {
    listSpec.handleRemove(component, readMenuRowIndex(eventTarget));
    return true;
  }
  const moveButton = eventTarget.closest('[data-db-menu-move]');
  if (moveButton) {
    listSpec.handleMove(component, readMenuRowIndex(eventTarget), Number(moveButton.getAttribute('data-db-menu-move')));
    return true;
  }
  const actionButton = eventTarget.closest('[data-db-list-action]');
  if (actionButton && listSpec.handleAction) {
    listSpec.handleAction(component, actionButton.getAttribute('data-db-list-action'), editor);
    return true;
  }
  return false;
};

export default dispatchListEditorEvent;
