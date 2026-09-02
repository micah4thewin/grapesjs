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
    getAttrToHTML(opts) {
      const exportAttributes = this.getAttributes();
      delete exportAttributes.htmlCode;
      const editorConfig = this.em && this.em.getConfig ? this.em.getConfig() : {};
      if (editorConfig.avoidInlineStyle && !(opts && opts.keepInlineStyle === true)) delete exportAttributes.style;
      return exportAttributes;
    },
  },
});

export default createCustomHtmlTypeDefinition;
