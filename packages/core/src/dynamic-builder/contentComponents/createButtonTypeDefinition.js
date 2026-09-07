import writeComponentAttributeValue from '../traits/writeComponentAttributeValue.js';
import buildOpenInTraitDefinition from './buildOpenInTraitDefinition.js';

const createButtonTypeDefinition = (contentTextDefaults) => ({
  type: 'db-button',
  extend: 'link',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'button' && { type: 'db-button' },
  model: {
    defaults: {
      tagName: 'a',
      name: 'Button',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'button', 'data-db-variant': 'primary', 'data-db-size': 'md' },
      classes: ['db-button'],
      components: contentTextDefaults.buttonLabelText,
      traits: [
        { type: 'db-page-link', name: 'pageLink', label: 'Link to page' },
        { type: 'db-url', name: 'href', label: 'Link URL', placeholder: 'https://example.com/page' },
        {
          type: 'select',
          name: 'data-db-variant',
          label: 'Style',
          options: [
            { id: 'primary', label: 'Filled' },
            { id: 'secondary', label: 'Soft' },
            { id: 'outline', label: 'Outlined' },
            { id: 'ghost', label: 'Text only' },
            { id: 'link', label: 'Underlined link' },
            { id: 'danger', label: 'Red (for risky actions)' },
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
        { type: 'checkbox', name: 'data-db-full-mobile', label: 'Full width on phones', valueTrue: 'true' },
        buildOpenInTraitDefinition(),
        {
          type: 'text',
          name: 'download',
          label: 'Download as file name',
          placeholder: 'e.g. brochure.pdf',
          setValue: ({ component, value }) =>
            writeComponentAttributeValue(component, 'download', String(value || '').trim()),
        },
        { type: 'db-aria-label', name: 'aria-label', label: 'Screen reader label' },
      ],
    },
  },
});

export default createButtonTypeDefinition;
