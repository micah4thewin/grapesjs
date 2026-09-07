const getSectionAlignmentCss = () =>
  [
    '.db-align-center { text-align: center; }',
    '.db-align-center .db-text, .db-align-center .db-heading { margin-left: auto; margin-right: auto; }',
    '.db-align-center .db-button-group { justify-content: center; }',
    '.db-align-center .db-social-links { justify-content: center; }',
    '.db-align-center .db-countdown { justify-content: center; }',
    '.db-align-center .db-form { margin-left: auto; margin-right: auto; text-align: start; }',
  ].join('\n');

export default getSectionAlignmentCss;
