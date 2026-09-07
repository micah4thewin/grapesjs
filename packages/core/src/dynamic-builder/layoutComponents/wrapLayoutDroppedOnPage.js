import showToastNotice from '../support/showToastNotice.js';

const pageWrappedTypes = ['db-columns'];

const wrapLayoutDroppedOnPage = (editor, droppedComponent) => {
  if (!droppedComponent || !droppedComponent.get || !droppedComponent.parent) return false;
  if (pageWrappedTypes.indexOf(String(droppedComponent.get('type') || '')) < 0) return false;
  const parentComponent = droppedComponent.parent();
  if (!parentComponent || parentComponent.get('type') !== 'wrapper') return false;
  const dropIndex = droppedComponent.index();
  const [sectionComponent] = parentComponent.append(
    { type: 'db-section', components: [{ type: 'db-container', name: 'Section content', components: [] }] },
    { at: dropIndex },
  );
  const containerComponent = sectionComponent && sectionComponent.components().at(0);
  if (!containerComponent) return false;
  containerComponent.append(droppedComponent);
  editor.select(droppedComponent);
  showToastNotice(editor, 'Columns need a section, so one was added around them.');
  return true;
};

export default wrapLayoutDroppedOnPage;
