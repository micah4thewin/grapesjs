const buildCustomCodeSiteCss = () =>
  [
    '.db-custom-html { display: block; }',
    '.db-custom-html-note { margin: 0; color: #64748b; font-size: 14px; line-height: 1.5; }',
    '[data-db-type="custom-css"], [data-db-type="custom-script"] { display: none; }',
  ].join('\n');

export default buildCustomCodeSiteCss;
