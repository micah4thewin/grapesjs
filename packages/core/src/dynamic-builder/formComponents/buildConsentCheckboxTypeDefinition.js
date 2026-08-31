import escapeHtmlText from '../support/escapeHtmlText.js';

const buildConsentCheckboxTypeDefinition = (formTextDefaults) => ({
  type: 'db-consent-checkbox',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'consent-checkbox') && { type: 'db-consent-checkbox' },
  model: {
    defaults: {
      tagName: 'label',
      name: 'Consent checkbox',
      draggable: '[data-db-type=form]',
      droppable: false,
      classes: ['db-choice', 'db-consent-checkbox'],
      attributes: {
        'data-db-type': 'consent-checkbox',
        'data-db-form-child': 'true',
        'data-db-name': 'consent',
        'data-db-privacy-url': '/privacy',
      },
      components: [
        { tagName: 'input', attributes: { type: 'checkbox', name: 'consent', value: 'yes', required: 'required' } },
        {
          tagName: 'span',
          classes: ['db-choice-text'],
          attributes: { 'data-db-choice-text': 'true' },
          components:
            escapeHtmlText(formTextDefaults.consentIntroText) +
            ' <a data-db-privacy-link="true" href="/privacy" target="_blank" rel="noopener">' +
            escapeHtmlText(formTextDefaults.consentLinkText) +
            '</a>',
        },
      ],
      traits: [
        { type: 'db-url', name: 'data-db-privacy-url', label: 'Privacy policy URL', placeholder: '/privacy' },
        { type: 'text', name: 'data-db-name', label: 'Field name' },
      ],
    },
  },
});

export default buildConsentCheckboxTypeDefinition;
