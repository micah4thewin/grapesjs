const buildThemeAliasTokensCss = () => `
.gjs-editor-cont {
  --gjs-db-canvas: var(--gjs-db-bg);
  --gjs-db-surface: var(--gjs-db-panel);
  --gjs-db-edge: var(--gjs-db-line);
  --gjs-db-ring: var(--gjs-db-focus);
  --gjs-db-text-1: var(--gjs-db-fg);
  --gjs-db-text-2: var(--gjs-db-muted);
  --gjs-db-text-3: var(--gjs-db-faint);
  --gjs-db-text-on-solid: var(--gjs-db-bg);
  --gjs-db-solid: var(--gjs-db-fg);
}
`;

export default buildThemeAliasTokensCss;
