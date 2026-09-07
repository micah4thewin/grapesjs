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
      attributes: { 'data-db-type': 'custom-css', cssCode: '', cssPriority: 'boost' },
      classes: ['db-custom-css', 'db-code-card'],
      components: buildCssCardChildren(''),
      traits: [
        {
          type: 'db-code',
          name: 'cssCode',
          language: 'css',
          label: 'CSS code',
          helpText:
            'Applies to every page of the site. Your rules are given priority over the builder styles, so a simple selector such as .db-heading works. Design tokens are available as --db-* variables.',
        },
        {
          type: 'select',
          name: 'cssPriority',
          label: 'Priority',
          default: 'boost',
          attributes: { title: 'Keep as written only if you manage specificity yourself.' },
          options: [
            { id: 'boost', label: 'Win over builder styles' },
            { id: 'as-written', label: 'Keep as written' },
          ],
        },
      ],
    },
    toHTML() {
      return '';
    },
  },
});

export default createCustomCssTypeDefinition;
