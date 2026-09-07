const buildShellChromeButtonsCss = () => `
.gjs-db-download-button {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  box-shadow: none;
  font-weight: var(--gjs-db-w-medium);
}
.gjs-db-download-button:hover {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  box-shadow: none;
  opacity: 0.92;
}
@media (pointer: coarse) {
  .gjs-db-menu .gjs-db-menu-icon-button {
    width: 44px;
    height: 44px;
  }
  .gjs-db-menu .gjs-db-menu-item {
    min-height: 44px;
  }
}
.gjs-db-field-invalid {
  outline: 2px solid var(--gjs-db-error);
  outline-offset: -1px;
}
`;

export default buildShellChromeButtonsCss;
