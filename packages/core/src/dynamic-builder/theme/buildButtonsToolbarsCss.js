const buildButtonsToolbarsCss = () => `
.gjs-pn-btn {
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: transparent;
  box-shadow: none;
  color: var(--gjs-db-muted);
  cursor: pointer;
  margin-right: var(--gjs-db-gap-1);
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-pn-btn:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-1);
  transform: translateY(-1px);
}
.gjs-pn-btn:active {
  box-shadow: var(--gjs-db-press-1);
  transform: translateY(0);
  transition-duration: var(--gjs-db-dur-1);
}
.gjs-pn-btn.gjs-pn-active {
  color: var(--gjs-db-accent);
  background-color: var(--gjs-db-accent-soft);
  box-shadow: none;
  transform: none;
}
.gjs-pn-btn svg[fill='none'],
.gjs-rte-action svg[fill='none'],
.gjs-toolbar-item svg[fill='none'] {
  fill: none;
  stroke: currentColor;
}
.gjs-btn-prim {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gjs-db-gap-2);
  padding: 0.55em 1.1em;
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.82rem;
  line-height: 1.3;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition:
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-btn-prim:hover {
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-2);
  transform: translateY(-1px);
}
.gjs-btn-prim:active {
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
  transform: translateY(0);
}
.gjs-off-prv {
  background-color: var(--gjs-db-panel);
  color: var(--gjs-db-muted);
  border-radius: var(--gjs-db-r-2);
  box-shadow: var(--gjs-db-lift-2);
  padding: var(--gjs-db-gap-2);
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-off-prv:hover {
  color: var(--gjs-db-fg);
  box-shadow: var(--gjs-db-lift-3);
}
`;

export default buildButtonsToolbarsCss;
