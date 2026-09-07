import buildMarketingSectionIntroRecords from './buildMarketingSectionIntroRecords.js';
import isComponentOfType from './isComponentOfType.js';

const wrapMarketingDropInSection = (editor, droppedComponent) => {
  const parentComponent = droppedComponent && droppedComponent.parent ? droppedComponent.parent() : null;
  if (!isComponentOfType(parentComponent, 'wrapper')) return null;
  const componentTypes = editor.DomComponents;
  if (!componentTypes.getType('db-section') || !componentTypes.getType('db-container')) return null;
  const introRecords = buildMarketingSectionIntroRecords(String(droppedComponent.get('type') || ''));
  const sectionComponent = parentComponent.append(
    { type: 'db-section', components: [{ type: 'db-container', components: introRecords }] },
    { at: droppedComponent.index() },
  )[0];
  const containerComponent = sectionComponent ? sectionComponent.components().at(0) : null;
  if (!containerComponent) return null;
  droppedComponent.move(containerComponent);
  if (editor.select) editor.select(droppedComponent);
  return sectionComponent;
};

export default wrapMarketingDropInSection;
