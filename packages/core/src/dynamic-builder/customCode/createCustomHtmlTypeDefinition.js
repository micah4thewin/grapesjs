import getDefaultCustomHtmlCode from './getDefaultCustomHtmlCode.js';

const createCustomHtmlTypeDefinition = () => ({
  type: 'db-custom-html',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'custom-html' && { type: 'db-custom-html' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Custom HTML',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'custom-html', htmlCode: getDefaultCustomHtmlCode() },
      classes: ['db-custom-html'],
      components: getDefaultCustomHtmlCode(),
      traits: [
        {
          type: 'db-textarea-trait',
          name: 'htmlCode',
          label: 'HTML code',
          placeholder: '<div>Your markup here</div>',
        },
      ],
    },
  },
});

export default createCustomHtmlTypeDefinition;
