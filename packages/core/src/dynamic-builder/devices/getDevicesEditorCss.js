const getDevicesEditorCss = () => `
.gjs-db-device-visibility { display: flex; flex-direction: column; gap: 6px; padding: 6px 2px; }
.gjs-db-device-visibility-option { display: flex; align-items: center; gap: 8px; min-height: 32px; cursor: pointer; font-size: 0.78rem; color: var(--gjs-db-fg); }
.gjs-db-device-visibility-option input { width: 1.05rem; height: 1.05rem; margin: 0; accent-color: var(--gjs-db-accent); cursor: pointer; }
.gjs-db-device-visibility-option small { margin-left: auto; font-size: 0.68rem; }
.gjs-db-device-readout {
  position: absolute; right: 14px; bottom: 14px; z-index: 5; display: flex; align-items: center; gap: 6px; padding: 4px 6px 4px 12px;
  border-radius: var(--gjs-db-r-pill); background: var(--gjs-db-panel); box-shadow: var(--gjs-db-lift-2); color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui); font-size: 0.78rem; font-weight: var(--gjs-db-w-medium); pointer-events: auto;
}
.gjs-db-device-readout button {
  min-height: 32px; padding: 0 10px; border: none; border-radius: var(--gjs-db-r-pill); background: var(--gjs-db-sunken);
  color: var(--gjs-db-fg); font-family: var(--gjs-db-font-ui); font-size: 0.78rem; cursor: pointer;
}
.gjs-db-device-readout button:hover { background: var(--gjs-db-hover); }
.gjs-db-device-readout button:focus-visible { outline: 2px solid var(--gjs-db-focus); }
.gjs-db-device-width-form .gjs-db-field-input { max-width: 200px; }
`;

export default getDevicesEditorCss;
