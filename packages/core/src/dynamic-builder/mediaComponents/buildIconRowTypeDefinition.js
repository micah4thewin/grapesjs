import buildMediaTraitCategory from './buildMediaTraitCategory.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';

const buildIconRowTypeDefinition = () => ({
  type: 'db-icon-row',
  isComponent: (el) =>
    Boolean(el && el.classList && el.classList.contains && el.classList.contains('db-icon-row')) && {
      type: 'db-icon-row',
    },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Icon with text',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: false,
      classes: ['db-icon-row'],
      attributes: { 'data-db-align': 'start' },
      components: [
        { type: 'db-icon' },
        {
          tagName: 'p',
          type: 'text',
          name: 'Text',
          classes: ['db-text'],
          components: 'Pair an icon with short supporting copy to highlight a benefit.',
        },
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-align',
          label: 'Alignment',
          default: 'start',
          category: buildMediaTraitCategory('icon-row', 'Icon with text'),
          options: [
            { id: 'start', label: 'Left' },
            { id: 'center', label: 'Centered' },
          ],
        },
      ],
    },
  },
});

export default buildIconRowTypeDefinition;
