const buildIconPickerControlsCss = () => `
.gjs-db-icon-search {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  padding: 0 var(--gjs-db-gap-3);
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-muted);
}
.gjs-db-icon-search .gjs-db-field-input {
  flex: 1 1 auto;
  background: transparent;
  box-shadow: none;
  border: none;
  padding: 0.6em 0;
}
.gjs-db-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gjs-db-gap-1);
}
.gjs-db-chip {
  padding: 0.32em 0.75em;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-pill);
  background-color: transparent;
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.72rem;
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    border-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-chip:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-db-chip-active {
  color: var(--gjs-db-accent);
  background-color: var(--gjs-db-accent-soft);
  border-color: var(--gjs-db-accent);
  font-weight: var(--gjs-db-w-medium);
}
`;

export default buildIconPickerControlsCss;
