const buildMenuItemsTraitCss = () => `
.gjs-db-menu-items {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-2);
  width: 100%;
}
.gjs-db-menu-row {
  display: flex;
  align-items: flex-start;
  gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-2);
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-panel);
}
.gjs-db-menu-row-fields {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.gjs-db-menu-row-fields .gjs-db-field-input {
  width: 100%;
  font-size: 0.74rem;
}
.gjs-db-menu-row-actions {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 2px;
}
.gjs-db-menu-row-actions .gjs-db-menu-icon-button {
  width: 22px;
  height: 22px;
}
.gjs-db-menu-add {
  justify-content: center;
  width: 100%;
}
`;

export default buildMenuItemsTraitCss;
