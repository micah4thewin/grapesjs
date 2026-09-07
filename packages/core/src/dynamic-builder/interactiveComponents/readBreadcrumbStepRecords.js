import findChildByTagName from './findChildByTagName.js';
import readComponentTextContent from './readComponentTextContent.js';

const readBreadcrumbStepRecords = (breadcrumbComponent) => {
  const trailComponent = findChildByTagName(breadcrumbComponent, 'ol');
  if (!trailComponent) return [];
  const itemComponents = trailComponent.components().models;
  return itemComponents.map((itemComponent, itemIndex) => {
    const linkComponent = findChildByTagName(itemComponent, 'a');
    const labelComponent = linkComponent || itemComponent;
    return {
      itemComponent,
      linkComponent,
      labelComponent,
      labelText: readComponentTextContent(labelComponent),
      linkHref: linkComponent ? String((linkComponent.getAttributes() || {}).href || '') : '',
      isCurrent: itemIndex === itemComponents.length - 1,
    };
  });
};

export default readBreadcrumbStepRecords;
