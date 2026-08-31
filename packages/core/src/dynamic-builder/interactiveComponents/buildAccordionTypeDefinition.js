import buildAccordionDefaultChildren from './buildAccordionDefaultChildren.js';
import runAccordionBehavior from './runAccordionBehavior.js';

const buildAccordionTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-accordion',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'accordion') && { type: 'db-accordion' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Accordion',
      draggable: true,
      droppable: '[data-db-type=accordion-item]',
      classes: ['db-accordion'],
      attributes: { 'data-db-type': 'accordion', 'data-db-accordion': 'true', 'data-db-single': 'true' },
      components: buildAccordionDefaultChildren(interactiveTextDefaults),
      script: runAccordionBehavior,
      traits: [
        {
          type: 'checkbox',
          name: 'data-db-single',
          label: 'Single panel open',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
      ],
    },
  },
});

export default buildAccordionTypeDefinition;
