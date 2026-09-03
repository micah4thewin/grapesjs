import buildAlertButtonFlowRecord from './buildAlertButtonFlowRecord.js';
import buildAlertButtonTraitDefinitions from './buildAlertButtonTraitDefinitions.js';
import serializeFlowRecords from './serializeFlowRecords.js';

const defaultAlertAttributes = {
  'data-db-type': 'alert-button',
  'data-db-alert-kind': 'success',
  'data-db-alert-title': 'Thanks!',
  'data-db-alert-text': 'We got your details and will be in touch shortly.',
  'data-db-alert-confirm': 'OK',
  'data-db-alert-cancel': '',
  'data-db-alert-then': 'none',
  'data-db-alert-url': '',
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
      traits: buildAlertButtonTraitDefinitions(),
    },
  },
});

export default buildAlertButtonTypeDefinition;
