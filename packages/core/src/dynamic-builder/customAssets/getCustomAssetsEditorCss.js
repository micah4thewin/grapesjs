const getCustomAssetsEditorCss = () => `
.gjs-db-custom-assets { gap: var(--gjs-db-gap-3); }
.gjs-db-custom-tabs { display: flex; gap: var(--gjs-db-gap-2); border-bottom: 1px solid var(--gjs-db-line); }
.gjs-db-custom-tab {
  min-height: 34px; padding: 0 var(--gjs-db-gap-3); border: 0; border-bottom: 2px solid transparent;
  background: none; color: var(--gjs-db-muted); font-family: var(--gjs-db-font-ui); font-size: 0.8rem;
  font-weight: var(--gjs-db-w-medium); cursor: pointer;
}
.gjs-db-custom-tab:hover { color: var(--gjs-db-fg); }
.gjs-db-custom-tab[aria-selected='true'] { color: var(--gjs-db-accent); border-bottom-color: var(--gjs-db-accent); }
.gjs-db-custom-warning { color: var(--gjs-db-warning, var(--gjs-db-muted)); }
.gjs-db-custom-list { display: grid; gap: var(--gjs-db-gap-2); max-height: 40vh; overflow-y: auto; padding-right: 4px; }
.gjs-db-custom-card {
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto; align-items: center;
  gap: var(--gjs-db-gap-3); padding: var(--gjs-db-gap-2) var(--gjs-db-gap-3);
  border: 1px solid var(--gjs-db-line); border-radius: var(--gjs-db-r-2); background: var(--gjs-db-panel);
}
.gjs-db-custom-card-icon { grid-template-columns: 44px minmax(0, 1fr) auto; }
.gjs-db-custom-sample { font-size: 1.2rem; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gjs-db-custom-icon-preview { display: inline-flex; align-items: center; justify-content: center; min-height: 32px; color: var(--gjs-db-fg); }
.gjs-db-custom-card-meta { display: flex; flex-direction: column; gap: 2px; font-size: 0.74rem; min-width: 0; }
.gjs-db-custom-card-meta strong { font-weight: var(--gjs-db-w-medium); overflow: hidden; text-overflow: ellipsis; }
.gjs-db-custom-card-meta em { font-style: normal; color: var(--gjs-db-faint); }
.gjs-db-custom-card .gjs-db-button { min-height: 32px; }
input[type='file'].gjs-db-field-input { padding: 0.35em 0.5em; line-height: 1.9; cursor: pointer; }
@media (max-width: 760px) { .gjs-db-custom-card { grid-template-columns: 1fr; } }
`;

export default getCustomAssetsEditorCss;
