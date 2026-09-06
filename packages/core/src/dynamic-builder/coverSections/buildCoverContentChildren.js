const buildCoverContentChildren = (coverTextRecord) => [
  {
    type: 'db-container',
    classes: ['db-cover-inner'],
    attributes: { 'data-db-cover-inner': 'true' },
    draggable: false,
    removable: false,
    copyable: false,
    components: [
      { type: 'db-text', attributes: { 'data-db-variant': 'eyebrow' }, components: coverTextRecord.eyebrowText },
      {
        type: 'db-heading',
        attributes: { 'data-db-level': 'h1', 'data-db-size': 'display' },
        components: coverTextRecord.headingText,
      },
      { type: 'db-text', attributes: { 'data-db-variant': 'lead' }, components: coverTextRecord.bodyText },
      {
        type: 'db-button-group',
        components: [
          {
            type: 'db-button',
            attributes: { 'data-db-variant': 'primary', href: '#contact' },
            components: coverTextRecord.primaryLabel,
          },
          {
            type: 'db-button',
            attributes: { 'data-db-variant': 'ghost', href: '#about' },
            components: coverTextRecord.secondaryLabel,
          },
        ],
      },
    ],
  },
];

export default buildCoverContentChildren;
