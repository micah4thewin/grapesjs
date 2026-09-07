import buildAccordionDefaultChildren from './buildAccordionDefaultChildren.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import runAccordionBehavior from './runAccordionBehavior.js';

const buildAccordionTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-accordion',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'accordion') && { type: 'db-accordion' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Accordion',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: '[data-db-type=accordion-item]',
      classes: ['db-accordion'],
      attributes: {
        'data-db-type': 'accordion',
        'data-db-accordion': 'true',
        'data-db-single': 'true',
        'data-db-heading-level': '3',
      },
      components: buildAccordionDefaultChildren(interactiveTextDefaults),
      script: runAccordionBehavior,
      traits: [
        { type: 'db-accordion-items', name: 'dbAccordionItems', label: 'Questions' },
        {
          type: 'checkbox',
          name: 'data-db-single',
          label: 'Single panel open',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
        {
          type: 'select',
          name: 'data-db-heading-level',
          label: 'Heading level',
          default: '3',
          options: [
            { id: '2', label: 'Heading 2' },
            { id: '3', label: 'Heading 3' },
            { id: '4', label: 'Heading 4' },
          ],
        },
      ],
    },
  },
});

export default buildAccordionTypeDefinition;
