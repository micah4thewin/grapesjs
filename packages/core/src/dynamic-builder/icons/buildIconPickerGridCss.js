const buildIconPickerGridCss = () => `
.gjs-db-icon-results {
  max-height: 46vh;
  overflow-y: auto;
  padding-right: 4px;
}
.gjs-db-icon-group-title {
  margin: var(--gjs-db-gap-3) 0 var(--gjs-db-gap-2);
  color: var(--gjs-db-faint);
  font-size: 0.66rem;
  font-weight: var(--gjs-db-w-bold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.gjs-db-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
  gap: var(--gjs-db-gap-2);
}
.gjs-db-icon-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: var(--gjs-db-gap-2) 4px;
  border: 1px solid transparent;
  border-radius: var(--gjs-db-r-2);
  background-color: transparent;
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  cursor: pointer;
  transition:
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    border-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-icon-cell:hover {
  background-color: var(--gjs-db-hover);
  border-color: var(--gjs-db-line);
}
.gjs-db-icon-cell-active {
  color: var(--gjs-db-accent);
  background-color: var(--gjs-db-accent-soft);
  border-color: var(--gjs-db-accent);
}
.gjs-db-icon-cell-name {
  width: 100%;
  overflow: hidden;
  font-size: 0.61rem;
  color: var(--gjs-db-faint);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gjs-db-trait-icon {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  width: 100%;
}
.gjs-db-trait-icon-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
}
.gjs-db-trait-icon-choose {
  flex: 1 1 auto;
  justify-content: space-between;
}
`;

export default buildIconPickerGridCss;
