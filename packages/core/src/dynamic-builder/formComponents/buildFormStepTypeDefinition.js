import escapeHtmlText from '../support/escapeHtmlText.js';

const buildFormStepTypeDefinition = () => ({
  type: 'db-form-step',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'form-step') && { type: 'db-form-step' },
  model: {
    defaults: {
      tagName: 'fieldset',
      name: 'Step',
      draggable: '[data-db-type=form]',
      droppable:
        '[data-db-form-child]:not([data-db-type=form-step]):not([data-db-type=form-steps-nav]):not([data-db-type=submit-button]):not([data-db-form-status]):not([data-db-type=honeypot]), [data-db-type=heading], [data-db-type=text], [data-db-type=divider]',
      classes: ['db-form-step'],
      attributes: {
        'data-db-type': 'form-step',
        'data-db-form-child': 'true',
        'data-db-form-step': 'true',
        'data-db-legend': 'Step 1',
      },
      components: [
        {
          type: 'db-field-label',
          tagName: 'legend',
          classes: ['db-field-label', 'db-form-step-title'],
          attributes: { 'data-db-radio-legend': 'true' },
          components: escapeHtmlText('Step 1'),
        },
      ],
      traits: [{ type: 'text', name: 'data-db-legend', label: 'Step title' }],
    },
  },
});

export default buildFormStepTypeDefinition;
