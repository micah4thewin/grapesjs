import escapeHtmlText from '../support/escapeHtmlText.js';
import getSubmitButtonVariantOptions from './getSubmitButtonVariantOptions.js';
import runSubmitButtonBehavior from './runSubmitButtonBehavior.js';

const buildSubmitButtonTypeDefinition = (formTextDefaults) => ({
  type: 'db-submit-button',
  extend: 'text',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'submit-button') && { type: 'db-submit-button' },
  model: {
    defaults: {
      tagName: 'button',
      name: 'Send button',
      draggable: '[data-db-type=form]',
      droppable: false,
      copyable: false,
      classes: ['db-button', 'db-button-primary', 'db-button-md', 'db-submit-button'],
      attributes: {
        'data-db-type': 'submit-button',
        'data-db-form-child': 'true',
        type: 'submit',
        'data-db-variant': 'primary',
        'data-db-size': 'md',
        'data-db-sending-label': formTextDefaults.sendingLabelText,
      },
      components: escapeHtmlText(formTextDefaults.submitLabelText),
      script: runSubmitButtonBehavior,
      traits: [
        { type: 'text', name: 'data-db-sending-label', label: 'Label while sending', placeholder: 'Sending...' },
        { type: 'select', name: 'data-db-variant', label: 'Style', options: getSubmitButtonVariantOptions() },
        {
          type: 'select',
          name: 'data-db-size',
          label: 'Size',
          options: [
            { id: 'sm', label: 'Small' },
            { id: 'md', label: 'Medium' },
            { id: 'lg', label: 'Large' },
          ],
        },
        { type: 'db-aria-label', name: 'aria-label', label: 'Screen reader label' },
      ],
    },
  },
});

export default buildSubmitButtonTypeDefinition;
