const buildShellChromeButtonsCss = () => `
.gjs-db-download-button {
  background-color: var(--gjs-db-solid);
  color: var(--gjs-db-text-on-solid);
  box-shadow: var(--gjs-db-lift-1);
  font-weight: var(--gjs-db-w-bold);
}
.gjs-db-download-button:hover {
  background-color: var(--gjs-db-solid);
  color: var(--gjs-db-text-on-solid);
  box-shadow: var(--gjs-db-lift-2);
  opacity: 0.88;
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
