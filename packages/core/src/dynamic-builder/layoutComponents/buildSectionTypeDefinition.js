const buildSectionTypeDefinition = () => ({
  type: 'db-section',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'section') && { type: 'db-section' },
  model: {
    defaults: {
      tagName: 'section',
      name: 'Section',
      draggable: '[data-gjs-type=wrapper]',
      droppable: true,
      classes: ['db-section'],
      attributes: { 'data-db-type': 'section', 'data-db-layout': 'contained', 'data-db-theme': 'default' },
      components: [{ type: 'db-container' }],
      traits: [
        {
          type: 'select',
          name: 'data-db-layout',
          label: 'Layout variant',
          default: 'contained',
          options: [
            { id: 'contained', label: 'Contained' },
            { id: 'full', label: 'Full width' },
            { id: 'narrow', label: 'Narrow' },
            { id: 'wide', label: 'Wide' },
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
        { type: 'text', name: 'id', label: 'Anchor id', placeholder: 'my-section' },
        { type: 'db-asset', name: 'data-db-bg-image', label: 'Background image' },
        {
          type: 'checkbox',
          name: 'data-db-overlay',
          label: 'Dark overlay',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
      ],
    },
  },
});

export default buildSectionTypeDefinition;
