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
      components: buildScriptCardChildren('', false),
      traits: [
        {
          type: 'db-code',
          name: 'scriptCode',
          language: 'javascript',
          label: 'Script code',
          helpText:
            'Ships with the published site only while "Allow script tags" is on in Custom code. Until then this block is left out of exports.',
        },
        {
          type: 'button',
          name: 'dbOpenCustomCode',
          label: 'Settings',
          text: 'Open custom code settings',
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
