const getStyleSectorEditorCss = () => `
.gjs-sm-property { position: relative; }
.gjs-sm-property > .gjs-sm-label { display: flex; align-items: center; gap: 4px; min-height: 26px; }
.gjs-sm-property > .gjs-sm-label .gjs-sm-icon { flex: 1 1 auto; }
.gjs-sm-property .gjs-field { min-height: 28px; }
.gjs-db-preset-field { display: flex; flex-direction: column; gap: 4px; }
.gjs-db-preset-field .gjs-db-preset-custom[hidden] { display: none; }
.gjs-db-preset-field select, .gjs-db-preset-field input { width: 100%; box-sizing: border-box; }
.gjs-db-token-bind {
  flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; min-width: 32px; height: 26px;
  padding: 0; border: none; border-radius: var(--gjs-db-r-1); background: transparent; color: var(--gjs-db-faint); cursor: pointer;
  transition: color var(--gjs-db-dur-1) var(--gjs-db-ease-soft), background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-token-bind:hover, .gjs-db-token-bind[aria-expanded='true'] { color: var(--gjs-db-fg); background: var(--gjs-db-hover); }
.gjs-db-token-bind[data-db-token-bound='true'] { color: var(--gjs-db-accent); }
.gjs-db-token-bind:focus-visible { outline: 2px solid var(--gjs-db-focus); outline-offset: -2px; }
.gjs-db-token-menu { position: absolute; right: 0; top: 26px; z-index: 40; min-width: 210px; max-height: 260px; overflow-y: auto; }
.gjs-db-token-menu .gjs-db-menu-item { min-height: 32px; }
.gjs-db-token-dot { flex: 0 0 auto; width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--gjs-db-line); }
.gjs-db-token-menu-value { margin-left: auto; font-family: var(--gjs-db-font-mono); font-size: 0.66rem; color: var(--gjs-db-faint); }
.gjs-db-style-scope { display: flex; flex-direction: column; gap: 6px; margin-bottom: var(--gjs-db-gap-2); padding-bottom: var(--gjs-db-gap-2); border-bottom: 1px solid var(--gjs-db-line); font-family: var(--gjs-db-font-ui); }
.gjs-db-style-scope-label { font-size: 0.7rem; font-weight: var(--gjs-db-w-bold); color: var(--gjs-db-muted); text-transform: uppercase; letter-spacing: 0.08em; }
.gjs-db-style-scope-buttons { display: flex; gap: 4px; padding: 3px; border-radius: var(--gjs-db-r-2); background: var(--gjs-db-sunken); box-shadow: var(--gjs-db-press-1); }
.gjs-db-style-scope-button {
  flex: 1 1 0; min-height: 32px; padding: 0 8px; border: none; border-radius: var(--gjs-db-r-1); background: transparent;
  color: var(--gjs-db-muted); font-family: var(--gjs-db-font-ui); font-size: 0.72rem; cursor: pointer;
}
.gjs-db-style-scope-button[aria-pressed='true'] { background: var(--gjs-db-panel); color: var(--gjs-db-fg); box-shadow: var(--gjs-db-lift-1); }
.gjs-db-style-scope-button:disabled { opacity: 0.5; cursor: not-allowed; }
.gjs-db-style-scope-button:focus-visible { outline: 2px solid var(--gjs-db-focus); outline-offset: -2px; }
.gjs-db-style-scope-hint { font-size: 0.7rem; line-height: 1.4; }
`;

export default getStyleSectorEditorCss;
