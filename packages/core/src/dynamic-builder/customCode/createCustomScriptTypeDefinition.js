import buildScriptCardChildren from './buildScriptCardChildren.js';

const createCustomScriptTypeDefinition = () => ({
  type: 'db-custom-script',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'custom-script' && { type: 'db-custom-script' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Custom script',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'custom-script', scriptCode: '' },
      classes: ['db-custom-script', 'db-code-card'],
      components: buildScriptCardChildren(''),
      traits: [
        {
          type: 'db-code',
          name: 'scriptCode',
          language: 'javascript',
          label: 'Script code',
          helpText: 'Stays inert until you turn on "Allow script tags" in Custom code.',
        },
        {
          type: 'button',
          name: 'dbOpenCustomCode',
          label: '',
          text: 'Open custom code settings',
          full: true,
          command: 'db:open-custom-code',
        },
      ],
    },
    toHTML() {
      return '';
    },
  },
});

export default createCustomScriptTypeDefinition;
