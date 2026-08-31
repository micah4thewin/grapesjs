const buildLightPaletteCssDeclarations = () => `
  color-scheme: light;
  --gjs-db-bg: #e8eaed;
  --gjs-db-panel: #edeff2;
  --gjs-db-page: #f2f4f6;
  --gjs-db-sunken: #e1e4e8;
  --gjs-db-hover: #e4e7eb;
  --gjs-db-active: #dcdfe4;
  --gjs-db-fg: #1b1d20;
  --gjs-db-muted: #5b6067;
  --gjs-db-faint: #50565e;
  --gjs-db-line: #d3d7dd;
  --gjs-db-focus: #1b1d20;
  --gjs-db-shade: rgba(157, 165, 176, 0.38);
  --gjs-db-glow: rgba(255, 255, 255, 0.55);
  --gjs-db-overlay: rgba(226, 229, 233, 0.72);
  --gjs-db-selection: rgba(27, 29, 32, 0.14);
  --gjs-db-success: #2f7d4f;
  --gjs-db-warning: #8a6a1f;
  --gjs-db-error: #9c3b31;
`;

export default buildLightPaletteCssDeclarations;
