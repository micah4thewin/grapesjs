const getDesignKitsEditorCss = () => `
.gjs-db-kits [data-db-kit-grids] { display: flex; flex-direction: column; gap: var(--gjs-db-gap-4); }
.gjs-db-kit-section { display: flex; flex-direction: column; gap: var(--gjs-db-gap-3); }
.gjs-db-kit-section [data-db-kit-empty][hidden] { display: none; }
.gjs-db-kit-item { position: relative; display: flex; }
.gjs-db-kit-item .gjs-db-kit-card { flex: 1 1 auto; width: 100%; align-items: stretch; }
.gjs-db-kit-mock {
  flex: 0 0 auto; display: flex; flex-direction: column; justify-content: center; gap: 4px; width: 88px; padding: 8px;
  border: 1px solid; border-radius: var(--gjs-db-r-2); font-size: 0.62rem; line-height: 1.2; overflow: hidden;
}
.gjs-db-kit-mock-title { font-size: 1.05rem; font-weight: 700; letter-spacing: -0.01em; }
.gjs-db-kit-mock-text { white-space: nowrap; }
.gjs-db-kit-mock-button { align-self: flex-start; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
.gjs-db-kit-body { display: flex; flex-direction: column; justify-content: center; gap: 2px; }
.gjs-db-kit-fonts { display: block; font-size: 0.7rem; color: var(--gjs-db-faint); }
.gjs-db-kit-card .gjs-db-kit-swatches { align-self: center; flex-wrap: wrap; width: 36px; justify-content: flex-end; }
.gjs-db-kit-remove {
  position: absolute; top: 6px; right: 6px; display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; padding: 0; border: none; border-radius: var(--gjs-db-r-2); background: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1); color: var(--gjs-db-muted); cursor: pointer;
}
.gjs-db-kit-remove:hover { color: var(--gjs-db-error); background: var(--gjs-db-hover); }
.gjs-db-kit-remove:focus-visible { outline: 2px solid var(--gjs-db-focus); }
.gjs-db-kit-save-row { display: flex; flex-direction: column; gap: var(--gjs-db-gap-2); padding-top: var(--gjs-db-gap-3); border-top: 1px solid var(--gjs-db-line); }
.gjs-db-kit-save-controls { display: flex; flex-wrap: wrap; align-items: center; gap: var(--gjs-db-gap-2); }
.gjs-db-kit-save-controls .gjs-db-field-input { flex: 1 1 200px; min-height: 32px; }
.gjs-db-kit-save-controls [data-db-kit-import-input] { display: none; }
`;

export default getDesignKitsEditorCss;
