const buildGalleryMediaCss = () =>
  [
    '.db-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }',
    ".db-gallery[data-db-columns='2'] { grid-template-columns: repeat(2, 1fr); }",
    ".db-gallery[data-db-columns='4'] { grid-template-columns: repeat(4, 1fr); }",
    ".db-gallery[data-db-gap='sm'] { gap: 0.5rem; }",
    ".db-gallery[data-db-gap='lg'] { gap: 1.5rem; }",
    '.db-gallery-item { margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }',
    ':where(.db-gallery-item) img {',
    '  width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 0.5rem; cursor: zoom-in;',
    '}',
    ":where(.db-gallery[data-db-aspect='square'] .db-gallery-item) img { aspect-ratio: 1 / 1; }",
    ":where(.db-gallery[data-db-aspect='portrait'] .db-gallery-item) img { aspect-ratio: 3 / 4; }",
    ":where(.db-gallery[data-db-aspect='natural'] .db-gallery-item) img { aspect-ratio: auto; object-fit: unset; }",
    ":where(.db-gallery[data-db-lightbox='false'] .db-gallery-item) img { cursor: default; }",
    '.db-gallery-caption { font-size: 0.875rem; opacity: 0.75; }',
    ".db-gallery-item[data-db-show-caption='false'] .db-gallery-caption { display: none; }",
    '@media (max-width: 640px) {',
    '  .db-gallery { grid-template-columns: 1fr; }',
    "  .db-gallery[data-db-mobile-columns='2'] { grid-template-columns: repeat(2, 1fr); }",
    '}',
  ].join('\n');

export default buildGalleryMediaCss;
