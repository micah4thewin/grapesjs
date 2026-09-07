const buildMenuItemsTraitCss = () => `
.gjs-db-menu-items {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-2);
  width: 100%;
}
.gjs-db-menu-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gjs-db-gap-2);
  padding-bottom: var(--gjs-db-gap-1);
  border-bottom: 1px solid var(--gjs-db-line);
  color: var(--gjs-db-fg);
  font-size: 0.8rem;
  font-weight: var(--gjs-db-w-bold);
}
.gjs-db-menu-empty {
  margin: 0;
  padding: var(--gjs-db-gap-2);
  border: 1px dashed var(--gjs-db-line);
  border-radius: var(--gjs-db-r-2);
  text-align: center;
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
  width: 28px;
  height: 28px;
}
.gjs-db-menu-row-actions .gjs-db-menu-icon-button:disabled {
  opacity: 0.35;
  cursor: default;
}
.gjs-db-menu-add {
  justify-content: center;
  width: 100%;
  min-height: 32px;
}
`;

export default buildMenuItemsTraitCss;
