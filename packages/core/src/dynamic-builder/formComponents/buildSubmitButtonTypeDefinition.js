import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSubmitButtonTypeDefinition = (formTextDefaults) => ({
  type: 'db-submit-button',
  extend: 'text',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'submit-button') && { type: 'db-submit-button' },
  model: {
    defaults: {
      tagName: 'button',
      name: 'Submit button',
      draggable: '[data-db-type=form]',
      droppable: false,
      classes: ['db-button', 'db-submit-button'],
      attributes: {
        'data-db-type': 'submit-button',
        'data-db-form-child': 'true',
        type: 'submit',
        'data-db-variant': 'primary',
        'data-db-size': 'md',
      },
      components: escapeHtmlText(formTextDefaults.submitLabelText),
      traits: [
        {
          type: 'select',
          name: 'data-db-variant',
          label: 'Variant',
          options: [
            { id: 'primary', label: 'Primary' },
            { id: 'secondary', label: 'Secondary' },
            { id: 'outline', label: 'Outline' },
          ],
        },
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
        { type: 'db-aria-label', name: 'aria-label', label: 'ARIA label' },
      ],
    },
  },
});

export default buildSubmitButtonTypeDefinition;
