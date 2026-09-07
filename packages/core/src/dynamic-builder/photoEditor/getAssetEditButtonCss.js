const getAssetEditButtonCss = () => `
.gjs-db-asset-edit {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: var(--gjs-db-tap);
  margin-top: var(--gjs-db-gap-1);
  padding: 0 10px;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-panel);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-2);
  font-weight: var(--gjs-db-w-medium);
  cursor: pointer;
}
.gjs-db-asset-edit:hover {
  border-color: var(--gjs-db-accent-line);
  background-color: var(--gjs-db-hover);
  color: var(--gjs-db-accent);
}
.gjs-db-asset-edit:focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: 2px;
}
`;

export default getAssetEditButtonCss;
