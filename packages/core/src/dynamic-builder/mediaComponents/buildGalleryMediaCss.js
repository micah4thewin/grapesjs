const buildGalleryMediaCss = () => {
  const mobileSelectors = ".db-gallery, .db-gallery[data-db-columns='2'], .db-gallery[data-db-columns='4']";
  return [
    '.db-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }',
    ".db-gallery[data-db-columns='2'] { grid-template-columns: repeat(2, 1fr); }",
    ".db-gallery[data-db-columns='4'] { grid-template-columns: repeat(4, 1fr); }",
    ".db-gallery[data-db-gap='sm'] { gap: 0.5rem; }",
    ".db-gallery[data-db-gap='lg'] { gap: 1.5rem; }",
    '.db-gallery-item { margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }',
    '.db-gallery-item img {',
    '  width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 0.5rem; cursor: zoom-in;',
    '}',
    ".db-gallery[data-db-lightbox='false'] img { cursor: default; }",
    '.db-gallery-caption { font-size: 0.875rem; opacity: 0.75; }',
    ".db-gallery-item[data-db-show-caption='false'] .db-gallery-caption { display: none; }",
    '@media (max-width: 640px) {',
    '  ' + mobileSelectors + ' { grid-template-columns: 1fr; }',
    '}',
  ].join('\n');
};

export default buildGalleryMediaCss;
