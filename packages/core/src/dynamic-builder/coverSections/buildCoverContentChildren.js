const buildCoverContentChildren = (coverTextRecord) => [
  {
    type: 'db-container',
    name: 'Cover content',
    classes: ['db-cover-inner'],
    attributes: { 'data-db-cover-inner': 'true' },
    draggable: false,
    removable: false,
    copyable: false,
    components: [
      {
        type: 'db-text',
        name: 'Small label',
        attributes: { 'data-db-variant': 'eyebrow' },
        components: coverTextRecord.eyebrowText,
      },
      {
        type: 'db-heading',
        name: 'Cover headline',
        attributes: { 'data-db-level': '1', 'data-db-size': 'display' },
        components: coverTextRecord.headingText,
      },
      {
        type: 'db-text',
        name: 'Cover text',
        attributes: { 'data-db-variant': 'lead' },
        components: coverTextRecord.bodyText,
      },
      {
        type: 'db-button-group',
        name: 'Cover buttons',
        components: [
          {
            type: 'db-button',
            name: 'Main button',
            attributes: { 'data-db-variant': 'primary', href: '#contact' },
            components: coverTextRecord.primaryLabel,
          },
          {
            type: 'db-button',
            name: 'Second button',
            attributes: { 'data-db-variant': 'ghost', href: '#about' },
            components: coverTextRecord.secondaryLabel,
          },
        ],
      },
    ],
  },
];

export default buildCoverContentChildren;
