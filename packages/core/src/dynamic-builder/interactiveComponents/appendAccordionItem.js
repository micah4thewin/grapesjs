import buildAccordionItemInnerMarkup from './buildAccordionItemInnerMarkup.js';

const appendAccordionItem = (accordionComponent, interactiveTextDefaults) => {
  if (!accordionComponent || typeof accordionComponent.append !== 'function') return null;
  const headingLevel = String((accordionComponent.getAttributes() || {})['data-db-heading-level'] || '3');
  const addedComponents = accordionComponent.append({
    type: 'db-accordion-item',
    attributes: { 'data-db-type': 'accordion-item', 'data-db-open': 'false' },
    components: buildAccordionItemInnerMarkup(
      interactiveTextDefaults.accordionItemTitle,
      interactiveTextDefaults.accordionPanelText,
      headingLevel,
    ),
  });
  return addedComponents[0] || null;
};

export default appendAccordionItem;
