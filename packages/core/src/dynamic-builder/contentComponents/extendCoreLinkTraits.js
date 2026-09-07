import buildOpenInTraitDefinition from './buildOpenInTraitDefinition.js';

const extendCoreLinkTraits = (editor) => {
  if (!editor.DomComponents.getType('link')) return;
  editor.DomComponents.addType('link', {
    model: {
      defaults: {
        traits: [
          { type: 'db-page-link', name: 'pageLink', label: 'Link to page' },
          { type: 'db-url', name: 'href', label: 'Custom URL', placeholder: 'https://example.com' },
          buildOpenInTraitDefinition(),
          { name: 'title', label: 'Tooltip' },
        ],
      },
    },
  });
};

export default extendCoreLinkTraits;
