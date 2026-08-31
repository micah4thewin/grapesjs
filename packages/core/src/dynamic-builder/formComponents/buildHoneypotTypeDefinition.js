import escapeHtmlText from '../support/escapeHtmlText.js';

const buildHoneypotTypeDefinition = (formTextDefaults) => ({
  type: 'db-honeypot',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'honeypot') && { type: 'db-honeypot' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Honeypot',
      draggable: '[data-db-type=form]',
      droppable: false,
      copyable: false,
      classes: ['db-honeypot'],
      attributes: {
        'data-db-type': 'honeypot',
        'data-db-form-child': 'true',
        'data-db-honeypot': 'true',
        'aria-hidden': 'true',
      },
      components:
        '<label>' +
        escapeHtmlText(formTextDefaults.honeypotLabelText) +
        '<input type="text" name="website" tabindex="-1" aria-hidden="true" autocomplete="off"></label>',
      traits: [],
    },
  },
});

export default buildHoneypotTypeDefinition;
