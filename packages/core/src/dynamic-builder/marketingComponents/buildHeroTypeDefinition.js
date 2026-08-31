import buildHeroDefaultChildren from './buildHeroDefaultChildren.js';

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
      attributes: { 'data-db-type': 'hero', 'data-db-hero': 'split-media-right', 'data-db-theme': 'default' },
      components: buildHeroDefaultChildren(),
      traits: [
        {
          type: 'select',
          name: 'data-db-hero',
          label: 'Layout variant',
          default: 'split-media-right',
          options: [
            { id: 'centered', label: 'Centered' },
            { id: 'split-media-right', label: 'Split, media right' },
            { id: 'split-media-left', label: 'Split, media left' },
          ],
        },
        {
          type: 'select',
          name: 'data-db-theme',
          label: 'Theme',
          default: 'default',
          options: [
            { id: 'default', label: 'Default' },
            { id: 'light', label: 'Light' },
            { id: 'dark', label: 'Dark' },
            { id: 'brand', label: 'Brand' },
          ],
        },
        { type: 'text', name: 'id', label: 'Anchor id', placeholder: 'hero' },
      ],
    },
  },
});

export default buildHeroTypeDefinition;
