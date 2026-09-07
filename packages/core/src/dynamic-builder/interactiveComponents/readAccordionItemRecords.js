import findComponentsByClassName from './findComponentsByClassName.js';
import readComponentTextContent from './readComponentTextContent.js';

const readAccordionItemRecords = (accordionComponent) => {
  if (!accordionComponent || typeof accordionComponent.components !== 'function') return [];
  return accordionComponent
    .components()
    .filter((childComponent) => String(childComponent.get('type') || '') === 'db-accordion-item')
    .map((itemComponent) => {
      const titleComponent = findComponentsByClassName(itemComponent, 'db-accordion-title')[0] || null;
      return {
        itemComponent,
        titleComponent,
        labelText: readComponentTextContent(titleComponent),
        isOpen: String((itemComponent.getAttributes() || {})['data-db-open'] || '') === 'true',
      };
    });
};

export default readAccordionItemRecords;
