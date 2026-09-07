import runFormStatusBehavior from './runFormStatusBehavior.js';

const buildFormStatusTypeDefinition = () => ({
  type: 'db-form-status',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbFormStatus) && { type: 'db-form-status' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Status message',
      draggable: '[data-db-type=form]',
      droppable: false,
      copyable: false,
      removable: false,
      classes: ['db-form-status'],
      attributes: {
        role: 'status',
        'aria-live': 'polite',
        'data-db-form-status': 'true',
        'data-db-form-child': 'true',
      },
      script: runFormStatusBehavior,
      traits: [],
    },
  },
});

export default buildFormStatusTypeDefinition;
