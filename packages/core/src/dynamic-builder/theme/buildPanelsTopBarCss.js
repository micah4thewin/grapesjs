const buildPanelsTopBarCss = () => `
.gjs-pn-panel {
  padding: var(--gjs-db-gap-1) var(--gjs-db-gap-2);
}
.gjs-pn-commands,
.gjs-pn-options,
.gjs-pn-devices-c {
  background-color: var(--gjs-db-panel);
  border: none;
  box-shadow: var(--gjs-db-seam), 0 1px 0 var(--gjs-db-shade);
  min-height: 42px;
}
.gjs-pn-views {
  background-color: var(--gjs-db-panel);
  border: none;
  border-bottom: 1px solid var(--gjs-db-line);
  box-shadow: none;
}
.gjs-pn-views-container {
  background-color: var(--gjs-db-panel);
  border: none;
  box-shadow: -4px 0 12px var(--gjs-db-shade);
  padding-top: 42px;
}
.gjs-pn-panel .gjs-pn-buttons {
  gap: var(--gjs-db-gap-1);
}
.gjs-pn-devices-c .gjs-device-label {
  font-size: 0.72rem;
  font-weight: var(--gjs-db-w-bold);
  color: var(--gjs-db-faint);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.gjs-pn-devices-c .gjs-field-select {
  min-width: 7rem;
}
.gjs-pn-devices-c .gjs-add-trasp {
  background: transparent;
  border: none;
  border-radius: var(--gjs-db-r-1);
  color: var(--gjs-db-faint);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-pn-devices-c .gjs-add-trasp:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
`;

export default buildPanelsTopBarCss;
