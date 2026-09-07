import escapeHtmlText from '../support/escapeHtmlText.js';
import getFormChildDropTargets from './getFormChildDropTargets.js';

const buildConsentCheckboxTypeDefinition = (formTextDefaults) => ({
  type: 'db-consent-checkbox',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'consent-checkbox') && { type: 'db-consent-checkbox' },
  model: {
    defaults: {
      tagName: 'label',
      name: 'Privacy consent',
      draggable: getFormChildDropTargets(),
      droppable: false,
      classes: ['db-choice', 'db-consent-checkbox'],
      attributes: {
        'data-db-type': 'consent-checkbox',
        'data-db-form-child': 'true',
        'data-db-name': 'consent',
        'data-db-privacy-url': '',
        'data-db-consent-text': formTextDefaults.consentIntroText,
        'data-db-link-text': formTextDefaults.consentLinkText,
        'data-db-required': 'true',
      },
      components: [
        {
          tagName: 'input',
          attributes: { type: 'checkbox', name: 'consent', value: 'yes', required: 'required' },
          selectable: false,
          hoverable: false,
          layerable: false,
          draggable: false,
          removable: false,
          copyable: false,
          traits: [],
        },
        {
          tagName: 'span',
          classes: ['db-choice-text'],
          attributes: { 'data-db-consent-text': 'true' },
          draggable: false,
          removable: false,
          copyable: false,
          traits: [],
          components:
            escapeHtmlText(formTextDefaults.consentIntroText) +
            ' <a data-db-privacy-link="true" href="#" target="_blank" rel="noopener">' +
            escapeHtmlText(formTextDefaults.consentLinkText) +
            '</a>',
        },
      ],
      traits: [
        { type: 'db-page-url', name: 'data-db-privacy-url', label: 'Privacy policy page' },
        { type: 'text', name: 'data-db-consent-text', label: 'Sentence before the link' },
        { type: 'text', name: 'data-db-link-text', label: 'Link text' },
        {
          type: 'checkbox',
          name: 'data-db-required',
          label: 'Must be ticked',
          valueTrue: 'true',
          valueFalse: 'false',
        },
        { type: 'text', name: 'data-db-name', label: 'Field name', placeholder: 'consent' },
      ],
    },
  },
});

export default buildConsentCheckboxTypeDefinition;
