import buildCssCardChildren from './buildCssCardChildren.js';

const createCustomCssTypeDefinition = () => ({
  type: 'db-custom-css',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'custom-css' && { type: 'db-custom-css' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Custom CSS',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'custom-css', cssCode: '' },
      classes: ['db-custom-css', 'db-code-card'],
      components: buildCssCardChildren(''),
      traits: [
        {
          type: 'db-textarea-trait',
          name: 'cssCode',
          label: 'CSS code',
          placeholder: '.db-example { color: inherit; }',
        },
      ],
    },
  },
});

export default createCustomCssTypeDefinition;
