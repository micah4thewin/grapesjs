const buildGrapesVariableBridgeCss = () => `
.gjs-editor-cont {
  --gjs-main-color: var(--gjs-db-bg);
  --gjs-primary-color: var(--gjs-db-panel);
  --gjs-secondary-color: var(--gjs-db-fg);
  --gjs-tertiary-color: var(--gjs-db-active);
  --gjs-quaternary-color: var(--gjs-db-fg);
  --gjs-font-color: var(--gjs-db-fg);
  --gjs-font-color-active: var(--gjs-db-fg);
  --gjs-main-dark-color: var(--gjs-db-shade);
  --gjs-secondary-dark-color: var(--gjs-db-sunken);
  --gjs-main-light-color: var(--gjs-db-hover);
  --gjs-secondary-light-color: var(--gjs-db-muted);
  --gjs-soft-light-color: var(--gjs-db-glow);
  --gjs-light-border: var(--gjs-db-line);
  --gjs-arrow-color: var(--gjs-db-muted);
  --gjs-color-blue: var(--gjs-db-focus);
  --gjs-color-red: var(--gjs-db-error);
  --gjs-color-yellow: var(--gjs-db-warning);
  --gjs-color-green: var(--gjs-db-success);
  --gjs-color-highlight: var(--gjs-db-focus);
  --gjs-color-warn: var(--gjs-db-warning);
  --gjs-dark-text-shadow: transparent;
  --gjs-main-font: var(--gjs-db-font-ui);
  --gjs-placeholder-background-color: var(--gjs-db-focus);
  background-color: var(--gjs-db-bg);
  color: var(--gjs-db-fg);
}
.gjs-editor {
  font-family: var(--gjs-db-font-ui);
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-bg);
  -webkit-font-smoothing: antialiased;
}
.gjs-editor-cont ::selection {
  background: var(--gjs-db-selection);
}
.gjs-editor-cont :focus {
  outline: none;
}
.gjs-editor-cont :focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: 1px;
  border-radius: var(--gjs-db-r-1);
}
.gjs-one-bg {
  background-color: var(--gjs-db-bg);
}
.gjs-two-color {
  color: var(--gjs-db-fg);
}
.gjs-three-bg {
  background-color: var(--gjs-db-active);
  color: var(--gjs-db-fg);
}
.gjs-four-color,
.gjs-four-color-h:hover {
  color: var(--gjs-db-fg);
}
.gjs-danger-bg {
  background-color: var(--gjs-db-error);
}
.gjs-danger-color {
  color: var(--gjs-db-error);
}
`;

export default buildGrapesVariableBridgeCss;
