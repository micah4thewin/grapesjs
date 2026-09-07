import buildMediaTraitCategory from './buildMediaTraitCategory.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';

const buildFigureTypeDefinition = () => ({
  type: 'db-figure',
  isComponent: (el) =>
    Boolean(el && el.classList && el.classList.contains && el.classList.contains('db-figure')) && { type: 'db-figure' },
  model: {
    defaults: {
      tagName: 'figure',
      name: 'Picture with caption',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: false,
      classes: ['db-figure'],
      attributes: { 'data-db-show-caption': 'true' },
      components: [
        { type: 'db-image' },
        {
          tagName: 'figcaption',
          type: 'text',
          name: 'Caption',
          classes: ['db-figure-caption'],
          components: 'Describe the image for readers and search engines.',
        },
      ],
      traits: [
        {
          type: 'checkbox',
          name: 'data-db-show-caption',
          label: 'Show caption',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
          category: buildMediaTraitCategory('figure', 'Picture with caption'),
        },
      ],
    },
  },
});

export default buildFigureTypeDefinition;
