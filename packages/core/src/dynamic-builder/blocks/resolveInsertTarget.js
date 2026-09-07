import createTemporaryComponents from './createTemporaryComponents.js';

const resolveInsertTarget = (editor, contentRecords) => {
  const sourceComponent = createTemporaryComponents(editor, contentRecords)[0];
  if (!sourceComponent) return null;
  const canPlace = (targetComponent, insertIndex) =>
    Boolean(targetComponent) && editor.Components.canMove(targetComponent, sourceComponent, insertIndex).result;
  const appendInside = (parentComponent) => ({ parentComponent, insertIndex: parentComponent.components().length });
  const preferSectionContainer = (sectionComponent) => {
    const containerComponent = sectionComponent
      .components()
      .find((childComponent) => String(childComponent.get('type') || '') === 'db-container');
    return containerComponent && canPlace(containerComponent)
      ? appendInside(containerComponent)
      : appendInside(sectionComponent);
  };
  const selectedComponent = editor.getSelected();
  if (selectedComponent && canPlace(selectedComponent)) {
    return String(selectedComponent.get('type') || '') === 'db-section'
      ? preferSectionContainer(selectedComponent)
      : appendInside(selectedComponent);
  }
  let cursorComponent = selectedComponent;
  while (cursorComponent) {
    const parentComponent = cursorComponent.parent && cursorComponent.parent();
    const nextIndex = cursorComponent.index() + 1;
    if (parentComponent && canPlace(parentComponent, nextIndex)) return { parentComponent, insertIndex: nextIndex };
    cursorComponent = parentComponent;
  }
  const wrapperComponent = editor.getWrapper();
  return canPlace(wrapperComponent) ? appendInside(wrapperComponent) : null;
};

export default resolveInsertTarget;
