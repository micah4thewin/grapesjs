const getPhotoEditorEditorCss = () => `
.gjs-db-photo-modal .gjs-mdl-dialog { max-width: 1040px; }
.gjs-db-photo-layout { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr); gap: var(--gjs-db-gap-4); }
.gjs-db-photo-stage { display: grid; gap: var(--gjs-db-gap-2); align-content: start; }
.gjs-db-photo-canvas-host {
  display: grid; place-items: center; min-height: 260px; padding: var(--gjs-db-gap-2); border-radius: var(--gjs-db-r-3);
  background: var(--gjs-db-sunken); box-shadow: var(--gjs-db-press-1);
}
.gjs-db-photo-canvas { max-width: 100%; max-height: 52vh; border-radius: var(--gjs-db-r-2); box-shadow: var(--gjs-db-lift-2); }
.gjs-db-photo-readout-line { display: flex; justify-content: space-between; margin: 0; font-variant-numeric: tabular-nums; }
.gjs-db-photo-controls { display: grid; gap: var(--gjs-db-gap-2); max-height: 60vh; overflow-y: auto; padding-right: 4px; }
.gjs-db-photo-controls .gjs-db-icon-group-title { margin-top: var(--gjs-db-gap-2); }
.gjs-db-photo-actions { display: flex; flex-wrap: wrap; gap: var(--gjs-db-gap-1); }
.gjs-db-photo-actions .gjs-db-button { font-size: 0.72rem; padding: 0.4em 0.7em; }
.gjs-db-photo-slider { display: grid; gap: 2px; font-family: var(--gjs-db-font-ui); font-size: 0.72rem; color: var(--gjs-db-muted); }
.gjs-db-photo-slider span { display: flex; justify-content: space-between; }
.gjs-db-photo-slider b { color: var(--gjs-db-fg); font-weight: var(--gjs-db-w-medium); font-variant-numeric: tabular-nums; }
.gjs-db-photo-slider input[type='range'] { width: 100%; accent-color: var(--gjs-db-accent); }
@media (max-width: 820px) { .gjs-db-photo-layout { grid-template-columns: 1fr; } .gjs-db-photo-controls { max-height: none; } }
`;

export default getPhotoEditorEditorCss;
