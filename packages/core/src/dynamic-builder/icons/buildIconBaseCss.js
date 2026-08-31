const buildIconBaseCss = () =>
  [
    '.db-icon { display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 1; gap: 0.35em; }',
    '.db-icon svg { display: block; flex: none; }',
    '.db-icon:not(:only-child) { margin-inline-end: 0.35em; }',
    '.db-icon:not(:only-child):last-child { margin-inline-end: 0; margin-inline-start: 0.35em; }',
  ].join('\n');

export default buildIconBaseCss;
