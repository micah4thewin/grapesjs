const buildRichTextToolbarCss = () => `
.gjs-rte-toolbar {
  background-color: var(--gjs-db-panel);
  border: none;
  border-radius: var(--gjs-db-r-2);
  box-shadow: var(--gjs-db-lift-3);
  font-family: var(--gjs-db-font-ui);
}
.gjs-rte-actionbar {
  padding: var(--gjs-db-gap-1);
  gap: 2px;
}
.gjs-rte-action {
  border: none;
  border-radius: var(--gjs-db-r-1);
  background-color: transparent;
  color: var(--gjs-db-muted);
  cursor: pointer;
  min-width: 26px;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-rte-action:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-1);
}
.gjs-rte-action:active {
  box-shadow: var(--gjs-db-press-1);
}
.gjs-rte-action.gjs-rte-active {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
}
.gjs-rte-action.gjs-rte-disabled {
  color: var(--gjs-db-faint);
  opacity: 0.5;
  cursor: default;
}
.gjs-rte-action.gjs-rte-disabled:hover {
  background-color: transparent;
  box-shadow: none;
}
`;

export default buildRichTextToolbarCss;
