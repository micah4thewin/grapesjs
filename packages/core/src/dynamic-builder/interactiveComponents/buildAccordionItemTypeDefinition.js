import buildAccordionItemInnerMarkup from './buildAccordionItemInnerMarkup.js';

const buildAccordionItemTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-accordion-item',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'accordion-item') && { type: 'db-accordion-item' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Accordion item',
      draggable: '[data-db-type=accordion]',
      droppable: false,
      classes: ['db-accordion-item'],
      attributes: { 'data-db-type': 'accordion-item', 'data-db-open': 'false' },
      components: buildAccordionItemInnerMarkup(
        interactiveTextDefaults.accordionItemTitle,
        interactiveTextDefaults.accordionPanelText,
      ),
      traits: [
        {
          type: 'checkbox',
          name: 'data-db-open',
          label: 'Open on load',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
      ],
    },
  },
});

export default buildAccordionItemTypeDefinition;
