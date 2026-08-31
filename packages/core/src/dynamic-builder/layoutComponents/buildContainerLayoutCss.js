const buildContainerLayoutCss = (containerWidthRecord) =>
  [
    `.db-container { width: 100%; max-width: ${containerWidthRecord.contained}; margin-left: auto; margin-right: auto; }`,
    `.db-section[data-db-layout=narrow] > .db-container { max-width: ${containerWidthRecord.narrow}; }`,
    `.db-section[data-db-layout=wide] > .db-container { max-width: ${containerWidthRecord.wide}; }`,
    '.db-section[data-db-layout=full] > .db-container { max-width: 100%; padding-left: var(--db-space-5, 1.5rem); padding-right: var(--db-space-5, 1.5rem); }',
    '.db-container:empty { min-height: var(--db-space-8, 3rem); }',
  ].join('\n');

export default buildContainerLayoutCss;
