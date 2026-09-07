import buildHeroDefaultChildren from './buildHeroDefaultChildren.js';
import buildMarketingSectionTraits from './buildMarketingSectionTraits.js';

const buildHeroTypeDefinition = () => ({
  type: 'db-hero',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'hero') && { type: 'db-hero' },
  model: {
    defaults: {
      tagName: 'section',
      name: 'Hero',
      draggable: '[data-gjs-type=wrapper]',
      droppable: false,
      classes: ['db-hero'],
      attributes: {
        'data-db-type': 'hero',
        'data-db-hero': 'split-media-right',
        'data-db-theme': 'default',
        'data-db-media': 'image',
      },
      components: buildHeroDefaultChildren(),
      traits: [
        {
          type: 'select',
          name: 'data-db-hero',
          label: 'Layout',
          default: 'split-media-right',
          options: [
            { id: 'centered', label: 'Centered' },
            { id: 'split-media-right', label: 'Text left, picture right' },
            { id: 'split-media-left', label: 'Picture left, text right' },
          ],
        },
        {
          type: 'select',
          name: 'data-db-media',
          label: 'Picture',
          default: 'image',
          options: [
            { id: 'image', label: 'Show a picture' },
            { id: 'none', label: 'No picture' },
          ],
        },
        ...buildMarketingSectionTraits('default', 'hero'),
      ],
    },
  },
});

export default buildHeroTypeDefinition;
