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
          type: 'db-textarea-trait',
          name: 'scriptCode',
          label: 'Script code',
          placeholder: 'document.querySelectorAll(...)',
        },
      ],
    },
  },
});

export default createCustomScriptTypeDefinition;
