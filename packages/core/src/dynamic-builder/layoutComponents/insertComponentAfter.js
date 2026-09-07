import activateTextEditing from '../support/activateTextEditing.js';

const editableTypes = ['db-heading', 'db-text'];

const insertComponentAfter = (editor, referenceComponent, contentRecord) => {
  const parentComponent = referenceComponent && referenceComponent.parent && referenceComponent.parent();
  if (!parentComponent) return null;
  const [addedComponent] = parentComponent.append(contentRecord, { at: referenceComponent.index() + 1 });
  if (!addedComponent) return null;
  editor.select(addedComponent);
  const addedElement = addedComponent.getEl && addedComponent.getEl();
  addedElement && addedElement.scrollIntoView && addedElement.scrollIntoView({ block: 'center' });
  if (editableTypes.indexOf(String(addedComponent.get('type') || '')) >= 0) {
    activateTextEditing(editor, addedComponent, 'end');
  }
  return addedComponent;
};

export default insertComponentAfter;
