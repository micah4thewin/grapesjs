const getStockPhotosEditorCss = () => `
.gjs-db-stock-modal .gjs-mdl-dialog { width: min(1000px, 96vw); }
.gjs-db-stock-search { display: flex; gap: var(--gjs-db-gap-2); align-items: flex-end; }
.gjs-db-stock-field { flex: 1 1 auto; }
.gjs-db-stock-search .gjs-db-button { display: inline-flex; align-items: center; gap: 6px; min-height: 34px; }
.gjs-db-stock-chips { display: flex; flex-wrap: wrap; gap: var(--gjs-db-gap-2); }
.gjs-db-stock-chip {
  min-height: 32px; padding: 0 12px; border-radius: var(--gjs-db-r-pill); border: 1px solid var(--gjs-db-line);
  background: var(--gjs-db-panel); color: var(--gjs-db-fg); cursor: pointer; font: inherit; font-size: 0.78rem;
}
.gjs-db-stock-chip:hover { background: var(--gjs-db-hover); border-color: var(--gjs-db-accent-line); }
.gjs-db-stock-chip:focus-visible { outline: 2px solid var(--gjs-db-focus); outline-offset: 2px; }
.gjs-db-stock-status { min-height: 18px; margin: 0; }
.gjs-db-stock-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--gjs-db-gap-3);
  max-height: 50vh; overflow-y: auto; padding: 2px;
}
.gjs-db-stock-card { margin: 0; display: grid; gap: 4px; align-content: start; }
.gjs-db-stock-choice {
  padding: 0; margin: 0; border: 1px solid var(--gjs-db-line); border-radius: var(--gjs-db-r-2); overflow: hidden;
  background: var(--gjs-db-sunken); cursor: pointer; aspect-ratio: 4 / 3; min-height: 110px; display: block; width: 100%;
}
.gjs-db-stock-choice:hover { border-color: var(--gjs-db-accent); }
.gjs-db-stock-choice:focus-visible { outline: 2px solid var(--gjs-db-focus); outline-offset: 2px; }
.gjs-db-stock-thumb { width: 100%; height: 100%; object-fit: cover; display: block; }
.gjs-db-stock-credit {
  display: flex; justify-content: space-between; gap: var(--gjs-db-gap-1); font-size: 0.68rem;
  color: var(--gjs-db-muted); line-height: 1.35;
}
.gjs-db-stock-credit a { color: inherit; text-decoration: underline; }
.gjs-db-stock-credit a:hover { color: var(--gjs-db-accent); }
.gjs-db-stock-author { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.gjs-db-stock-licence { flex: 0 0 auto; }
.gjs-db-stock-empty { grid-column: 1 / -1; margin: 0; padding: var(--gjs-db-gap-5) var(--gjs-db-gap-4); text-align: center; }
.gjs-db-stock-open { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; margin-bottom: 8px; }
@media (max-width: 760px) {
  .gjs-db-stock-search { flex-direction: column; align-items: stretch; }
  .gjs-db-stock-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); max-height: 42vh; }
}
.gjs-db-stock-modal .gjs-db-button-row {
  margin-top: var(--gjs-db-gap-4);
  padding-bottom: var(--gjs-db-gap-2);
}
.gjs-db-stock-note,
.gjs-db-stock-status {
  color: var(--gjs-db-muted);
}
.gjs-db-stock-empty {
  color: var(--gjs-db-muted);
  padding: var(--gjs-db-gap-5) var(--gjs-db-gap-3);
  text-align: center;
}
`;

export default getStockPhotosEditorCss;
