import buildAccordionItemInnerMarkup from './buildAccordionItemInnerMarkup.js';

const buildAccordionDefaultChildren = (interactiveTextDefaults) =>
  interactiveTextDefaults.accordionItemTitles.map((itemTitleText, itemIndex) => ({
    type: 'db-accordion-item',
    attributes: { 'data-db-type': 'accordion-item', 'data-db-open': itemIndex === 0 ? 'true' : 'false' },
    components: buildAccordionItemInnerMarkup(itemTitleText, interactiveTextDefaults.accordionPanelText),
  }));

export default buildAccordionDefaultChildren;
