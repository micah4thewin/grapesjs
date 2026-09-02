const buildMenuPrimitivesCss = () => `
.gjs-db-menu {
  padding: 6px;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-3);
}
.gjs-db-menu-item {
  display: flex;
  align-items: center;
  gap: 0.55em;
  width: 100%;
  padding: 7px 9px;
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: transparent;
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.8rem;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-menu-item svg {
  flex: 0 0 auto;
  color: var(--gjs-db-muted);
}
.gjs-db-menu-item:hover {
  background-color: var(--gjs-db-hover);
}
.gjs-db-menu-item:focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: -2px;
}
.gjs-db-menu-item[aria-current='true'] {
  background-color: var(--gjs-db-accent-soft);
  font-weight: var(--gjs-db-w-medium);
}
.gjs-db-menu-item[aria-current='true'] svg {
  color: var(--gjs-db-accent);
}
.gjs-db-menu-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: transparent;
  color: var(--gjs-db-muted);
  cursor: pointer;
  transition: background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-menu-icon-button:hover {
  background-color: var(--gjs-db-hover);
  color: var(--gjs-db-fg);
}
.gjs-db-menu-icon-button:focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: -2px;
}
.gjs-db-menu-separator {
  height: 1px;
  margin: 6px 4px;
  background-color: var(--gjs-db-line);
}
.gjs-db-menu-trigger[aria-expanded='true'] {
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
}
.gjs-db-download-button {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  box-shadow: var(--gjs-db-lift-1);
  font-weight: var(--gjs-db-w-medium);
}
.gjs-db-download-button:hover {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  box-shadow: var(--gjs-db-lift-2);
  transform: translateY(-1px);
  opacity: 0.92;
}
.gjs-db-field-invalid {
  outline: 2px solid var(--gjs-db-error);
  outline-offset: -1px;
}
`;

export default buildMenuPrimitivesCss;
