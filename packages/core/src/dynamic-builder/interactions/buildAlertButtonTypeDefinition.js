import buildAlertButtonFlowRecord from './buildAlertButtonFlowRecord.js';
import buildAlertButtonTraitDefinitions from './buildAlertButtonTraitDefinitions.js';
import getAlertAttributeNames from './getAlertAttributeNames.js';
import serializeFlowRecords from './serializeFlowRecords.js';

const defaultAlertAttributes = {
  'data-db-type': 'alert-button',
  'data-db-alert-kind': 'success',
  'data-db-alert-title': 'Thanks!',
  'data-db-alert-text': 'Thanks for stopping by. We will be in touch soon.',
  'data-db-alert-confirm': 'OK',
  'data-db-alert-then': 'none',
};

const buildAlertButtonTypeDefinition = () => ({
  type: 'db-alert-button',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'alert-button') && { type: 'db-alert-button' },
  model: {
    defaults: {
      tagName: 'button',
      name: 'Dialog button',
      draggable: true,
      droppable: false,
      classes: ['db-button', 'db-alert-button'],
      attributes: {
        ...defaultAlertAttributes,
        type: 'button',
        'data-db-flows': serializeFlowRecords([buildAlertButtonFlowRecord(defaultAlertAttributes)]),
      },
      components: [{ type: 'textnode', content: 'Show a dialog' }],
      traits: buildAlertButtonTraitDefinitions(defaultAlertAttributes),
    },
    getAttrToHTML(opts) {
      const exportAttributes = this.getAttributes();
      getAlertAttributeNames().forEach((attributeName) => delete exportAttributes[attributeName]);
      const editorConfig = this.em && this.em.getConfig ? this.em.getConfig() : {};
      if (editorConfig.avoidInlineStyle && !(opts && opts.keepInlineStyle === true)) delete exportAttributes.style;
      return exportAttributes;
    },
  },
});

export default buildAlertButtonTypeDefinition;
