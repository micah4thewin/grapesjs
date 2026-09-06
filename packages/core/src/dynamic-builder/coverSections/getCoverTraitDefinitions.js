const getCoverTraitDefinitions = (mediaKind) => [
  ...(mediaKind === 'video'
    ? [
        {
          type: 'db-url',
          name: 'data-db-cover-video',
          label: 'Video file (mp4 or webm)',
          placeholder: 'https://example.com/hero.mp4',
        },
        { type: 'db-asset', name: 'data-db-cover-poster', label: 'Poster image (shown before play)' },
        {
          type: 'checkbox',
          name: 'data-db-mobile-poster',
          label: 'Show poster only on phones (saves data)',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
      ]
    : [
        { type: 'db-asset', name: 'data-db-cover-image', label: 'Cover photo' },
        {
          type: 'checkbox',
          name: 'data-db-parallax',
          label: 'Gentle parallax on desktop',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
      ]),
  {
    type: 'select',
    name: 'data-db-cover-height',
    label: 'Height',
    default: '85vh',
    options: [
      { id: '100vh', label: 'Full screen' },
      { id: '85vh', label: 'Tall' },
      { id: '60vh', label: 'Medium' },
      { id: 'auto', label: 'Fit content' },
    ],
  },
  {
    type: 'db-slider',
    name: 'data-db-overlay-strength',
    label: 'Overlay darkness',
    min: 0,
    max: 90,
    step: 5,
    default: '45',
  },
  {
    type: 'select',
    name: 'data-db-align',
    label: 'Text placement',
    default: 'center',
    options: [
      { id: 'center', label: 'Centered' },
      { id: 'left', label: 'Left, bottom' },
      { id: 'left-middle', label: 'Left, middle' },
    ],
  },
  { type: 'text', name: 'id', label: 'Anchor id', placeholder: 'top' },
];

export default getCoverTraitDefinitions;
