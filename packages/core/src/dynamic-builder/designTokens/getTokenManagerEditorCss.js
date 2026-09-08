const getTokenManagerEditorCss = () => `
.gjs-db-token-tabs { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; border-radius: var(--gjs-db-r-3); background: var(--gjs-db-sunken); box-shadow: var(--gjs-db-press-1); }
.gjs-db-token-tab {
  flex: 1 1 auto; min-height: 32px; padding: 0 12px; border: none; border-radius: var(--gjs-db-r-2); background: transparent;
  color: var(--gjs-db-muted); font-family: var(--gjs-db-font-ui); font-size: 0.78rem; font-weight: var(--gjs-db-w-medium); cursor: pointer;
  transition: background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft), color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-token-tab:hover { color: var(--gjs-db-fg); background: var(--gjs-db-hover); }
.gjs-db-token-tab[aria-selected='true'] { background: var(--gjs-db-panel); color: var(--gjs-db-fg); box-shadow: var(--gjs-db-lift-1); }
.gjs-db-token-tab:focus-visible { outline: 2px solid var(--gjs-db-focus); outline-offset: 2px; }
.gjs-db-token-panel { display: flex; flex-direction: column; gap: var(--gjs-db-gap-3); }
.gjs-db-token-panel[hidden], .gjs-db-token-reset-confirm[hidden], .gjs-db-token-reset[hidden] { display: none; }
.gjs-db-token-field .gjs-db-field-label { text-transform: none; letter-spacing: 0; font-size: 0.78rem; color: var(--gjs-db-fg); }
.gjs-db-token-row { display: flex; align-items: center; gap: var(--gjs-db-gap-2); }
.gjs-db-token-row .gjs-db-field-input { flex: 1 1 auto; min-height: 32px; }
.gjs-db-token-swatch { flex: 0 0 auto; width: 38px; height: 32px; padding: 2px; border: 1px solid var(--gjs-db-line); border-radius: var(--gjs-db-r-2); background: transparent; cursor: pointer; }
.gjs-db-token-reset {
  flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 0;
  border: none; border-radius: var(--gjs-db-r-2); background: transparent; color: var(--gjs-db-muted); cursor: pointer;
}
.gjs-db-token-reset:hover { background: var(--gjs-db-hover); color: var(--gjs-db-fg); }
.gjs-db-token-reset:focus-visible { outline: 2px solid var(--gjs-db-focus); }
.gjs-db-token-default-badge { margin-left: 6px; vertical-align: middle; }
.gjs-db-token-field .gjs-db-field-help code { font-family: var(--gjs-db-font-mono); font-size: 0.68rem; color: var(--gjs-db-faint); }
.gjs-db-token-contrast, .gjs-db-token-usage, .gjs-db-token-error { font-size: 0.78rem; line-height: 1.4; }
.gjs-db-token-contrast { font-weight: var(--gjs-db-w-medium); }
.gjs-db-token-contrast[data-kind='success'] { color: var(--gjs-db-success); }
.gjs-db-token-contrast[data-kind='warning'] { color: var(--gjs-db-warning); }
.gjs-db-token-contrast[data-kind='error'], .gjs-db-token-error { color: var(--gjs-db-error); }
.gjs-db-token-starter {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-3); border-radius: var(--gjs-db-r-3); background: var(--gjs-db-accent-soft); font-size: 0.78rem;
}
.gjs-db-token-reset-confirm {
  display: flex; flex-wrap: wrap; align-items: center; gap: var(--gjs-db-gap-2); padding: var(--gjs-db-gap-3);
  border-radius: var(--gjs-db-r-3); background: var(--gjs-db-sunken); box-shadow: var(--gjs-db-press-1); font-size: 0.8rem;
}
.gjs-db-token-reset-confirm span { flex: 1 1 100%; }
`;

export default getTokenManagerEditorCss;
