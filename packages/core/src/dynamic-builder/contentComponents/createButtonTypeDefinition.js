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
      attributes: { 'data-db-type': 'button', 'data-db-variant': 'primary', 'data-db-size': 'md', href: '#' },
      classes: ['db-button'],
      components: contentTextDefaults.buttonLabelText,
      traits: [
        { type: 'db-url', name: 'href', label: 'Link URL', placeholder: 'https://example.com/page' },
        {
          type: 'select',
          name: 'data-db-variant',
          label: 'Variant',
          options: [
            { id: 'primary', label: 'Primary' },
            { id: 'secondary', label: 'Secondary' },
            { id: 'outline', label: 'Outline' },
            { id: 'ghost', label: 'Ghost' },
            { id: 'danger', label: 'Danger' },
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
        { type: 'checkbox', name: 'data-db-full-mobile', label: 'Full width on mobile', valueTrue: 'true' },
        { type: 'checkbox', name: 'target', label: 'Open in new tab', valueTrue: '_blank' },
        { type: 'checkbox', name: 'download', label: 'Download link' },
        { type: 'db-aria-label', name: 'aria-label', label: 'ARIA label' },
      ],
    },
  },
});

export default createButtonTypeDefinition;
