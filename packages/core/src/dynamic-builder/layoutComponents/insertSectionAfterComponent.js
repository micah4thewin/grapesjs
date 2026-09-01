const insertSectionAfterComponent = (editor, sectionComponent) => {
  const parentComponent = sectionComponent.parent && sectionComponent.parent();
  if (!parentComponent) return;
  const insertIndex = sectionComponent.index() + 1;
  const addedComponents = parentComponent.append({ type: 'db-section' }, { at: insertIndex });
  const addedSection = addedComponents && addedComponents[0];
  if (!addedSection) return;
  editor.select(addedSection);
  const addedElement = addedSection.getEl && addedSection.getEl();
  addedElement && addedElement.scrollIntoView && addedElement.scrollIntoView({ block: 'center' });
};

export default insertSectionAfterComponent;
