const getTemplateManagerEditorCss = () => `
.gjs-db-template-manager-modal .gjs-mdl-dialog { width: min(1080px, 96vw); }
.gjs-db-templates { display: flex; flex-direction: column; gap: var(--gjs-db-gap-3); }
.gjs-db-template-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--gjs-db-line); }
.gjs-db-template-tab {
  min-height: 34px; padding: 0 var(--gjs-db-gap-3); border: 0; border-bottom: 2px solid transparent;
  background: none; color: var(--gjs-db-faint); font: inherit; cursor: pointer;
}
.gjs-db-template-tab:hover { color: var(--gjs-db-fg); }
.gjs-db-template-tab[aria-selected='true'] { color: var(--gjs-db-fg); border-bottom-color: var(--gjs-db-accent); }
.gjs-db-template-tab:focus-visible { outline: 2px solid var(--gjs-db-focus); outline-offset: -2px; }
.gjs-db-template-toolbar { display: grid; grid-template-columns: 2fr 1fr; gap: var(--gjs-db-gap-3); }
.gjs-db-template-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--gjs-db-gap-3);
  max-height: 56vh; overflow-y: auto; padding: 2px;
}
.gjs-db-template-card {
  display: flex; flex-direction: column; gap: var(--gjs-db-gap-2); padding: var(--gjs-db-gap-3);
  border: 1px solid var(--gjs-db-line); border-radius: var(--gjs-db-r-3); background: var(--gjs-db-panel);
}
.gjs-db-template-card .gjs-db-template-preview-frame { max-height: none; overflow: hidden; }
.gjs-db-template-card-body { display: flex; flex-direction: column; gap: 6px; }
.gjs-db-template-card-title {
  display: flex; align-items: center; justify-content: space-between; gap: var(--gjs-db-gap-2);
  margin: 0; font-size: 0.86rem; font-weight: var(--gjs-db-w-medium);
}
.gjs-db-template-card .gjs-db-button-row { margin-top: auto; flex-wrap: wrap; }
.gjs-db-template-card .gjs-db-button { min-height: 32px; }
.gjs-db-template-footer { justify-content: flex-start; flex-wrap: wrap; }
.gjs-db-template-save-modal .gjs-mdl-dialog { width: min(520px, 94vw); }
@media (max-width: 760px) {
  .gjs-db-template-toolbar { grid-template-columns: 1fr; }
  .gjs-db-template-grid { grid-template-columns: 1fr; max-height: 48vh; }
}
`;

export default getTemplateManagerEditorCss;
