const extendCoreLinkTraits = (editor) => {
  if (!editor.DomComponents.getType('link')) return;
  editor.DomComponents.addType('link', {
    model: {
      defaults: {
        traits: [
          { type: 'db-page-link', name: 'pageLink', label: 'Link to page' },
          { type: 'db-url', name: 'href', label: 'Custom URL', placeholder: 'https://example.com' },
          {
            type: 'select',
            name: 'target',
            label: 'Open in',
            options: [
              { id: '', name: 'Same tab' },
              { id: '_blank', name: 'New tab' },
            ],
          },
          { name: 'title', label: 'Tooltip' },
        ],
      },
    },
  });
};

export default extendCoreLinkTraits;
