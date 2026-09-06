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
          type: 'db-code',
          name: 'cssCode',
          language: 'css',
          label: 'CSS code',
          helpText: 'Applies to the whole site. Design tokens are available as --db-* variables.',
        },
      ],
    },
    toHTML() {
      return '';
    },
  },
});

export default createCustomCssTypeDefinition;
